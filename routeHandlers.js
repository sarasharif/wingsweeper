const { createNewGame, clickBox, getCurrentGame } = require("./helpers");

const postGameHandler = (boardSize, mineCount) => {
  if (boardSize ** 2 <= mineCount) {
    /* ERROR */
  }
  // save that game in memory CURRENT_GAME
  createNewGame(boardSize, mineCount);
  return { game: getCurrentGame() };
};

const postClickHandler = (x, y, action) => {
  // access CURRENT_GAME
  // validate coordinates on closed box
  // generate new board
  // return CURRENT GAME
  return { message: `running postClickHandler with ${x}, ${y}, ${action}` };
};

const getGameHandler = () => ({ game: getCurrentGame() });

module.exports = {
  postGameHandler,
  postClickHandler,
  getGameHandler
};
