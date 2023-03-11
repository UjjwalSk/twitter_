import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import ReactGiphySearchbox from 'react-giphy-searchbox'
import axios from "../../Api";

function TweetBox(props) {
  const [tweetMessage, setTweetMessage] = useState(props.post ? props.post.body : "");
  const [tweetImage, setTweetImage] = useState(props.post ? props.post.gif : "");
  const [flag, setFlag] = useState(false);
  const sendTweet = async (e) => {
    e.preventDefault();
    await axios.post("/tweets", {
      body: tweetMessage,
      gif: tweetImage,
    }, { withCredentials: true });
    props.update();
    setTweetMessage("");
    setTweetImage("");
    setFlag(false);
  };
  const updateTweet = async (e) => {
    e.preventDefault();
    await axios.put(`/tweets/${props.post.id}`, {
      body: tweetMessage,
      gif: tweetImage,
    }, { withCredentials: true });
    props.setEdit(false);
    props.update();
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://avatars.githubusercontent.com/u/75002949?v=4" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <textarea name="body" placeholder="What's happening?" id="body" cols="45" rows="6" value={tweetMessage} onChange={(e) => setTweetMessage(e.target.value)}></textarea>
        </div>
        <svg onClick={() => setFlag(!flag)} xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="40" viewBox="0 0 24 24" width="40" style={{ cursor: "pointer", marginLeft: "50px" }}><g><rect fill="none" height="24" width="24" x="0" /></g><g><g><rect height="6" width="1.5" x="11.5" y="9" /><path d="M9,9H6c-0.6,0-1,0.5-1,1v4c0,0.5,0.4,1,1,1h3c0.6,0,1-0.5,1-1v-2H8.5v1.5h-2v-3H10V10C10,9.5,9.6,9,9,9z" /><polygon points="19,10.5 19,9 14.5,9 14.5,15 16,15 16,13 18,13 18,11.5 16,11.5 16,10.5" /></g></g></svg>
        {flag && <ReactGiphySearchbox
          apiKey="SzD26dcJT4yamw61J0wlJq47AKTty7mx"
          onSelect={item => setTweetImage(item.images.original.url)}
          masonryConfig={[
            { columns: 2, imageWidth: 110, gutter: 5 },
            { mq: '700px', columns: 3, imageWidth: 110, gutter: 5 },
          ]}
        />}
        <img src={tweetImage} alt="" />
        <Button
          onClick={props.post ? updateTweet : sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          {props.post ? "Update" : "Tweet"}
        </Button>
        {props.post && <Button
          onClick={() => props.setEdit(false)}
          type="button"
          className="tweetBox__tweetButton"
        >
          Cancel
        </Button>}
      </form>
    </div>
  );
}

export default TweetBox;
