import React, { useEffect, useRef, useState } from "react";
import { sendTextToApi } from "../../api";

import "./chatbot.css";

function Chatbot() {
    const [currentText, setText] = useState("");
    const [prompts, setPrompts] = useState([]);
    const [shownPrompts, setShownPrompts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [msgNum, setMsgNum] = useState(1);
    const [error, setError] = useState("");
    const maxPrompts = 12;
    const messagesEndRef = useRef()

    const input = document.getElementById("textbox");
    input?.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("sendButton").click();
        }
    });

    useEffect(() => {
        sendTextToApi({ text: "", msgNum: 0 })
            .then((r) => setPrompts(r.chat))
            .catch((e) =>
                setError("The backend may be dead, please come back later")
            );
    }, []);

    const sendText = () => {
        if (!currentText.length || loading) return;
        setLoading(true);
        sendTextToApi({ text: currentText, msgNum, messages: prompts })
            .then((r) => {
                setMsgNum(r.msgNum);
                setText("");
                setPrompts(r.chat);
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
        setTimeout( () => {
            messagesEndRef?.current?.scrollIntoView({behavior:"smooth"})
        }, 100);
    }, [prompts]);

    return (
        <div className="container">
            <img src={require("./clouds.jpg")} className="backgroundImage" />
                <div className="contentThing">
                    <div id="prompts" className="prompts">
                        {shownPrompts.map((p, i) =>
                            i === shownPrompts.length - 1 ? (
                                <p className="currentPrompt">
                                    {p.content.split("\n").map((char, index) => {
                                        const style = {
                                            "animation-delay":
                                                0.5 + index / maxPrompts + "s",
                                        };
                                        return (
                                            <p
                                                style={style}
                                                aria-hidden="true"
                                                key={index}
                                            >
                                                {char}
                                            </p>
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
                                                            (shownPrompts.length -
                                                                i)) /
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
                        <div id="bottom" ref={messagesEndRef}/>
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
                <span className="signature">
                    a dumb thing made by{" "}
                    <a className="signatureLink" href="https://nealetw.com/">
                        Tim Neale
                    </a>
                </span>
        </div>
    );
}

export default Chatbot;
