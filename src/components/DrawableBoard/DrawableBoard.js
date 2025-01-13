import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Modal from '../Modal/Modal';

import './drawableBoard.css';

function DrawableBoard(props) {
    const canvas = useRef(null);
    useEffect(() => {
        const oldDrawing = localStorage.getItem('drawing');
        if (oldDrawing && canvas) {
            drawDataURIOnCanvas(oldDrawing);
        }
    }, []);
    const colors = [
        'black',
        'blue',
        'green',
        'red',
        'purple',
        'custom',
        'white',
    ];
    const [drawing, setDrawing] = useState(false);
    const [selectedColor, setSelectedColor] = useState();
    // eslint-disable-next-line no-unused-vars
    const [size, setSize] = useState(5);
    const [clearModal, setClearModal] = useState(false);
    const [position, setPosition] = useState(null);
    const onDown = useCallback((event) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setPosition(coordinates);
            setDrawing(true);
        }
    }, []);

    const onUp = useCallback(() => {
        setDrawing(false);
        setPosition(null);
        if (canvas.current) {
            localStorage.setItem('drawing', canvas?.current?.toDataURL());
        }
    }, []);

    function drawDataURIOnCanvas(strDataURI) {
        var ctx = canvas.current.getContext('2d');
        if (!strDataURI.length) {
            ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
        } else {
            var img = new Image();
            img.onload = function () {
                ctx.drawImage(img, 0, 0); // Or at whatever offset you like
            };
            img.src = strDataURI;
        }
    }

    const getCoordinates = (event) => {
        if (!canvas.current) {
            return null;
        }

        const x = event.pageX || event.touches[0].pageX;
        const y = event.pageY || event.touches[0].pageY;

        return {
            x: x - canvas.current.offsetLeft,
            y: y - canvas.current.offsetTop,
        };
    };
    const onMove = useCallback(
        (event) => {
            if (drawing) {
                const newPosition = getCoordinates(event);
                if (position && newPosition) {
                    drawLine(position, newPosition);
                    setPosition(newPosition);
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [drawing, position]
    );

    const drawLine = (originalPosition, newPosition) => {
        if (!canvas.current || !selectedColor) {
            return null;
        }

        const context = canvas.current.getContext('2d');

        if (context) {
            const isWhite = selectedColor === 'white';
            context.strokeStyle = selectedColor;
            context.lineJoin = 'round';
            context.lineWidth = isWhite ? size * 4 : size;

            context.beginPath();
            context.moveTo(originalPosition.x, originalPosition.y);
            context.lineTo(newPosition.x, newPosition.y);
            context.closePath();

            context.stroke();
        }
    };
    const clearModalContent = (
        <>
            <p>Are you sure you want to clear your entire whiteboard?</p>
            <p>This cannot be undone!</p>
            <div className="modalButtons">
                <input
                    value="Clear"
                    type="button"
                    className={classNames(['modalButton', 'clearButton'])}
                    onClick={() => {
                        drawDataURIOnCanvas('');
                        setClearModal(false);
                    }}
                />
                <input
                    value="Cancel"
                    type="button"
                    className="modalButton"
                    onClick={() => setClearModal(false)}
                />
            </div>
        </>
    );

    return (
        <>
            <div className="swatches">
                {colors.map((c) => {
                    if (c === 'custom')
                        return (
                            <>
                                <input
                                    type="color"
                                    id="colorPickerInput"
                                    tabindex={-1}
                                    onChange={(val) => {
                                        setSelectedColor(val.target.value);
                                    }}
                                />
                                <img
                                    src={require('./transparentMarker.png')}
                                    className={classNames([
                                        'colorSwatch',
                                        'rainbowSwatch',
                                        c === 'custom' &&
                                        selectedColor &&
                                        !colors.includes(selectedColor)
                                            ? 'selectedSwatch'
                                            : '',
                                    ])}
                                    style={{ backgroundColor: c }}
                                    onClick={() => {
                                        const elem =
                                            document.getElementById(
                                                'colorPickerInput'
                                            );
                                        elem.click();
                                    }}
                                    alt={`${c}-marker`}
                                />
                            </>
                        );
                    return c === 'white' ? (
                        <div
                            className={classNames([
                                'eraserSwatch',
                                c === selectedColor ? 'selectedEraser' : '',
                            ])}
                            onClick={() => {
                                if (selectedColor === 'white')
                                    setClearModal(true);
                                else setSelectedColor(c);
                            }}
                        ></div>
                    ) : (
                        <img
                            src={require('./transparentMarker.png')}
                            className={classNames([
                                'colorSwatch',
                                c === selectedColor ? 'selectedSwatch' : '',
                            ])}
                            style={{ backgroundColor: c }}
                            onClick={() => setSelectedColor(c)}
                            alt={`eraser`}
                        />
                    );
                })}
            </div>
            <canvas
                className="drawableBoardContainer"
                ref={canvas}
                onMouseDown={onDown}
                onTouchStart={onDown}
                onMouseUp={onUp}
                onTouchEnd={onUp}
                onMouseLeave={onUp}
                onMouseMove={onMove}
                onTouchMove={onMove}
                width={window.innerWidth}
                height={window.innerHeight}
            />
            <Modal
                isOpen={clearModal}
                setIsOpen={setClearModal}
                content={clearModalContent}
            />
        </>
    );
}

export default DrawableBoard;
