import React from 'react'
import { Avatar, Button } from "@material-ui/core";
import "./Profile.css"
const Profile = (props) => {
    if (props.user==undefined) {
        return (
            <>Loading...</>
        )
    }
    return (
        <div className="feed user">
            <fieldset>
                <legend>
                    <Avatar src="https://avatars.githubusercontent.com/u/75002949?v=4" />
                </legend>
                <div>
                    <p>Name</p>
                    <p>{props.user.name}</p>
                    <p>Username</p>
                    <p>{props.user.username}</p>
                    <p>Mail</p>
                    <p>{props.user.email}</p>
                </div>
            </fieldset>
        </div>
    )
}

export default Profile