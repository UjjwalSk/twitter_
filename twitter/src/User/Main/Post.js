import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar, Button } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import TimeAgo from 'react-timeago'


const Post = forwardRef(
  ({ displayName, username, verified, text,date, image, avatar, editable, setEdit, setDelete }, ref) => {
    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />} @
                  {username}
                  <TimeAgo style={{float:"right"}} date={new Date(date)} />&nbsp;&nbsp;
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          <img src={image} alt="" />
          {editable && <>
            <Button
              onClick={() => setEdit(true)}
              type="submit"
              className="tweetBox__tweetButton"
            >
              Edit
            </Button>{" "}
            <Button
              onClick={() => { setDelete(true); console.log("delete") }}
              type="button"
              className="tweetBox__tweetButton"
            >
              Delete
            </Button>
          </>}
          <div className="post__footer">
            <ChatBubbleOutlineIcon fontSize="small" />
            <RepeatIcon fontSize="small" />
            <FavoriteBorderIcon fontSize="small" />
            <PublishIcon fontSize="small" />
          </div>
        </div>
      </div >
    );
  }
);

export default Post;
