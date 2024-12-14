import { useEffect, useState } from 'react';
import './drawableBoard.css';

export default function DrawableBoard() {
    const [canvas, setCanvas] = useState(document.getElementById('can'));
    let ctx;
    const [selectedColor, setSelectedColor] = useState('black');
    const [penWidth, setPenWidth] = useState(2);
    let [flag, prevX, currX, prevY, currY, dot_flag] = [
        false,
        0,
        0,
        0,
        0,
        false,
    ];
    console.log(canvas, ctx);
    let w = canvas?.width;
    let h = canvas?.height;

    useEffect(() => {
        setCanvas(document.getElementById('can'));
    }, [document]);

    useEffect(() => {
        console.log('e', canvas);
        init();
        ctx = canvas?.getContext('2d');
    }, [canvas]);

    function init() {
        if (!canvas) return;

        canvas.addEventListener(
            'mousemove',
            function (e) {
                findxy('move', e);
            },
            false
        );
        canvas.addEventListener(
            'mousedown',
            function (e) {
                findxy('down', e);
            },
            false
        );
        canvas.addEventListener(
            'mouseup',
            function (e) {
                findxy('up', e);
            },
            false
        );
        canvas.addEventListener(
            'mouseout',
            function (e) {
                findxy('out', e);
            },
            false
        );
    }

    function color(name) {
        console.log('setting color', name);
        if (name) setSelectedColor(name);
        if (name == 'white') setPenWidth(14);
        else setPenWidth(2);
    }

    function draw() {
        console.log(ctx);
        if (!ctx?.beginPath() || !canvas) return;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = selectedColor;
        ctx.lineWidth = penWidth;
        ctx.stroke();
        ctx.closePath();
    }

    function erase() {
        ctx.clearRect(0, 0, w, h);
    }

    function findxy(res, e) {
        console.log(res);
        if (res == 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas?.offsetLeft;
            currY = e.clientY - canvas?.offsetTop;

            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = selectedColor;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == 'up' || res == 'out') {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas?.offsetLeft;
                currY = e.clientY - canvas?.offsetTop;
                draw();
            }
        }
    }
    const colorPicker = (colorName) => {
        return (
            <div
                style={{
                    width: '10px',
                    height: '10px',
                    background: colorName,
                }}
                id={colorName}
                onClick={() => color(colorName)}
            />
        );
    };
    const colors = [
        'green',
        'blue',
        'red',
        'yellow',
        'orange',
        'black',
        'white',
    ];
    console.log(selectedColor, penWidth);
    return (
        <div>
            <canvas
                id="can"
                width="400"
                height="400"
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    border: '2px solid',
                }}
            ></canvas>
            <div style={{ position: 'absolute', top: '12%', left: '43%' }}>
                Choose Color
            </div>
            <div className="colorsContainer">
                {colors.map((colorName) => {
                    return colorPicker(colorName);
                })}
            </div>
            <input
                type="button"
                value="clear"
                id="clr"
                size="23"
                onClick={erase}
                style={{ position: 'absolute', top: '55%', left: '15%' }}
            />
        </div>
    );
}
