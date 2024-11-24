import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { DEFAULT_POST_COLORS } from "../../constants";

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
            <div className="inputAndLabel">
                <span>Name</span>
                <input
                    className="submissionText"
                    placeholder="Who is posting this?"
                    value={form.name}
                    onChange={(e) =>
                        handleFormChange({
                            name: e.target.value,
                        })
                    }
                />
            </div>
            <div style={{display:'flex', flexDirection:'row'}}>
                <div className="inputAndLabel">
                    <span>Customize Colors?</span>
                    <input
                        type="checkbox"
                        className="pinCheckbox"
                        checked={extraOpen}
                        onChange={(e) => setExtraOpen(e.target.checked)}
                    />
                </div>
                {extraOpen ? 
                    <div className="inputAndLabel">
                        <span>Replies share colors?</span>
                        <input
                            type="checkbox"
                            className="pinCheckbox"
                            checked={form.sharedColors}
                            onChange={(e) => 
                                handleFormChange({
                                    sharedColors: e.target.value,
                                })}
                        />
                    </div> : <></>}
            </div>
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
        </form>
    )
}