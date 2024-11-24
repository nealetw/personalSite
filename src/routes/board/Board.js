import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

import {
    createBoardPost,
    createUser,
    getBoardPosts,
    getUserByToken,
    login,
} from "../../api";
import BoardPost from "../../components/BoardPost/BoardPost";

import "./Board.css";
import SubmissionForm from "../../components/BoardSubmissionForm/BoardSubForm";

export default function Board() {
    const [posts, setPosts] = useState([]);
    const [myUser, setMyUser] = useState();

    useEffect(() => {
        getBoardPosts().then((r) => {
            setPosts(r);
        });
    }, []);

    const handlePostSubmit = (form) => {
        createBoardPost(form).then((r) => {
            if (r) {
                setPosts(r ?? posts);
            }
        });
    };

    return (
        <div className="boardContainer">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="headerBar">
                <h1 className="boardTitle">Welcome to Tim's Forum</h1>
            </div>
            <SubmissionForm handleSubmit={handlePostSubmit}></SubmissionForm>

            <div className="posts">
                {posts?.map((post) => (
                    <BoardPost post={post} setPosts={setPosts} myUser={myUser} />
                ))}
            </div>
        </div>
    );
}
