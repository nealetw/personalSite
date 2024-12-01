import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { DEFAULT_POST_COLORS } from "../../constants";
import BoardTextInput from "../BoardTextbox/textInput";

import "./submissionForm.css";

export default function SubmissionForm(props) {
    const defaultPostColors = DEFAULT_POST_COLORS
    const emptyPost = {
        subject: "",
        text: "",
        image: "",
        name: "",
        ...defaultPostColors
    };

    const [imageError, setImageError] = useState(false);
    const [form, setForm] = useState(emptyPost);
    const [extraOpen, setExtraOpen] = useState(false);
    const urlPattern = new RegExp("(?:http?)");

    const handlePostSubmit = () => {
        if (form.image?.length && !urlPattern.test(form.image)) {
            setImageError("Image should be a valid image URL");
        }
        else {
            props.handleSubmit(form)
        }
    }

    const handleFormChange = (values) => {
        setForm({
            ...form,
            ...values,
        });
    };

    return (
        <form className="submissionDiv">
            <BoardTextInput
                label='Subject'
                value={form.subject}
                onChange={(e) =>
                    handleFormChange({
                        subject: e.target.value,
                    })
                }
            />

            <div className="submissionText">
                <BoardTextInput
                    label='Text'
                    value={form.text}
                    area={true}
                    rows={4}
                    onChange={(e) =>
                        handleFormChange({
                            text: e.target.value,
                        })
                    }
                />
            </div>

            <BoardTextInput
                label={
                    <span>
                        Image{" "}
                        {imageError?.length ? (
                            <span className="errorText">({imageError})</span>
                        ) : (
                            ""
                        )}
                    </span>
                }
                value={form.image}
                placeholder="Valid image url"
                onChange={(e) =>
                    handleFormChange({
                        image: e.target.value,
                    })
                }
                customStyle={{
                    backgroundColor: imageError?.length
                        ? "lightCoral"
                        : "",
                }}
            />
            <BoardTextInput
                label='Name'
                value={form.name}
                placeholder="Who is posting this?"
                onChange={(e) =>
                    handleFormChange({
                        name: e.target.value,
                    })
                }
            />
            <BoardTextInput
                label='Customize Colors?'
                value={extraOpen}
                checked={extraOpen}
                type="checkbox"
                customInputStyle={{ maxWidth: 'fit-content' }}
                onChange={(e) => setExtraOpen(e.target.checked)}
            />
            {extraOpen ?
                <BoardTextInput
                    label='Replies share colors?'
                    value={form.sharedColors}
                    checked={form.sharedColors}
                    type="checkbox"
                    customInputStyle={{ maxWidth: 'fit-content' }}
                    onChange={(e) =>
                        handleFormChange({
                            sharedColors: e.target.value,
                        })}
                />
                : <></>}
            {extraOpen ?
                <div className="colorpickersHorizontal">
                    <div className="inputAndLabel">
                        <span>
                            Name Color
                        </span>
                        <HexColorPicker color={form.color} onChange={c => handleFormChange({ color: c })} />
                        <HexColorInput color={form.color} onChange={c => handleFormChange({ color: c })} />
                    </div>
                    <div className="inputAndLabel">
                        <span>
                            Post Color
                        </span>
                        <HexColorPicker color={form.background} onChange={c => handleFormChange({ background: c })} />
                        <HexColorInput color={form.background} onChange={c => handleFormChange({ background: c })} />
                    </div>
                    <div className="inputAndLabel">
                        <span>
                            Content Text Color
                        </span>
                        <HexColorPicker color={form.contentColor} onChange={c => handleFormChange({ contentColor: c })} />
                        <HexColorInput color={form.contentColor} onChange={c => handleFormChange({ contentColor: c })} />
                    </div>
                </div> :
                <></>}
            <input
                className="submitButton"
                onClick={handlePostSubmit}
                disabled={!(form.subject && form.text)}
                type="button"
                value="Submit"
            />
        </form >
    )
}