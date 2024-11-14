// src/utils/pathFinder.js

export function findPath(start, end, board) {
  const [startRow, startCol] = start;
  const [endRow, endCol] = end;

  // Если начальная и конечная позиции совпадают, то путь есть
  if (startRow === endRow && startCol === endCol) return true;

  // Определим размеры доски
  const numRows = board.length;
  const numCols = board[0].length;

  // Направления для передвижения по сетке (вверх, вниз, влево, вправо)
  const directions = [
    [-1, 0], // вверх
    [1, 0],  // вниз
    [0, -1], // влево
    [0, 1],  // вправо
  ];

  // Массив для отслеживания посещенных ячеек
  const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false));

  // Инициализация очереди для BFS
  const queue = [[startRow, startCol]];
  visited[startRow][startCol] = true;

  while (queue.length > 0) {
    const [currentRow, currentCol] = queue.shift();

    for (let [dx, dy] of directions) {
      const newRow = currentRow + dx;
      const newCol = currentCol + dy;

      // Проверка, что мы находимся в пределах доски и ячейка не занята другим шаром
      if (
        newRow >= 0 && newRow < numRows &&
        newCol >= 0 && newCol < numCols &&
        !visited[newRow][newCol] &&
        !board[newRow][newCol]
      ) {
        // Если достигли целевой позиции, путь найден
        if (newRow === endRow && newCol === endCol) return true;

        // Отмечаем ячейку как посещенную и добавляем её в очередь для дальнейшей проверки
        visited[newRow][newCol] = true;
        queue.push([newRow, newCol]);
      }
    }
  }

  // Если очередь пустая и путь не найден, возвращаем false
  return false;
}
