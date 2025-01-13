import React, { useEffect, useRef, useState } from 'react';
import { sendTextToApi } from '../../api';
import SiteSignature from '../../components/SiteSignature/signature';

import './chatbot.css';

function Chatbot() {
    const [currentText, setText] = useState('');
    const [prompts, setPrompts] = useState([]);
    const [shownPrompts, setShownPrompts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [msgNum, setMsgNum] = useState(1);
    const [error, setError] = useState('');
    const maxPrompts = 12;
    const messagesEndRef = useRef();

    const input = document.getElementById('textbox');
    input?.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('sendButton').click();
        }
    });

    useEffect(() => {
        sendTextToApi({ text: '', msgNum: 0 })
            .then((r) => setPrompts(r.chat))
            .catch((e) =>
                setError('The backend may be dead, please come back later')
            );
    }, []);

    const sendText = () => {
        if (!currentText.length || loading) return;
        setLoading(true);
        sendTextToApi({ text: currentText, msgNum, messages: prompts })
            .then((r) => {
                setHidden(true);
                setMsgNum(r.msgNum);
                setText('');
                setPrompts(r.chat);
                setLoading(false);
                setTimeout(() => setHidden(false), 100);
            })
            .catch((e) => setError(e));
    };

    useEffect(() => {
        if (!loading) document.getElementById('textbox').focus();
    }, [loading]);

    useEffect(() => {
        setShownPrompts(
            prompts
                .filter(
                    (a, i) =>
                        prompts.length < maxPrompts ||
                        prompts.length - i < maxPrompts
                )
                .filter((p) => p.role !== 'system')
        );
        setTimeout(() => {
            messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }, [prompts]);

    return (
        <div className="container">
            <img
                src={require('./clouds.jpg')}
                className="backgroundImage"
                alt="Pretend theres a background of clouds here"
            />
            <div className="contentThing">
                <div id="prompts" className="prompts">
                    {shownPrompts.map((p, i) =>
                        i === shownPrompts.length - 1 ? (
                            <p className="currentPrompt">
                                {p.content.split('\n').map((line, index) => (
                                    <p aria-hidden="true" key={index}>
                                        {[...line].map((char, charIndex) => (
                                            <span
                                                style={{
                                                    opacity: hidden ? 0 : 1,
                                                    transition: `${
                                                        0.1 * charIndex +
                                                        0.1 +
                                                        index * 2
                                                    }s`,
                                                }}
                                            >
                                                {char}
                                            </span>
                                        ))}
                                    </p>
                                ))}
                            </p>
                        ) : (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent:
                                        p.role === 'user' ? 'end' : 'center',
                                }}
                            >
                                {p.role === 'user' ? (
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
                                        src={require('./reply.png')}
                                        alt="Reply"
                                    />
                                ) : (
                                    <></>
                                )}
                                <p
                                    className={
                                        p.role === 'user'
                                            ? 'pastUserPrompt'
                                            : 'pastAssistPrompts'
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
                    <div id="bottom" ref={messagesEndRef} />
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
                        value={'Send'}
                        disabled={loading}
                    />
                </div>
                {error.length ? <p className="error">{error}</p> : <></>}
            </div>
            <SiteSignature />
        </div>
    );
}

export default Chatbot;
