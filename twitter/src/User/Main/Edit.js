import React, { forwardRef, useState, useEffect } from 'react';
import Post from './Post';
import TweetBox from './TweetBox';
import axios from "../../Api";
import { useNavigate } from 'react-router-dom';

const Edit = ({ post, update }) => {
    const [edit, setEdit] = useState(false);
    const [deleteTweet, setDelete] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(post)
        if (deleteTweet) {
            axios.delete(`/tweets/${post.id}`, { withCredentials: true }).then(async (res) => {
                setDelete(7);
            });
        } else {
            console.log("not delete")
        }
    }, [deleteTweet]);
    return (
        <>
            {deleteTweet !== 7 &&
                <div>
                    {edit ? <TweetBox post={post} setEdit={setEdit} update={update} /> : <Post
                        key={post.id}
                        displayName={post.name}
                        username={post.username}
                        verified={true}
                        text={post.body}
                        image={post.gif}
                        avatar={`https://picsum.photos/200?t=${Math.random()}`}
                        editable={true}
                        setEdit={setEdit}
                        setDelete={setDelete}
                    />
                    }
                </div>
            }
        </>
    )
};

export default Edit