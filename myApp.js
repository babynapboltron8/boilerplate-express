let express = require('express');
let app = express();
require('dotenv').config();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/public', express.static(__dirname + '/public'));

app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
app.use('/json', (req, res, next) => {
  const message =
    process.env.MESSAGE_STYLE === 'uppercase' ? 'HELLO JSON' : 'Hello json';
  res.json({ message: message });
});

app.get(
  '/now',
  (req, res, next) => {
    req.now = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.now });
  }
);

module.exports = app;
