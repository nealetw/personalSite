import React, { useEffect, useState } from "react";

import "./chatbot.css";
import { sendTextToApi } from "../../api";

function Chatbot() {
    const [currentText, setText] = useState("");
    const [prompts, setPrompts] = useState([]);
    const [shownPrompts, setShownPrompts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [msgNum, setMsgNum] = useState(1);
    const [error, setError] = useState("");
    const maxPrompts = 12;

    const input = document.getElementById("textbox");
    input?.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("sendButton").click();
        }
    });

    useEffect(() => {
        sendTextToApi({ text: "", msgNum: 0 })
            .then(setPrompts)
            .catch((e) =>
                setError("The backend may be dead, please come back later")
            );
    }, []);

    const sendText = () => {
        if (!currentText.length || loading) return;
        setLoading(true);
        sendTextToApi({ text: currentText, msgNum, messages: prompts })
            .then((r) => {
                setMsgNum(msgNum + 1);
                setText("");
                setPrompts(r);
                setLoading(false);
            })
            .catch((e) => setError(e));
    };

    useEffect(() => {
        if (!loading) document.getElementById("textbox").focus();
    }, [loading]);

    useEffect(() => {
        setShownPrompts(
            prompts
                .filter(
                    (a, i) =>
                        prompts.length < maxPrompts ||
                        prompts.length - i < maxPrompts
                )
                .filter((p) => p.role !== "system")
        );
    }, [prompts]);

    return (
        <div className="container">
            <div className="contentThing">
                <div className="prompts">
                    {shownPrompts.map((p, i) =>
                        i === shownPrompts.length - 1 ? (
                            <p className="currentPrompt">
                                {[...p.content].map((char, index) => {
                                    const style = {
                                        "animation-delay":
                                            0.5 + index / maxPrompts + "s",
                                    };
                                    return (
                                        <span
                                            style={style}
                                            aria-hidden="true"
                                            key={index}
                                        >
                                            {char}
                                        </span>
                                    );
                                })}
                            </p>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        p.role === "user" ? "end" : "center",
                                }}
                            >
                                {p.role === "user" ? (
                                    <img
                                        className="replyArrow"
                                        style={{
                                            opacity: `${
                                                (100 -
                                                    (100 / maxPrompts) *
                                                        (shownPrompts.length - i)) /
                                                2
                                            }%`,
                                        }}
                                        src={require("./reply.png")}
                                    />
                                ) : (
                                    <></>
                                )}
                                <p
                                    className={
                                        p.role === "user"
                                            ? "pastUserPrompt"
                                            : "pastAssistPrompts"
                                    }
                                    style={{
                                        opacity: `${
                                            100 -
                                            (100 / maxPrompts) *
                                                (shownPrompts.length - i)
                                        }%`,
                                    }}
                                >
                                    {p.content}
                                </p>
                            </div>
                        )
                    )}
                </div>

                <div className="inputArea">
                    <input
                        id="textbox"
                        type="text"
                        value={currentText}
                        className="textboxThing"
                        onChange={(e) => setText(e.target.value)}
                        disabled={loading}
                    />
                    <input
                        id="sendButton"
                        type="button"
                        className="sendButton"
                        onClick={sendText}
                        value={"Send"}
                        disabled={loading}
                    />
                </div>
                {error.length ? <p className="error">{error}</p> : <></>}
            </div>
        </div>
    );
}

export default Chatbot;
