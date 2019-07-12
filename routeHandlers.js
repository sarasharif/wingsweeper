const { createNewGame, clickBox, getCurrentGame } = require("./helpers");

const postGameHandler = (req, res) => {
  const { boardSize, mineCount } = req.body;

  if (boardSize ** 2 <= mineCount) {
    throw new Error("You must have fewer mines than boxes!");
  }

  try {
    CURRENT_GAME.board = createNewGame(boardSize, mineCount);
    CURRENT_GAME.status = GAME_STATUS.IN_PLAY;
  } catch (err) {
    res.send({ error: err.message });
  }

  res.send({ game: CURRENT_GAME });
};

const postClickHandler = (req, res) => {
  const { x, y, action } = req.body;
  const n = CURRENT_GAME.board.length;

  if (x < 0 || y < 0 || x >= n || y >= n) {
    throw new Error("Those are not valid coordinates");
  }

  try {
    clickBox(x, y, action);
  } catch (err) {
    res.send({ error: err.message });
  }
  res.send({ game: CURRENT_GAME });
};

module.exports = {
  postGameHandler,
  postClickHandler
};
