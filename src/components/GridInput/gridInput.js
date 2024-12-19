import { useState } from 'react';
import './gridInput.css';
import classNames from 'classnames';

export default function GridInput({
    square,
    onEnter,
    label,
    selectedLabel,
    classIndex,
    customOnFocus,
    customOnBlur,
    majorityAnswer,
}) {
    const [inputValue, setValue] = useState('');
    const tryFocus = () => {
        if (classIndex && !square.hasOwnProperty('success')) {
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
                    tabIndex={square.label}
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
            {majorityAnswer ? (
                <div className="majority">
                    <span className={classNames(['majorityLabel'])}>
                        Majority:
                    </span>
                    <span className={classNames(['majorityAnswer'])}>
                        {majorityAnswer}
                    </span>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
