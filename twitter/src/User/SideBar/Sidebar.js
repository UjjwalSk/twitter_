import React, { useContext } from "react";
import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "../../Api";
import AuthContext from "../../context/AuthContext";
function Sidebar(props) {
  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  if (props.user == undefined) {
    return (
      <>Loading...</>
    )
  }
  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />

      <SidebarOption active Icon={HomeIcon} text="Home" path="/" />
      <SidebarOption Icon={ListAltIcon} text="My Tweets" path="/tweets" />
      <SidebarOption Icon={SearchIcon} text="Explore" path="/" />
      <SidebarOption Icon={PermIdentityIcon} text="Profile" path="/profile" />

      <div className="sidebarOption sidebarLoggOut">
        <div>
          <Avatar src="https://avatars.githubusercontent.com/u/75002949?v=4" />
          <div>
            <p onClick={() => navigate("/profile")}>{props.user.name}</p>
            <p>@{props.user.username}</p>
          </div>
        </div>
        <div>
          <ExitToAppIcon className="loggOutIcon" onClick={async () => {
            await axios.get("/logout", { withCredentials: true }).then(() => {
              getLoggedIn();
              navigate("/");
            });
          }
          } />
        </div>
      </div>

    </div>
  );
}

export default Sidebar;
