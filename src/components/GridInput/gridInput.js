import { useState } from 'react';

export default function GridInput({ square, onEnter }) {
    const [inputValue, setValue] = useState('');
    return (
        <input
            value={inputValue}
            disabled={square.disabled}
            onKeyDown={(e) => {
                if (e.key === 'Enter') onEnter(inputValue);
            }}
            style={{ backgroundColor: square.success ? 'green' : '' }}
            onChange={(e) => {
                setValue(e.target.value);
            }}
        />
    );
}
