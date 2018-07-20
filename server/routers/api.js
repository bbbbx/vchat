const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router({ prefix: '/api' });
let UserModel = require('../models/user');

router.get('/users', async ctx => {
  const users = await UserModel.find();
  ctx.body = {
    code: 200,
    users
  };
});

router.post('/users', koaBody(), async ctx => {
  const { account, username, password } = ctx.request.body;

  if (account && username && password) {
    const user = await UserModel.findOne({ account });
    if (!user) {
      let newUser = new UserModel({
        account,
        username,
        password
      });
      await newUser.save();
      ctx.response.body = {
        code: 200,
        user: newUser
      };
    } else {
      ctx.response.body = {
        code: 404,
        message: 'User Exists'
      };
    }
  } else {
    ctx.response.body = {
      code: 404,
      message: 'Body Error'
    };
  }
});

module.exports = router;