import React, { useState, useRef, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TwitterIcon from "@material-ui/icons/Twitter";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from "@material-ui/core/FormControl";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import "./Auth.css";
import AuthContext from "../../context/AuthContext";
import axios from "../../Api";
import { useParams } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: 'url(/leftPane.png)',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    background: "var(--twitter-color)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "var(--twitter-color)",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "var(--twitter-color)",
  },
  tcenter: {
    display: "block",
    textAlign: "center",
    color: "var(--twitter-color)"
  },
  icon: {
    fontSize: "4rem"
  },
  txt: {
    fontSize: "3rem",
    color: "white"
  }
}));

const Auth = ({ role }) => {
  const classes = useStyles();
  const { type } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [flag, setFlag] = useState(!role);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { getLoggedIn } = useContext(AuthContext);

  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    let data = {};
    if (flag) {
      data.name = nameRef.current.value;
      data.email = emailRef.current.value;
    }
    data.username = usernameRef.current.value;
    data.password = passwordRef.current.value;
    await axios.post(`/auth/${role ? role : flag}`, data, { withCredentials: true }).then(() => {
      getLoggedIn();
    })
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} >
        <TwitterIcon className={classes.icon} />
        <h1 className={`${classes.txt}`}>Welcome To Twitter</h1>
      </Grid>
      <Grid className="rightPane" item xs={12} sm={8} md={5} component={Paper} elevation={6} style={{ background: "black" }} variant="outlined" square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <h1>{role ? "Admin Login" : flag ? "Create your account" : "Sign in"}</h1>
          <form className={classes.form} onSubmit={submit}>
            {console.log(role)}
            {(flag && !role) ? (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoFocus
                  inputRef={nameRef}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  inputRef={emailRef}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  name="username"
                  inputRef={usernameRef}
                />
              </>) : <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="username"
              inputRef={usernameRef}
            />}
            < br /><br />
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password" required>Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                required
                label="Password *"
                inputRef={passwordRef}
                margin="normal"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {role ? "Log In" : flag ? "Sign Up" : "Sign In"}
            </Button>
            {!role && <p onClick={() => setFlag(!flag)} variant="body2" className="toggler">
              {flag ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </p>}
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Auth;

