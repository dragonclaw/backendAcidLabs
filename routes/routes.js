module.exports = function(app) {
  const index = require('./index');

  // initial route
  app.use('/', index);

  app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found.' });
    next();
  });
};
