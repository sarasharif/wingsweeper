const createNewGame = (boardSize, mineCount) => {
  const boxCount = boardSize ** 2;
  const mineIndices = generateMineIndices(mineCount, boxCount);
  const board = generateGameBoard(boxCount, mineIndices);
  CURRENT_GAME.board = board;
  CURRENT_GAME.status = "inPlay";
  CURRENT_GAME.mines = mineIndices;
};

const generateMineIndices = (mineCount, boxCount) => {
  mines = [];
  while (mines.length < mineCount) {
    const i = Math.floor(Math.random() * boxCount);
    if (mines.indexOf(i) == -1) {
      mines.push(i);
    }
  }
  return mines;
};

const generateGameBoard = (boxCount, mineIndices) => {
  // create mineless board
  const boxes = new Array(boxCount).fill().map(item => {
    return {
      status: BOX_STATUS.CLOSED,
      value: 0
    };
  });

  // add mines
  mineIndices.forEach(index => {
    boxes[index].value = -1;
  });

  let board = makeBoardFromBoxes(boxes);

  board = incrementNeighbors(board);
  return board;
};

const makeBoardFromBoxes = input => {
  const boardSize = Math.sqrt(input.length);

  let row;
  let boxes = input;
  let board = [];
  while (board.length < boardSize) {
    let row = boxes.slice(0, boardSize);
    boxes = boxes.slice(boardSize);
    board = [...board, row];
  }

  return board;
};

const incrementNeighbors = board => {
  const n = board.length;

  let i = 0;
  while (i < n) {
    let j = 0;
    while (j < n) {
      const box = board[i][j];
      const isMine = box.value === -1;
      if (isMine) {
        const allNeighbors = getAllNeighbors(i, j);
        allNeighbors.forEach(({ x, y }) => {
          if (x >= 0 && y >= 0 && x < n && y < n) {
            if (board[x][y].value > -1) {
              board[x][y].value += 1;
            }
          }
        });
      }
      j++;
    }
    i++;
  }

  return board;
};

const getAllNeighbors = (i, j) => {
  return [
    { x: i - 1, y: j - 1 },
    { x: i, y: j - 1 },
    { x: i + 1, y: j - 1 },
    { x: i - 1, y: j },
    { x: i + 1, y: j },
    { x: i - 1, y: j + 1 },
    { x: i, y: j + 1 },
    { x: i + 1, y: j + 1 }
  ];
};

const getAdjacentNeighbors = (i, j) => {
  return [
    { x: i, y: j - 1 },
    { x: i - 1, y: j },
    { x: i + 1, y: j },
    { x: i, y: j + 1 }
  ];
};

const clickBox = (x, y, action = "open") => {
  if (action === "open") {
    if (CURRENT_GAME.board[x][y].value === -1) {
      CURRENT_GAME.status = GAME_STATUS.LOST;
    } else if (CURRENT_GAME.board[x][y].value === 0) {
      // Call getAdjacent Neighbors, push neighbors(value=0) into stack
      // For each box in stack: pop, call adjacent neighbors, while stack.length > 0;
    }
    CURRENT_GAME.board[x][y].status = BOX_STATUS.OPEN;
  }
  if (action === "flagged") {
    CURRENT_GAME.board[x][y].status = BOX_STATUS.FLAGGED;
  }
};

module.exports = {
  createNewGame,
  clickBox
};
