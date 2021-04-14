const express = require('express');
const http = require('http');

const port = process.env.PORT || '5000';
const app = express();
app.set('port', port);

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes'));

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    code: res.status,
    message: statuses[res.status]
  });
});

server.listen(port);
