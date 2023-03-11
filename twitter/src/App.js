import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import "./App.css";
import Auth from "./User/Auth/Auth";
import Profile from "./User/Profile/Profile";
import MyTweets from "./User/Main/MyTweets";
import Sidebar from "./User/SideBar/Sidebar";
import Feed from "./User/Main/Feed"
import Widgets from "./User/Widgets/Widgets";
import Admin from "./Admin/Admin";

function App() {
  const { loggedIn, user } = useContext(AuthContext);
  return (
    <div className="app">
      <BrowserRouter>
        {loggedIn && user ?
          user.username === "admin" ?
            <Admin /> :
            <>
              <Sidebar user={user} />
              <Routes>
                <Route>
                  <Route path="/" index element={<Feed />} />
                  <Route path="tweets" element={<MyTweets />} />
                  <Route path="about" element={<>about</>} />
                  <Route path="profile" element={<><Profile user={user} /></>} />
                  <Route path="*" element={<h1>404</h1>} />
                </Route>
              </Routes>
              <Widgets />
            </> :
          <Routes>
            <Route path="/" index element={<Auth />} />
            <Route path="/admin" index element={<Auth role="admin" />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>}
      </BrowserRouter>
    </div>
  );
}

export default App;
