const Koa = require('koa');
const cors = require('@koa/cors');
const http = require('http');
const app = new Koa();
const server = http.Server(app.callback());
const io = require('socket.io')(server);

const router = require('./routers/api');

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

io.on('connection', socket => {
  socket.on('message', data => {
    io.sockets.send(data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(8000, () => {
  console.log('app runs in *:8000');
});


