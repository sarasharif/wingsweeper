const createNewGame = (boardSize, mineCount) => {
  CURRENT_GAME.board = [[boardSize], [mineCount]];
  CURRENT_GAME.status = "I changed the status";
};

const clickBox = () => {};

const getCurrentGame = () => CURRENT_GAME;

module.exports = {
  createNewGame,
  clickBox,
  getCurrentGame
};
