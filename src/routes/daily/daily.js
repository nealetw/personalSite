import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import SiteSignature from '../../components/SiteSignature/signature';
import GridInput from '../../components/GridInput/gridInput';
import { dictionaryCall } from '../../api';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategory, processWord } from './utils';

import './daily.css';
import DrawableBoard from '../../components/DrawableBoard/DrawableBoard';

function Daily() {
    const versionNumber = '0.1';
    useEffect(() => {
        document.title = 'Lingual(e)';
    }, []);

    const emptyData = [
        { label: '1', value: '', row: 1, column: 1 },
        { label: '2', value: '', row: 1, column: 2 },
        { label: '3', value: '', row: 1, column: 3 },
        { label: '4', value: '', row: 2, column: 1 },
        { label: '5', value: '', row: 2, column: 2 },
        { label: '6', value: '', row: 2, column: 3 },
        { label: '7', value: '', row: 3, column: 1 },
        { label: '8', value: '', row: 3, column: 2 },
        { label: '9', value: '', row: 3, column: 3 },
    ];

    useEffect(() => {
        constructColumnsAndRows();
    }, []);
    const [columns, setColumns] = useState([
        { label: '' },
        { label: 'column1', category: 1 },
        { label: 'column2', category: 2 },
        { label: 'column3', category: 3 },
    ]);
    const [rows, setRows] = useState([
        { label: '' },
        { label: 'row1', category: 4 },
        { label: 'row2', category: 5 },
        { label: 'row3', category: 6 },
    ]);

    const [cookies, setCookies] = useCookies(['data']);
    const [gridData, setGridData] = useState(emptyData);
    const [mappedGrid, setMappedGrid] = useState();
    const [focusedSquare, setFocusedSquare] = useState();

    useEffect(() => {
        const rowsAndDataMapping = [...gridData];
        rowsAndDataMapping.splice(6, 0, rows[3]);
        rowsAndDataMapping.splice(6, 0, null);
        rowsAndDataMapping.splice(3, 0, rows[2]);
        rowsAndDataMapping.splice(3, 0, null);
        rowsAndDataMapping.splice(0, 0, rows[1]);
        rowsAndDataMapping.splice(0, 0, null);
        setMappedGrid(rowsAndDataMapping);
    }, [gridData, rows, columns]);

    const sendGridCell = (word, cat1, cat2, square) => {
        if (word.length)
            dictionaryCall(word)
                .then((r) => {
                    const goodword = processWord(r, cat1, cat2);
                    const index = gridData.findIndex(
                        (t) => t?.label === square?.label
                    );
                    let newValues = [...gridData];
                    newValues[index] = {
                        ...newValues[index],
                        value: word,
                        success: goodword,
                        disabled: true,
                    };
                    setGridData(newValues);
                })
                .catch((e) => {
                    toast.error(`Seems like that isn't word`, {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        closeButton: false,
                        newestOnTop: false,
                        draggable: false,
                        error: true,
                        transition: Zoom,
                    });
                });
    };

    const constructColumnsAndRows = () => {
        const newColumns = [];
        for (let x = 0; x < 4; x++) {
            if (x)
                newColumns.push(
                    getCategory(
                        'col',
                        newColumns.map((t) => t.category)
                    )
                );
            else newColumns.push({ label: '' });
        }
        setColumns(newColumns);
        const newRows = [];
        for (let x = 0; x < 4; x++) {
            if (x)
                newRows.push(
                    getCategory(
                        'row',
                        newRows.map((t) => t.category)
                    )
                );
            else newRows.push({ label: '' });
        }
        setRows(newRows);
    };

    return (
        <div className="dailyApp">
            <link
                href="https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&family=Permanent+Marker&display=swap"
                rel="stylesheet"
            />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="dailyAppContainer">
                <DrawableBoard className="drawableBoard" />
                <div className="dailyGrid">
                    {columns.map((column, index) => (
                        <GridInput
                            selectedLabel={index === focusedSquare?.[1]}
                            label={true}
                            square={column}
                        />
                    ))}
                    {mappedGrid?.map((data, index) => {
                        if (data?.hasOwnProperty('value'))
                            return (
                                <GridInput
                                    square={data}
                                    classIndex={index}
                                    onEnter={(word) =>
                                        sendGridCell(
                                            word,
                                            rows[data.row]?.category,
                                            columns[data.column]?.category,
                                            data
                                        )
                                    }
                                    customOnFocus={(square) =>
                                        setFocusedSquare([
                                            square.row,
                                            square.column,
                                        ])
                                    }
                                    customOnBlur={setFocusedSquare}
                                />
                            );
                        return <GridInput label={true} square={data} />;
                    })}
                </div>
            </div>
            <SiteSignature pageVersion={versionNumber} />
        </div>
    );
}

export default Daily;
