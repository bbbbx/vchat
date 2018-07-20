const mongoose = require('mongoose');
const dbConfig = 'mongodb://127.0.0.1:27017/vchat';
mongoose.connect(dbConfig, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('MongoDB 连接成功');
});

db.on('error', err => {
  console.error('MongoDB 连接失败！', err);
  mongoose.disconnect();
});

module.exports = mongoose;
