// src/components/Board.js
import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import { generateNewBalls, checkForLines,arraysEqual } from '../utils/gameLogic';
import { findPath } from '../utils/pathFinder';

const BOARD_SIZE = 9;

function Board({ score, setScore }) {
    const mainArr = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        const row = [];
        for (let i = 0; i < BOARD_SIZE; i++) row.push(null);
        mainArr.push(row);
    }

    //Здесь нейросеть допустила ошибку. Вложенный fill не создает новые объекты в памяти
    // const [board, setBoard] = useState(Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)));
    const [board, setBoard] = useState(mainArr);
    const [selectedBall, setSelectedBall] = useState(null); // Хранение координат выбранного шара

    useEffect(() => {
        const newBoard = generateNewBalls(board);
        setBoard(newBoard);
    }, []);

    // Функция для обновления доски после каждого хода
    const updateBoard = () => {
        const newBoard = checkForLines(board, setScore);
        setBoard(newBoard);
    };

    const handleCellClick = (row, col) => {
        const cellValue = board[row][col];
        
        if (cellValue) {
          // Выбор шара
          setSelectedBall(selectedBall && selectedBall.row === row && selectedBall.col === col ? null : { row, col });
        } else if (selectedBall) {
          // Проверка пути перед перемещением шара
          const start = [selectedBall.row, selectedBall.col];
          const end = [row, col];
    
          if (findPath(start, end, board)) {
            moveBall(selectedBall, { row, col });
            setSelectedBall(null);
          }
        }
      };

      const moveBall = (from, to) => {
        const newBoard = [...board];
        newBoard[to.row][to.col] = { ...newBoard[from.row][from.col], animationType: 'move' };
        newBoard[from.row][from.col] = null;
        setBoard(newBoard);
    
        // Проверка и удаление линий, если они есть
        const updatedBoard = checkForLines(newBoard, setScore);
        // Если были удаленные линии, обновляем доску без добавления новых шаров
        if (!arraysEqual(updatedBoard,newBoard)){        // if (updatedBoard.toString() !== newBoard.toString()) {
            setTimeout(() => {
                setBoard(updatedBoard);
                checkForLines(updatedBoard, setScore); // Проверка на новые линии после добавления шаров
              }, 300); // Задержка для завершения анимации
            } else {
          // Если линий не было, добавляем три новых шара
          setTimeout(() => {
            const boardWithNewBalls = generateNewBalls(updatedBoard);
            setBoard(boardWithNewBalls);
            checkForLines(boardWithNewBalls, setScore); // Проверка на новые линии после добавления шаров
          }, 300); // Задержка для завершения анимации
        }
      };


    return (
        <div className="board">
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <Cell
                        key={`${rowIndex}-${colIndex}`}
                        value={cell}
                        isSelected={selectedBall && selectedBall.row === rowIndex && selectedBall.col === colIndex}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                    />
                ))
            )}
        </div>
    );
}

export default Board;
