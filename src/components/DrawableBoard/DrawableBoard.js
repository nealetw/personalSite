import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';

import './drawableBoard.css';

function DrawableBoard(props) {
    const canvas = useRef(null);
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
    const [selectedColor, setSelectedColor] = useState('black');
    const [size, setSize] = useState(5);
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
    }, []);

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
        [drawing, position]
    );

    const drawLine = (originalPosition, newPosition) => {
        if (!canvas.current) {
            return null;
        }

        const context = canvas.current.getContext('2d');

        if (context) {
            const isWhite = selectedColor === 'white';
            context.strokeStyle = selectedColor;
            context.lineJoin = 'round';
            context.lineWidth = isWhite ? size * 2 : size;

            context.beginPath();
            context.moveTo(originalPosition.x, originalPosition.y);
            context.lineTo(newPosition.x, newPosition.y);
            context.closePath();

            context.stroke();
        }
    };

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
                                ></img>
                            </>
                        );
                    return c === 'white' ? (
                        <div
                            className={classNames([
                                'eraserSwatch',
                                c === selectedColor ? 'selectedEraser' : '',
                            ])}
                            onClick={() => setSelectedColor(c)}
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
                        ></img>
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
        </>
    );
}

export default DrawableBoard;
