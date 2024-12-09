import { useState } from 'react';
import './gridInput.css';

export default function GridInput({ square, onEnter, label }) {
    const [inputValue, setValue] = useState('');
    return (
        <div
            className={
                square?.label?.length ? 'cellInputContainer' : 'emptyCell'
            }
        >
            {label ? (
                <div className="cellLabel">{square?.label}</div>
            ) : (
                <input
                    className="cellInput"
                    value={inputValue}
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
