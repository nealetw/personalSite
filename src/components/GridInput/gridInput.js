import { useState } from 'react';
import './gridInput.css';

export default function GridInput({
    square,
    onEnter,
    label,
    selectedLabel,
    classIndex,
    customOnFocus,
    customOnBlur,
}) {
    const [inputValue, setValue] = useState('');
    const tryFocus = () => {
        if (classIndex) {
            const element = document.getElementById(`cell${classIndex}`);
            element.focus();
            customOnFocus(square);
        }
    };
    const hasAnswer = square?.hasOwnProperty('success');
    const isCorrect = square?.success;
    return (
        <div
            className={
                square?.label?.length
                    ? label
                        ? selectedLabel
                            ? 'selectedLabelCellContainer'
                            : 'labelCellContainer'
                        : 'cellInputContainer'
                    : 'emptyCell'
            }
            style={{
                backgroundColor: hasAnswer
                    ? isCorrect
                        ? 'lightGreen'
                        : 'coral'
                    : '',
            }}
            onClick={tryFocus}
        >
            {label ? (
                <div className={!square?.label?.length ? '' : 'cellLabel'}>
                    {square?.label}
                </div>
            ) : (
                <input
                    className="cellInput"
                    value={inputValue}
                    id={`cell${classIndex}`}
                    disabled={square.disabled}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') onEnter(inputValue);
                    }}
                    style={{
                        backgroundColor: hasAnswer
                            ? isCorrect
                                ? 'lightGreen'
                                : 'coral'
                            : '',
                    }}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    onBlur={() => customOnBlur()}
                />
            )}
        </div>
    );
}
