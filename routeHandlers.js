const postGameHandler = (boardSize, mineCount) => {
  return { message: `running postGameHandler with ${boardSize}, ${mineCount}` };
};

const postClickHandler = (x, y, action) => {
  return { message: `running postClickHandler with ${x}, ${y}, ${action}` };
};

const getGameHandler = () => {
  return { message: `running getGameHandler` };
};

module.exports = {
  postGameHandler,
  postClickHandler,
  getGameHandler
};
