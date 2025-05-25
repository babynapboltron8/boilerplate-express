let express = require('express');
let bodyParser = require('body-parser');
let app = express();
require('dotenv').config();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

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

app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

app.get('/name', (req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;
  res.json({ name: `${firstName} ${lastName}` });
});

module.exports = app;
