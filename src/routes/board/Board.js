import React, { useEffect, useState } from "react";
import {
    createBoardPost,
    createUser,
    getBoardPosts,
    getUserByToken,
    login,
} from "../../api";

import "./Board.css";
import BoardPost from "../../components/BoardPost/BoardPost";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

export default function Board() {
    const [cookies, setCookies] = useCookies(["login"]);

    const [posts, setPosts] = useState([]);
    const [loginModal, setLoginModal] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [myUser, setMyUser] = useState();
    const emptyPost = {
        subject: "",
        text: "",
        image: "",
        token: "",
    };
    const emptyLogin = {
        username: "",
        password: "",
        confirmPassword: "",
    };
    const [form, setForm] = useState(emptyPost);
    const [loginForm, setLoginForm] = useState(emptyLogin);
    const urlPattern = new RegExp("(?:http?)");

    useEffect(() => {
        getBoardPosts().then((r) => {
            setPosts(r);
        });
        if (cookies.login)
            getUserByToken(cookies.login).then((r) => {
                if (r) setMyUser(r);
                else {
                    toast.error('Login has expired, please log in again',{
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        error:true,
                        progress: undefined,
                        theme: "light",
                        });
                    setCookies("login", null);}
            });
    }, []);

    const handleFormChange = (values) => {
        setForm({
            ...form,
            ...values,
        });
    };
    const handleLoginForm = (values) => {
        setLoginForm({
            ...loginForm,
            ...values,
        });
    };
    const handleSubmit = () => {
        if (form.image?.length && !urlPattern.test(form.image)) {
            setImageError("Image should be a valid image URL");
        } else
            createBoardPost({ ...form, userId: myUser.id }).then((r) => {
                if (r) {
                    setPosts(r ?? posts);
                    setForm(emptyPost);
                    setLoginModal(false);
                    setImageError(false)
                }
            });
    };
    const handleLogin = () => {
        login(loginForm)
            .then((r) => {
                if (r?.token) {
                    setCookies("login", r.token);
                    setMyUser(r);
                    setForm(emptyLogin);
                    setLoginModal(false);
                }
            })
            .catch();
    };
    const logout = () => {
        setMyUser(null);
        setCookies("login", null);
        setForm(emptyLogin);
    };
    const handleRegister = () => {
        if (loginForm.password !== loginForm.confirmPassword) {
            setRegisterError("Passwords do not match");
        } else {
            createUser({
                username: loginForm.username,
                password: loginForm.password,
            }).then((r) => {
                if (r.token) {
                    setCookies("login", r.token);
                    setMyUser(r);
                    setLoginModal(false);
                    setLoginForm(emptyLogin);
                }
            });
        }
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
                <h1 className="boardTitle">This is some kind of forum</h1>
                {myUser ? (
                    <div className="headerBarRight">
                        {myUser?.username ? (
                            <div style={{ width: "150px" }}>
                                <span>Logged in as: </span>
                                <span style={{ color: "grey", fontWeight: 800 }}>
                                    {myUser.username}
                                </span>
                            </div>
                        ) : (
                            <></>
                        )}
                        <input
                            type="button"
                            className="loginButton"
                            value="Logout"
                            onClick={logout}
                        />
                    </div>
                ) : (
                    <div className="headerBarRight">
                        <input
                            type="button"
                            value="Login"
                            className="loginButton"
                            onClick={() => setLoginModal(true)}
                        />
                    </div>
                )}
            </div>
            {myUser ? (
                <form className="submissionDiv">
                    <div className="inputAndLabel">
                        <span>Subject*</span>
                        <input
                            className="submissionText"
                            value={form.subject}
                            onChange={(e) =>
                                handleFormChange({
                                    subject: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="submissionText">
                        <div className="inputAndLabel">
                            <span>Text</span>
                            <textarea
                                className="submissionText"
                                placeholder="Type whatever you want"
                                value={form.text}
                                onChange={(e) =>
                                    handleFormChange({
                                        text: e.target.value,
                                    })
                                }
                                rows="3"
                            />
                        </div>
                    </div>

                    <div className="inputAndLabel">
                        <span>
                            Image{" "}
                            {imageError?.length ? (
                                <span className="errorText">({imageError})</span>
                            ) : (
                                ""
                            )}
                        </span>
                        <input
                            className="submissionText"
                            placeholder="Valid image url"
                            value={form.image}
                            style={{
                                backgroundColor: imageError?.length
                                    ? "lightCoral"
                                    : "",
                            }}
                            onChange={(e) =>
                                handleFormChange({
                                    image: e.target.value,
                                })
                            }
                        />
                    </div>
                    <input
                        className="submitButton"
                        onClick={handleSubmit}
                        disabled={!(form.subject && myUser)}
                        type="button"
                        value="Submit"
                    />
                </form>
            ) : (
                <></>
            )}

            <div className="posts">
                {posts.map((post) => (
                    <BoardPost post={post} setPosts={setPosts} myUser={myUser} />
                ))}
            </div>
            {loginModal ? (
                <div id="modal" class="modal">
                    <div className="modal-content">
                        <div className="inputAndLabel">
                            <span>Username</span>
                            <input
                                className="username"
                                value={form.username}
                                placeholder={
                                    loginModal === "register"
                                        ? "A name everyone will see"
                                        : "Username"
                                }
                                onChange={(e) => {
                                    handleLoginForm({
                                        username: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        {loginModal === "register" ? (
                            <>
                                <div className="inputAndLabel">
                                    <span>Password</span>
                                    <input
                                        className="password"
                                        type="password"
                                        value={form.password}
                                        placeholder="A password you will remember"
                                        onChange={(e) =>
                                            handleLoginForm({
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="inputAndLabel">
                                    <span>Confirm Password</span>
                                    <input
                                        className="password"
                                        type="password"
                                        value={form.confirmPassword}
                                        placeholder="Now type it again"
                                        onChange={(e) =>
                                            handleLoginForm({
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                    />
                                    {registerError ? (
                                        <span>{registerError}</span>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="inputAndLabel">
                                <span>Password</span>
                                <input
                                    className="password"
                                    type="password"
                                    value={form.password}
                                    placeholder="Password"
                                    onChange={(e) =>
                                        handleLoginForm({
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        )}

                        <div className="loginButtons">
                            {loginModal !== "register" ? (
                                <input
                                    type="button"
                                    value="Login"
                                    onClick={handleLogin}
                                />
                            ) : (
                                <input
                                    type="button"
                                    value="Register Account"
                                    onClick={handleRegister}
                                />
                            )}
                            <input
                                type="button"
                                value="Cancel"
                                onClick={() => {
                                    setLoginModal(false);
                                    setLoginForm(emptyLogin);
                                }}
                            />
                            {loginModal !== "register" ? (
                                <a
                                    className="createAccountLink"
                                    onClick={() => {
                                        setLoginModal("register");
                                        setLoginForm(emptyLogin);
                                    }}
                                >
                                    Create an Account
                                </a>
                            ) : (
                                <a
                                    className="createAccountLink"
                                    onClick={() => {
                                        setLoginModal("login");
                                        setLoginForm(emptyLogin);
                                    }}
                                >
                                    Login
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
