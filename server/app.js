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

io.engine.generateId = req => (req._query.account);

io.use((socket, next) => {
  io.clients((err, clients) => {
    if (err) throw err;
    if (clients.includes(socket.id)) {
      next(new Error('用户已登录'));
      socket.disconnect(true);  // [TODO] 服务器端 disconnect 之后，客户端的 socket 触发不了事件
    }
    next();
  });
});

io.on('connection', socket => {
  console.log('新用户连接');
  io.clients((err, clients) => {
    if (err) throw err;
    console.log(clients);
  });
  socket.on('message', ({ from, message }) => {
    console.log(from, message);
    socket.broadcast.send({ from, message });  // 广播给其他用户
    socket.send({ from, message });  // 发给自己
  });

  socket.on('disconnect', reason => {
    console.log('有用户断开连接，reason：', reason);
    io.clients((err, clients) => {
      if (err) throw err;
      console.log(clients);
    });
  });
});

server.listen(8000, () => {
  console.log('app runs in *:8000');
});


