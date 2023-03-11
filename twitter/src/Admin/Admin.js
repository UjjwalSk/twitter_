import React, { useState, useEffect } from 'react';
import TwitterIcon from "@material-ui/icons/Twitter";
import "./Admin.css"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "../Api";
import Popup from "./Popup";

const Admin = () => {
    const rows = [
        { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    ];
    const [tweets, setTweets] = useState([]);
    const [update, setUpdate] = useState(false);
    const [users, setUsers] = useState([]);
    const [popup, setPopup] = useState(-1);
    const [selected, setSelected] = useState(-1);
    const [tweet, setTweet] = useState({});

    useEffect(() => {
        axios.get("/tweets", { withCredentials: true })
            .then((res) => {
                setTweets(res.data);
                let users = [];
                res.data.forEach((t) => {
                    if (!users.includes(t.username)) {
                        users.push(t.username);
                    }
                });
                setUsers(users);
            })
            .catch((err) => {
                console.log(err);
            })

    }, [update]);

    const getTweet = (user) => {
        setSelected(user);
        axios.get(`/tweets/user/${user}`, { withCredentials: true })
            .then((res) => {
                setTweets(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <div className='admin'>
            <nav>
                <TwitterIcon />
                <span>Admin Panel</span>
            </nav>
            <TableContainer component={Paper} elevation={3}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tweet ID</TableCell>
                            <TableCell align="center">
                                <>
                                    <span>Username</span><br />
                                    <select onChange={(e) => getTweet(e.target.value)}>
                                        <option value={-1} selected={selected === -1}>All</option>
                                        {
                                            users.map((u) => {
                                                return <option value={u} selected={selected === u}>{u}</option>
                                            })
                                        }
                                    </select>
                                </>
                            </TableCell>
                            <TableCell align="center">Full Name</TableCell>
                            <TableCell align="center">Tweet Msg</TableCell>
                            <TableCell align="center">Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tweets.map((t) => (
                            <TableRow
                                key={t.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {t.id}
                                </TableCell>
                                <TableCell align="center">{t.username}</TableCell>
                                <TableCell align="center">{t.name}</TableCell>
                                <TableCell align="center" style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => { setTweet(t); setPopup(t.id); }}>{t.body.substr(0, 20)}...</TableCell>
                                <TableCell align="center">{new Date(t.created).toLocaleDateString()}</TableCell>
                                <TableCell align="center"><button onClick={async () => {
                                    await axios.delete(`/tweets/${t.id}`, { withCredentials: true })
                                        .then((res) => {
                                            setUpdate(!update);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        })
                                }}>Delete</button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Popup popup={popup} setPopup={setPopup} data={tweet} />
        </div>
    )
}

export default Admin