import React from "react";
import { DEFAULT_BUTTON_COLORS } from "../../constants";

import './button.css'

export default function BoardButton({ backgroundColor, color, borderColor, onClick, content, ...props }) {
    return (
        <input 
            className="boardButton" 
            type="button"
            style={{
                backgroundColor: backgroundColor ?? DEFAULT_BUTTON_COLORS.backgroundColor,
                color: color ?? DEFAULT_BUTTON_COLORS.color,
                borderColor: borderColor ?? DEFAULT_BUTTON_COLORS.borderColor,
            }}
            onClick={onClick}
            {...props}
        >
            {content}
        </input>
    );
}
