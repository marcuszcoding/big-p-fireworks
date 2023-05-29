const homepage = (req, res) => {
  req.session.views = (req.session.views || 0) + 1;
  res.status(200).send({ message: '🏡', views: req.session.views });
};

module.exports = { homepage };