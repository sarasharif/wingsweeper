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
  const boxes = new Array(boxCount).fill().map(item => {
    return {
      status: BOX_STATUS.CLOSED,
      value: 0
    };
  });
  mineIndices.forEach(index => {
    boxes[index].value = -1;
  });

  const board = makeBoardFromBoxes(boxes);

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

const clickBox = () => {};

module.exports = {
  createNewGame,
  clickBox
};
