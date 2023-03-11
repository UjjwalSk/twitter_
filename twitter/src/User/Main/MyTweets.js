import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";
import axios from "../../Api";
import Edit from "./Edit";

function Feed() {
    const [posts, setPosts] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        axios.get("/tweets/mine", { withCredentials: true }).then((res) => {
            setPosts(res.data);
        });
    }, [update]);

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>My Tweets</h2>
            </div>
            {posts.map((post, i) => (
                <Edit key={i} post={post} update={() => setUpdate(!update)} />
            ))}
        </div>
    );
}

export default Feed;
