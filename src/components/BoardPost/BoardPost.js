import React, { useState } from "react";
import { createPostReply, deletePost, deleteReply } from "../../api";
import moment from "moment";
import { DEFAULT_POST_COLORS } from "../../constants";
import { HexColorInput, HexColorPicker } from "react-colorful";

export default function BoardPost({ post, setPosts, myUser }) {
    const defaultColors = DEFAULT_POST_COLORS;
    const [openReply, setOpenReply] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [extraOpen, setExtraOpen] = useState(false);
    const [showReplies, setShowReplies] = useState(
        post.children.length && post.children?.length <= 2
    );
    const [reply, setReply] = useState({ text: "", image: "", name: '', color:DEFAULT_POST_COLORS.color });

    const submitReply = () => {
        if (reply.image?.length && !urlPattern.test(reply.image)) {
            setImageError("Image should be a valid image URL");
        } else{
        createPostReply({ ...reply, parent: post.id, }).then(
            setPosts
        ).then(() => {
            setOpenReply(false);
            setReply({ text: "", image: "" });
        });
        setImageError(false)}
    };
    const urlPattern = new RegExp("(?:https?)");
    const plural = post.children?.length && post.children.length > 1

    return (
        <div className="postContainer" style={{backgroundColor:post.background ?? defaultColors.background }}>
            <h5>
                <span style={{color:post.color ?? defaultColors.color}}>{post?.name ?? "Anonymous"}</span> ——— Created:{" "}
                {moment(post.createdAt)?.format("hh:mma Do MMM YYYY")}{" "}
                {post.children?.length
                    ? ` —— ${post.children.length} Repl${plural ? 'ies' : 'y'} —— Last Reply: ${moment(post.updatedAt)?.format(
                          "hh:mma Do MMM YYYY"
                      )}`
                    : ""}
            </h5>
            <div className="postContent">
                {post.image?.length ? (
                    <img
                        className="postImage"
                        src={post.image}
                        alt="User generated image not found"
                    />
                ) : (
                    <></>
                )}
                <div style={{color:post.contentColor ?? defaultColors.contentColor}}>
                    <h2>{post.subject ?? "No Subject"}</h2>
                    <p>{post.text ?? ""}</p>
                </div>
            </div>
            {openReply ? (
                <div className="replyContainer">
                    <div className="inputAndLabel">
                        <span>Reply*</span>
                        <input
                            placeholder="I think what you are saying is..."
                            className="submissionText"
                            value={reply.text}
                            onChange={(e) =>
                                setReply({ ...reply, text: e.target.value })
                            }
                        />
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
                            placeholder="A valid image link"
                            className="submissionText"
                            style={{
                                backgroundColor: imageError?.length
                                    ? "lightCoral"
                                    : "",
                            }}
                            value={reply.image}
                            onChange={(e) =>
                                setReply({ ...reply, image: e.target.value })
                            }
                        />
                    </div>
                    <div className="inputAndLabel">
                        <span>Name</span>
                        <input
                            placeholder="Who is replying?"
                            className="submissionText"
                            value={reply.name}
                            onChange={(e) =>
                                setReply({ ...reply, name: e.target.value })
                            }
                        />
                    </div>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <div className="inputAndLabel">
                            <span>Custom Name Color?</span>
                            <input
                                type="checkbox"
                                className="pinCheckbox"
                                checked={extraOpen}
                                onChange={(e) => setExtraOpen(e.target.checked)}
                            />
                        </div>
                        {extraOpen ? 
                            <div className="inputAndLabel">
                                <span>
                                    Name Color
                                </span>
                                <span style={{fontStyle:'italic', color:'grey'}}>{post.sharedColors ? ' Note: Replies on this post will inherit their other colors' : ''}</span>
                                <HexColorPicker color={reply.color} onChange={c => setReply({ color: c })} />
                                <HexColorInput color={reply.color} onChange={c => setReply({ color: c })} />
                            </div> 
                            : <></>}
                    </div>
                    
                    <input
                        type="button"
                        value="Submit"
                        onClick={() => submitReply()}
                    />
                </div>
            ) : (
                <input
                    type="button"
                    value="Reply"
                    onClick={() => setOpenReply(true)}
                />
            )}
            {post.user && myUser?.username === post.user ?
                <input
                    type="button"
                    value="Delete Post"
                    onClick={() => setDeleteModal({text:'Post', id: post.id})}
                />
             :
                <></>
            }
            <div className="postChildren">
                {post?.children
                    ?.slice(0, showReplies ? post.children.length : 2)
                    ?.map((r) => (
                        <div className="postReply">
                            <h5>
                                {r?.name ?? "Anonymous"} ———{" "}
                                {moment(r.createdAt)?.format("hh:mma Do MMM YYYY")}
                            </h5>
                            <div className="replyContent">
                                {r.image?.length ? (
                                    <img
                                        className="postImage"
                                        src={r.image}
                                        alt="User generated image not found"
                                    />
                                ) : (
                                    <></>
                                )}
                                <p>{r?.text ?? ""}</p>
                            </div>
                            {r.user && myUser?.username === r.user ?
                                <input
                                    type="button"
                                    value="Delete Reply"
                                    onClick={() => setDeleteModal({text:'Reply', id: r.id})}
                                />
                            :
                                <></>
                            }
                        </div>
                    ))}
            </div>
            {showReplies || post.children.length < 2 ? (
                <></>
            ) : (
                <input
                    type="button"
                    value={`See ${post.children.length - 2} other repl${post.children.length - 2 > 1 ? 'ies' : 'y'}...`}
                    onClick={() => setShowReplies(true)}
                />
            )}
            {deleteModal ? (
                <div id="modal" class="modal">
                    <div className="modal-content">
                        <div className="inputAndLabel">
                            <p>Are you sure you want to delete this {deleteModal.text}?</p>
                            <div className="loginButtons">
                            <input
                                type="button"
                                value="Delete"
                                onClick={() => {
                                    if(deleteModal.text === 'Post')
                                        deletePost({id: deleteModal.id});
                                    else
                                        deleteReply({parentId: post.id, id: deleteModal.id})
                                    setDeleteModal(false)
                                }}
                            />
                            <input
                                type="button"
                                value="Cancel"
                                onClick={() => {
                                    setDeleteModal(false)
                                }}
                            />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
