const Koa = require('koa');
const cors = require('@koa/cors');
const http = require('http');
const app = new Koa();
const server = http.Server(app.callback());
const io = require('socket.io')(server);

const router = require('./routers/api');
let onlineUsers = [];

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

io.on('connection', socket => {
  console.log('新用户连接');

  socket.on('disconnect', () => {
    console.log('有用户断开连接');
  });
});

server.listen(8000, () => {
  console.log('app runs in *:8000');
});


