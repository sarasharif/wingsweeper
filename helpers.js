const { BOX_STATUS, BOX_VALUE } = require("./constants");

const createNewGame = (boardSize, mineCount) => {
  const boxCount = boardSize ** 2;
  const board = generateGameBoard(boxCount, mineCount);
  return board;
};

const generateGameBoard = (boxCount, mineCount) => {
  const boxes = new Array(boxCount).fill().map((_, i) => ({
    status: BOX_STATUS.CLOSED,
    value: i < mineCount ? -1 : 0
  }));

  fisherYatesShuffleInPlace(boxes);
  const board = makeBoardFromBoxes(boxes);
  incrementNeighborsInPlace(board);

  return board;
};

const makeBoardFromBoxes = boxes => {
  const n = Math.sqrt(boxes.length);
  const board = new Array(n)
    .fill()
    .map((_, i) => boxes.slice(i * n, (i + 1) * n));
  return board;
};

const incrementNeighborsInPlace = board => {
  const n = board.length;

  let i = 0;
  while (i < n) {
    let j = 0;
    while (j < n) {
      const box = board[i][j];
      const isMine = box.value === -1;
      if (isMine) {
        const allNeighbors = getAllNeighbors(i, j, n);
        allNeighbors.forEach(({ x, y }) => {
          if (board[x][y].value > -1) {
            board[x][y].value += 1;
          }
        });
      }
      j++;
    }
    i++;
  }
};

const getAllNeighbors = (i, j, n) =>
  [
    { x: i - 1, y: j - 1 },
    { x: i, y: j - 1 },
    { x: i + 1, y: j - 1 },
    { x: i - 1, y: j },
    { x: i + 1, y: j },
    { x: i - 1, y: j + 1 },
    { x: i, y: j + 1 },
    { x: i + 1, y: j + 1 }
  ].filter(({ x, y }) => x >= 0 && y >= 0 && x < n && y < n);

const getNeighbors = (i, j, n) =>
  [
    { x: i, y: j - 1 },
    { x: i - 1, y: j },
    { x: i + 1, y: j },
    { x: i, y: j + 1 }
  ].filter(({ x, y }) => x >= 0 && y >= 0 && x < n && y < n);

const clickBox = (i, j, action) => {
  if (action === "flagged") {
    flagBox(i, j);
  } else if (isMine(i, j)) {
    CURRENT_GAME.status = GAME_STATUS.LOST;
  } else {
    let boxesToOpen = [{ x: i, y: j }];
    while (boxesToOpen.length) {
      const { x, y } = boxesToOpen.splice(0, 1)[0];
      openBox(x, y);
      if (isZero(x, y)) {
        const more = getNeighbors(x, y, CURRENT_GAME.board.length).filter(
          ({ x, y }) => CURRENT_GAME.board[x][y].status == BOX_STATUS.CLOSED
        );
        boxesToOpen = [...boxesToOpen, ...more];
      }
    }
  }
};

const flagBox = (i, j) => {
  CURRENT_GAME.board[i][j].status = BOX_STATUS.FLAGGED;
};

const openBox = (i, j) => {
  CURRENT_GAME.board[i][j].status = BOX_STATUS.OPEN;
};

const isMine = (i, j) => CURRENT_GAME.board[i][j].value == BOX_VALUE.MINE;

const isZero = (i, j) => CURRENT_GAME.board[i][j].value == 0;

const fisherYatesShuffleInPlace = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

module.exports = {
  createNewGame,
  clickBox
};
