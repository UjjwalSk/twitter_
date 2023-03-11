import React, { useState, useEffect } from "react";
import "./Widgets.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, Button } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";


function Widgets() {
  const [posts, setPosts] = useState([]);
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>

      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>
      </div>


      <div className="post__headerText widgets__widgetContainer">
        <h3>
          Elon Musk Joined Us
          <span className="post__headerSpecial">
            <VerifiedUserIcon className="post__badge" />
            {" @elon"}
          </span>
        </h3><br/>
        {[...Array(15)].map((_, i) =>
          <img src="https://media1.giphy.com/media/O6Aubv7sJW7bgwBwia/giphy.gif?cid=34842ac6fhbliftzkk0bec9hfx4fvfps169msab8wtxulw3j&rid=giphy.gif&ct=g" alt="" />
        )}
      </div>
    </div>
  );
}

export default Widgets;
