const express = require('express');
const app = express();
require('./models/register-plugins');

app.use(require('cors')());
app.use(express.static('public'));
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');
if(process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static('public'));

app.get('/hello', (req, res) => res.send('world'));

app.use(checkConnection);

const tours = require('../e2e/routes/tours');
app.use('/api/v1/tours', tours);

const api404 = require('./middleware/api404');
app.use('/api', api404);

app.use((req, res) => {
  res.sendFile('index.html', { root: './public' });
});

const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;
