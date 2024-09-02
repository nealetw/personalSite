import React, { useState } from "react";
import { createPostReply, deletePost, deleteReply } from "../../api";
import moment from "moment";

export default function BoardPost({ post, setPosts, myUser }) {
    const [openReply, setOpenReply] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [showReplies, setShowReplies] = useState(
        post.children.length && post.children?.length <= 2
    );
    const [reply, setReply] = useState({ text: "", image: "" });

    const submitReply = () => {
        if (reply.image?.length && !urlPattern.test(reply.image)) {
            setImageError("Image should be a valid image URL");
        } else{
        createPostReply({ ...reply, parent: post.id, userId: myUser.id }).then(
            setPosts
        );
        setOpenReply(false);
        setReply({ text: "", image: "" });
    setImageError(false)}
    };
    const urlPattern = new RegExp("(?:https?)");

    return (
        <div className="postContainer">
            <h5>
                {post?.user ?? "Unknown User"} ——— Created:{" "}
                {moment(post.createdAt)?.format("hh:mma Do MMM YYYY")}{" "}
                {post.children?.length
                    ? `——— Last Reply: ${moment(post.updatedAt)?.format(
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
                <div>
                    <h2>{post.subject ?? "No Subject"}</h2>
                    <p>{post.text ?? ""}</p>
                </div>
            </div>
            {openReply ? (
                <div className="replyContainer">
                    <div className="inputAndLabel">
                        <span>Reply*</span>
                        <input
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
                    <input
                        type="button"
                        value="Submit"
                        onClick={() => submitReply()}
                    />
                </div>
            ) : myUser ? (
                <input
                    type="button"
                    value="Reply"
                    onClick={() => setOpenReply(true)}
                />
            ) : (
                <></>
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
                    .map((r) => (
                        <div className="postReply">
                            <h5>
                                {r?.user ?? "Unknown User"} ———{" "}
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
                    value="See all replies..."
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
