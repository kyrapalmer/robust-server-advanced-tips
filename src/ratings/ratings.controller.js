const ratings = require("../data/ratings-data");

function create(req, res) {
  const { data: { comment } = {} } = req.body;
  const newRating = {
    id: ratings.length + 1,
    noteId,
    stars,
    comment,
  };
  ratings.push(newRating);
  res.status(201).json({ data: newRating });
};

function list(req, res) {
  const { noteId } = req.params;
  const byResult = noteId ? rating => rating.noteId === noteId : () => true;
  res.json({ data: ratings.filter(byResult) });
}

function hasComment(req, res, next) {
  const { data: { comment } = {} } = req.body;

  if (comment) {
    return next();
  }
  next({ status: 400, message: "A 'comment' property is required." });
}

module.exports = {
  create: [hasComment, create],
  list,
  hasComment,
};