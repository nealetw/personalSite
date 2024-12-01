import React from "react";
import { DEFAULT_TEXT_COLORS } from "../../constants";

import './textInput.css'

export default function BoardTextInput({ backgroundColor, color, borderColor, onChange, content, label, labelClassname, required, customStyle, area, customInputStyle, ...props }) {
    const styles = {
        backgroundColor: backgroundColor ?? DEFAULT_TEXT_COLORS.backgroundColor,
        color: color ?? DEFAULT_TEXT_COLORS.color,
        borderColor: borderColor ?? DEFAULT_TEXT_COLORS.borderColor,
        ...customStyle
    }
    const inputProps = {
        className: "textInput",
        type: "text",
        style: {},
        onChange,
        ...props
    }
    return (
        <div className="inputAndLabel" style={{customInputStyle}}>
            <span className={labelClassname}>{label}{required ? '*' : ''}</span>
            {area ?
                <textarea
                    {...inputProps}
                    style={styles}
                >
                    {content}
                </textarea>
                : <input
                    {...inputProps}
                    style={styles}
                >
                    {content}
                </input>}

        </div>
    );
}
