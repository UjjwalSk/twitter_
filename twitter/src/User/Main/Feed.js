import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";
import axios from "../../Api";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    axios.get("/tweets", { withCredentials: true }).then((res) => {
      setPosts(res.data);
    });
  }, [update]);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox update={() => setUpdate(!update)} />

      <FlipMove>
        {posts.map((post, i) => (
          <Post
            key={i}
            displayName={post.name}
            username={post.username}
            verified={true}
            text={post.body}
            image={post.gif}
            date={post.created}
            avatar={`https://picsum.photos/200?t=${Math.random()}`}
          />
        ))}

      </FlipMove>
    </div>
  );
}

export default Feed;
