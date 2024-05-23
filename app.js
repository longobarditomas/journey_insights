const express = require('express');
const app = express();
const { port } = require('./config/config');
const limiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes/index');

app.use(express.static('public'));
app.use(express.json());
app.use(limiter);
app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
