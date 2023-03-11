import axios from "../Api";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [user, setUser] = useState([]);

  async function getLoggedIn() {
    const loggedInRes = await axios.get("/loggedIn", { withCredentials: true });
    console.log(loggedInRes.data)
    setLoggedIn(loggedInRes.data.auth);
    setUser(loggedInRes.data.user);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, user, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };

// import axios from "../Api";
// import React, { createContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// function AuthContextProvider(props) {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [id, setId] = useState();

//   async function getLoggedIn() {
//     const loggedInRes = await axios.get("/", { withCredentials: true });
//     console.log("loggedInRes", loggedInRes);
//     // setLoggedIn(loggedInRes.data.auth);
//     // setUser(loggedInRes.data.user);
//   }

//   useEffect(() => {
//     getLoggedIn();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ loggedIn, id, getLoggedIn }}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// }

// export default AuthContext;
// export { AuthContextProvider };