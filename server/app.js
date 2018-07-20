const Koa = require('koa');
const http = require('http');
const app = new Koa();
const server = http.Server(app.callback());
const io = require('socket.io')(server);

const router = require('./routers/api');

app
  .use(router.routes())
  .use(router.allowedMethods());

io.on('connection', socket => {
  socket.on('message', data => {
    console.log('user send a message');
    io.sockets.send(data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(8000, () => {
  console.log('app runs in *:8000');
});


