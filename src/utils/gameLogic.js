// Определяет минимальное количество шаров в линии для удаления
const MIN_LINE_LENGTH = 5;

// src/utils/gameLogic.js
// Функция для проверки и удаления линий
export function checkForLines(board, setScore) {
  const newBoard = board.map(row => row.slice());
  let scoreToAdd = 0;
  const linesToRemove = new Set();

  // Вспомогательная функция для добавления шаров в линии к удалению
  function addToRemove(row, col) {
    linesToRemove.add(`${row}-${col}`);
  }

  // Проверка горизонтальных, вертикальных и диагональных линий
  function findLines(row, col, dx, dy) {
    const color = board[row][col]?.color;
    if (!color) return;

    const line = [];
    for (let i = 0; i < MIN_LINE_LENGTH; i++) {
      const r = row + i * dx;
      const c = col + i * dy;
      if (r >= 0 && r < board.length && c >= 0 && c < board[0].length && board[r][c]?.color === color) {
        line.push([r, c]);
      } else {
        break;
      }
    }

    // Если нашли линию нужной длины, добавляем её к удалению
    if (line.length >= MIN_LINE_LENGTH) {
      line.forEach(([r, c]) => addToRemove(r, c));
      scoreToAdd += line.length;
    }
  }

  // Проходим по каждой клетке и проверяем все направления для поиска линий
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col]) {
        findLines(row, col, 1, 0);   // Проверка горизонтальных линий
        findLines(row, col, 0, 1);   // Проверка вертикальных линий
        findLines(row, col, 1, 1);   // Проверка диагонали слева направо
        findLines(row, col, 1, -1);  // Проверка диагонали справа налево
      }
    }
  }

  // Удаляем шары в найденных линиях
  linesToRemove.forEach(key => {
    const [row, col] = key.split('-').map(Number);
    newBoard[row][col] = { ...newBoard[row][col], animationType: 'disappear' };
  });

  // Обновляем очки, если были удаленные линии
  if (linesToRemove.size > 0) {
    setScore(prevScore => prevScore + scoreToAdd);
  }

 // Удаление шаров после анимации
  setTimeout(() => {
    linesToRemove.forEach(key => {
      const [row, col] = key.split('-').map(Number);
      newBoard[row][col] = null;
    });
  }, 500); // Таймер для завершения анимации "disappear"

  return newBoard;
}


// src/utils/gameLogic.js

export const COLORS = ['red', 'green', 'blue', 'yellow', 'purple'];

export function generateNewBalls(board, count = 3) {
  const newBoard = board.map(row => row.slice());
  const emptyCells = [];

  // Находим все свободные ячейки
  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[0].length; col++) {
      if (!newBoard[row][col]) emptyCells.push([row, col]);
    }
  }

  // Если меньше трех пустых ячеек, заканчиваем игру или ограничиваем число шаров
  if (emptyCells.length < count) {
    count = emptyCells.length;
    if (count === 0) return newBoard; // Нет места для добавления новых шаров
  }

  // Добавляем шары в случайные пустые ячейки
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const [row, col] = emptyCells.splice(randomIndex, 1)[0];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    newBoard[row][col] = { color, animationType: 'appear' };
  }

  return newBoard;
}
  
export function arraysEqual(arr1, arr2) {
  // Проверяем, одинаковая ли длина массивов
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
      // Проверяем, одинаковая ли длина вложенных массивов
      if (arr1[i].length !== arr2[i].length) return false;

      for (let j = 0; j < arr1[i].length; j++) {
          // Сравниваем элементы
          if (arr1[i][j] !== arr2[i][j]) return false;
      }
  }
  
  return true; // Если все проверки пройдены, массивы равны
}
