// src/utils/gameLogic.js
export function generateNewBalls(board) {
    const newBoard = [...board];
    const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
    
    // Добавление новых шаров на случайные свободные клетки
    for (let i = 0; i < 3; i++) {
      let row, col;
      do {
        row = Math.floor(Math.random() * newBoard.length);
        col = Math.floor(Math.random() * newBoard[0].length);
      } while (newBoard[row][col] !== null);
  
      const color = colors[Math.floor(Math.random() * colors.length)];
      newBoard[row][col] = { color, animationType: 'appear' }; // Анимация появления
    }
  
    return newBoard;
  }
  
  export function checkForLines(board, setScore) {
    // Логика для проверки линий и удаления
    // Применение 'disappear' для шаров, которые должны исчезнуть
    return board;
  }
  