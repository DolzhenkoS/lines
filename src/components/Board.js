// src/components/Board.js
import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import { generateNewBalls, checkForLines } from '../utils/gameLogic';

const BOARD_SIZE = 9;

function Board({ score, setScore }) {
    const mainArr = [];

    for (let i = 0; i < BOARD_SIZE; i++) {
        const row = [];
        for (let i = 0; i < BOARD_SIZE; i++) row.push(null);
        mainArr.push(row);
    }

    // const [board, setBoard] = useState(Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)));
     const [board, setBoard] = useState(mainArr);

    useEffect(() => {
    const newBoard = generateNewBalls(board);
    setBoard(newBoard);
    }, []);

    // Функция для обновления доски после каждого хода
    const updateBoard = () => {
        // const newBoard = checkForLines(board, setScore);
        const newBoard = generateNewBalls(board);
        setBoard(newBoard);
    };

    function handleCellClick(row, col) {
        alert("" + row + " " + col);
    }

    return (<>
        <div className="board">
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <Cell
                        key={`${rowIndex}-${colIndex}`}
                        value={cell}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                    />
                ))
            )}
        </div>
        <button onClick={() => updateBoard()}>ОБновить</button>
    </>
    );
}

export default Board;
