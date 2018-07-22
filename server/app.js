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

  socket.on('add_user', username => {
    socket.username = username;
    if (onlineUsers.includes(username)) {
      socket.emit('user_already_online', username);
    } else {
      onlineUsers.push(username);
      io.sockets.emit('update_onlineUsers', onlineUsers);
    }
    console.log('onlineUsers', onlineUsers);
  });

  socket.on('message', ({ from, message }) => {
    console.log(from, message);
    socket.broadcast.send({ from, message });  // 广播给其他用户
    socket.send({ from, message });  // 发给自己
  });

  socket.on('disconnect', () => {
    console.log('有用户断开连接');
    if (onlineUsers.includes(socket.username)) {
      onlineUsers.splice(onlineUsers.indexOf(socket.username), 1);
      io.sockets.emit('update_onlineUsers', onlineUsers);
    } else {

    }
    console.log('onlineUsers', onlineUsers);
  });
});

server.listen(8000, () => {
  console.log('app runs in *:8000');
});


