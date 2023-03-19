const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const timeAgo = require("timeago.js")
const cors = require("cors")
const session = require('express-session');
const cookieParser = require('cookie-parser');

const PORT = 6869

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
  }
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root', /* MySQL User */
  password: '', /* MySQL Password */
  database: 'twitter_clone' /* MySQL Database */
});

conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected with App...');
});

const hashing = (s) => {
  s = s.split("").map((e, i) => {
    return i % 2 == 0 ? String.fromCharCode(e.charCodeAt(0) + 1) : e.charCodeAt(0) - 1;
  })
  return s.join("");
}

// Auth 
app.post('/auth/:flag', (req, res) => {
  req.body.password = hashing(req.body.password);
  if (req.params.flag === "true") {
    let sqlQuery = "INSERT INTO users SET ?";
    let query = conn.query(sqlQuery, req.body, (err, results) => {
      if (err) {
        res.status(400).json({ error: err.sqlMessage });
      }
      else {
        req.session.user = {
          id: results.insertId,
          name: req.body.name,
          username: req.body.username,
          email: req.body.email
        };
        req.session.save();
        res.status(200).json({ success: "User created successfully" });
      }
    });
  } else if (req.params.flag === "false") {
    // Login
    let sqlQuery = "SELECT * FROM users WHERE username='" + req.body.username + "' AND password='" + req.body.password + "'";
    let query = conn.query(sqlQuery, req.body, (err, results) => {
      if (err) {
        res.status(400).json({ error: err.sqlMessage });
      }
      else {
        if (results.length > 0) {
          delete results[0].password;
          req.session.user = results[0];
          req.session.save();
          res.status(200).json({ success: "User logged in successfully" });
        } else {
          res.status(400).json({ error: "Invalid Credentials" });
        }
      }
    });
  } else if (req.params.flag === "admin") {
    let sqlQuery = "SELECT * FROM admin WHERE username='" + req.body.username + "' AND password='" + req.body.password + "'";
    let query = conn.query(sqlQuery, req.body, (err, results) => {
      if (err) {
        res.status(400).json({ error: err.sqlMessage });
      }
      else {
        if (results.length > 0) {
          // req.session.user = req.body.username === "admin" ? "admin" : results[0].id;
          delete results[0].password;
          req.session.user = results[0];
          req.session.save();
          res.status(200).json({ success: "Admin logged in successfully" });
        } else {
          res.status(400).json({ error: "Invalid Credentials" });
        }
      }
    });
  }
});


app.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ success: "User logged out successfully" });
})

// tweets

const checkAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error: "You are not logged in" });
  }
};

app.post('/tweets', checkAuth, (req, res) => {
  req.body.user = req.session.user.id;
  let sqlQuery = "INSERT INTO tweets SET ?";
  let query = conn.query(sqlQuery, req.body, (err, results) => {
    if (err) throw err;
    else {
      res.status(200).json({ success: "Tweet created successfully" });
    }
  });
});

app.get('/tweets/:flag?/:user?', checkAuth, (req, res) => {
  console.log(req.params.flag)
  console.log(req.params.user);
  let sqlQuery = "SELECT tweets.id,name,username,body,gif,created FROM tweets INNER JOIN users ON users.id = tweets.user" +
    (req.params.flag === "user" ?
      (req.params.user ? " WHERE username='" + (req.params.user) + "'" : " WHERE tweets.user=" + (req.session.user.id))
      :
      req.params.flag === "date" ? ` where MONTH(created)=MONTH('${req.params.user}-01')` : ""
    ) +
    " ORDER BY tweets.created DESC";

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    else {
      res.status(200).json(results);
    }
  });
});

app.put('/tweets/:id', checkAuth, (req, res) => {
  let sqlQuery = "UPDATE tweets SET ? WHERE id=" + req.params.id;
  let query = conn.query(sqlQuery, req.body, (err, results) => {
    if (err) throw err;
    else {
      res.status(200).json({ success: "Tweet updated successfully" });
    }
  });
});

// delete
app.delete('/tweets/:id', checkAuth, (req, res) => {
  let sqlQuery = "DELETE FROM tweets WHERE id=" + req.params.id;
  let query = conn.query(sqlQuery, req.body, (err, results) => {
    if (err) throw err;
    else {
      res.status(200).json({ success: "Tweet deleted successfully" });
    }
  });
});

app.get("/loggedIn", (req, res) => {
  if (req.session.user) {
    res.json({ auth: true, user: req.session.user });
  } else {
    res.json({ auth: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});

// admin 

app.delete('/admin/delete/:handle?/:id?', checkAuth, (req, res) => {
  let sqlQuery = "DELETE FROM tweets WHERE id=" + req.params.id;
  let query = conn.query(sqlQuery, (err, results) => {
    if (err) res.status(500).json({ success: "Can't DELETE" });
    else res.status(200).json({ success: "Tweet deleted successfully" });
  });
});