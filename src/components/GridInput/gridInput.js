import { useState } from 'react';
import './gridInput.css';

export default function GridInput({ square, onEnter, label, classIndex }) {
    const [inputValue, setValue] = useState('');
    const tryFocus = () => {
        if (classIndex) {
            const element = document.getElementById(`cell${classIndex}`);
            element.focus();
        }
    };
    return (
        <div
            className={
                square?.label?.length
                    ? label
                        ? 'labelCellContainer'
                        : 'cellInputContainer'
                    : 'emptyCell'
            }
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
                        backgroundColor: square.hasOwnProperty('success')
                            ? square.success
                                ? 'lightGreen'
                                : 'coral'
                            : '',
                    }}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                />
            )}
        </div>
    );
}
