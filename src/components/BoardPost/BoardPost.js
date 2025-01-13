import React, { useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import moment from 'moment';
import { deletePost, deleteReply } from '../../api';
import { DEFAULT_POST_COLORS } from '../../constants';
import BoardButton from '../BoardButton/button';
import BoardTextInput from '../BoardTextbox/textInput';

export default function BoardPost({ post, setPosts, createReply }) {
    const defaultColors = DEFAULT_POST_COLORS;

    const [openReply, setOpenReply] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [extraOpen, setExtraOpen] = useState(false);
    const [showReplies, setShowReplies] = useState(
        post.children.length && post.children?.length <= 2
    );
    const [reply, setReply] = useState({
        text: '',
        image: '',
        name: '',
        color: DEFAULT_POST_COLORS.color,
    });

    const submitReply = () => {
        if (reply.image?.length && !urlPattern.test(reply.image)) {
            setImageError('Image should be a valid image URL');
        } else {
            createReply({ ...reply, parent: post.id })
                .then(setPosts)
                .then(() => {
                    setOpenReply(false);
                    setReply({ text: '', image: '' });
                });
            setImageError(false);
        }
    };
    const urlPattern = new RegExp('(?:https?)');
    const plural = post.children?.length && post.children.length > 1;

    return (
        <div
            className="postContainer"
            style={{
                backgroundColor: post.background ?? defaultColors.background,
            }}
        >
            <h5>
                <span style={{ color: post.color ?? defaultColors.color }}>
                    {post?.name?.length ? post.name : 'Anonymous'}
                </span>{' '}
                ——— Created:{' '}
                {moment(post.createdAt)?.format('hh:mma Do MMM YYYY')}{' '}
                {post.children?.length
                    ? ` —— ${post.children.length} Repl${
                          plural ? 'ies' : 'y'
                      } —— Last Reply: ${moment(post.updatedAt)?.format(
                          'hh:mma Do MMM YYYY'
                      )}`
                    : ''}
            </h5>
            <div className="postContent">
                {post.image?.length ? (
                    <img
                        className="postImage"
                        src={post.image}
                        alt={post.image}
                    />
                ) : (
                    <></>
                )}
                <div
                    style={{
                        color: post.contentColor ?? defaultColors.contentColor,
                    }}
                >
                    <h2>{post.subject ?? 'No Subject'}</h2>
                    <p>{post.text ?? ''}</p>
                </div>
            </div>
            {openReply ? (
                <div className="replyContainer">
                    <BoardTextInput
                        label="Reply"
                        required
                        value={reply.text}
                        placeholder="I think what you are saying is..."
                        onChange={(e) =>
                            setReply({ ...reply, text: e.target.value })
                        }
                    />
                    <BoardTextInput
                        label={
                            <span>
                                Image{' '}
                                {imageError?.length ? (
                                    <span className="errorText">
                                        ({imageError})
                                    </span>
                                ) : (
                                    ''
                                )}
                            </span>
                        }
                        value={reply.image}
                        placeholder="A valid image link"
                        customStyle={{
                            backgroundColor: imageError?.length
                                ? 'lightCoral'
                                : '',
                        }}
                        onChange={(e) =>
                            setReply({ ...reply, image: e.target.value })
                        }
                    />
                    <BoardTextInput
                        label="Name"
                        value={reply.name}
                        placeholder="Who is replying?"
                        onChange={(e) =>
                            setReply({ ...reply, name: e.target.value })
                        }
                    />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <BoardTextInput
                            label="Custom Name Color?"
                            value={extraOpen}
                            checked={extraOpen}
                            type="checkbox"
                            customInputStyle={{ maxWidth: 'fit-content' }}
                            onChange={(e) => setExtraOpen(e.target.checked)}
                        />
                        {extraOpen ? (
                            <div className="inputAndLabel">
                                <span>Name Color</span>
                                <span
                                    style={{
                                        fontStyle: 'italic',
                                        color: 'grey',
                                    }}
                                >
                                    {post.sharedColors
                                        ? ' Note: Replies on this post will inherit their other colors'
                                        : ''}
                                </span>
                                <HexColorPicker
                                    color={reply.color}
                                    onChange={(c) =>
                                        setReply({ ...reply, color: c })
                                    }
                                />
                                <HexColorInput
                                    color={reply.color}
                                    onChange={(c) =>
                                        setReply({ ...reply, color: c })
                                    }
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <BoardButton value="Submit" onClick={submitReply} />
                </div>
            ) : (
                <BoardButton value="Reply" onClick={() => setOpenReply(true)} />
            )}
            <div className="postChildren">
                {post?.children
                    ?.slice(0, showReplies ? post.children.length : 2)
                    ?.map((r) => (
                        <div className="postReply">
                            <h5>
                                <span
                                    style={{
                                        color: r.color ?? defaultColors.color,
                                    }}
                                >
                                    {r?.name?.length ? r.name : 'Anonymous'}
                                </span>{' '}
                                ———{' '}
                                {moment(r.createdAt)?.format(
                                    'hh:mma Do MMM YYYY'
                                )}
                            </h5>
                            <div className="replyContent">
                                {r.image?.length ? (
                                    <img
                                        className="postImage"
                                        src={r.image}
                                        alt={r.image}
                                    />
                                ) : (
                                    <></>
                                )}
                                <p>{r?.text ?? ''}</p>
                            </div>
                        </div>
                    ))}
            </div>
            {showReplies || post.children.length < 2 ? (
                <></>
            ) : (
                <BoardButton
                    value={`See ${post.children.length - 2} other repl${
                        post.children.length - 2 > 1 ? 'ies' : 'y'
                    }...`}
                    onClick={() => setShowReplies(true)}
                />
            )}
            {deleteModal ? (
                <div id="modal" class="modal">
                    <div className="modal-content">
                        <div className="inputAndLabel">
                            <p>
                                Are you sure you want to delete this{' '}
                                {deleteModal.text}?
                            </p>
                            <div className="loginButtons">
                                <input
                                    type="button"
                                    value="Delete"
                                    onClick={() => {
                                        if (deleteModal.text === 'Post')
                                            deletePost({ id: deleteModal.id });
                                        else
                                            deleteReply({
                                                parentId: post.id,
                                                id: deleteModal.id,
                                            });
                                        setDeleteModal(false);
                                    }}
                                />
                                <input
                                    type="button"
                                    value="Cancel"
                                    onClick={() => {
                                        setDeleteModal(false);
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
