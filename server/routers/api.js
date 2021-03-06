const Router = require('koa-router');
const koaBody = require('koa-body');
const md5 = require('md5');
const router = new Router({ prefix: '/api' });
let UserModel = require('../models/user');
const { 
  OK, 
  USER_NOT_EXIST, 
  USER_ALREADY_EXIST, 
  PASSWORD_ERROR, 
  PARAMETER_ERROR,
  TOKEN_ERROR
} = require('../constants');
const { createToken, verifyToken, hashPassword, checkPassword } = require('../helper');

router.get('/users/:account', async ctx => {
  const { account } = ctx.params;
  const { token } = ctx.query;
  if (!token || !account) {
    ctx.body = {
      ...PARAMETER_ERROR
    };
  } else {
    const user = await UserModel.findOne({ account });
    verifyToken(token, (err, decode) => {
      if (err) {
        ctx.body = {
          ...TOKEN_ERROR,
          err
        };
      } else if (!user) {
        ctx.body = {
          ...USER_NOT_EXIST
        };
      } else {
        ctx.body = {
          ...OK,
          data: user,
          decode
        };
      }
    });
  }
});

/**
 * 查询用户
 */
router.get('/users', async ctx => {
  const { token, field, value } = ctx.query;

  if (!field || !value || !token ) {
    ctx.body = {
      ...PARAMETER_ERROR
    };
  } else {
    const users = await UserModel.find({ [field]: new RegExp(value, 'i') });
    verifyToken(token, (err, decode) => {
      if (err) {
        ctx.body = {
          ...TOKEN_ERROR,
          err
        };
      } else {
        ctx.body = {
          ...OK,
          data: users,
          decode
        };
      }
    });
  }
  
});

/**
 * 登录
 */
router.post('/users/login', koaBody(), async ctx => {
  const { account, password } = ctx.request.body;
  if (account && password) {
    const user = await UserModel.findOne({ account });
    if (user) {
      const match = await checkPassword(password, user.password);
      if (match) {
        const token = createToken({
          account,
          password: user.password,
          username: user.username,
          friends: user.friends
        });
        ctx.response.body = {
          ...OK,
          data: {
            user,
            token
          }
        };
      } else {
        ctx.response.body = {
          ...PASSWORD_ERROR
        };
      }
      
    } else {
      ctx.response.body = {
        ...USER_NOT_EXIST
      };
    }
  } else {
    ctx.response.body = {
      ...PARAMETER_ERROR
    };
  }
});

/**
 * 注册
 */
router.post('/users/register', koaBody(), async ctx => {
  const { account, username, password } = ctx.request.body;

  if (account && username && password) {
    const user = await UserModel.findOne({ account });
    if (!user) {
      const hashedPassword = await hashPassword(password);
      let newUser = new UserModel({
        account,
        username,
        password: hashedPassword,
        avatarURL: `https://www.gravatar.com/avatar/${md5(account)}?f=y&d=identicon`
      });
      await newUser.save();
      const token = createToken({
        account,
        hashedPassword,
        username,
        friends: newUser.friends
      });
      ctx.response.body = {
        ...OK,
        data: {
          user: newUser,
          token
        }
      };
    } else {
      ctx.response.body = {
        ...USER_ALREADY_EXIST
      };
    }
  } else {
    ctx.response.body = {
      ...PARAMETER_ERROR
    };
  }
});

/**
 * 添加好友
 */
router.patch('/user/friend', koaBody(), async ctx => {
  const { token, account, friend } = ctx.request.body;
  if (!token || !friend || !account) {
    ctx.body = {
      ...PARAMETER_ERROR
    }
  } else {
    const userQuery = await UserModel.findOne({ account });
    const friendQuery = await UserModel.findOne({ account: friend });
    let decode;
    try {
      decode = verifyToken(token);
    } catch(error) {
      decode = error;
    }
    if (decode instanceof Error) {
      ctx.body = {
        ...TOKEN_ERROR,
        decode
      };
    } else if(!userQuery || !friendQuery) {
      ctx.body = {
        ...USER_NOT_EXIST,
      };
    } else if (userQuery.friends.some(friendObj => friendObj.account === friend)) {
      ctx.body = {
        code: 20009,
        message: '用户已添加该好友'
      };
    } else {
      userQuery.friends.push({
        account: friendQuery.account,
        username: friendQuery.username,
        gender: friendQuery.gender,
        avatarURL: friendQuery.avatarURL
      });
      const updatedUser = await userQuery.save();
      ctx.body = {
        ...OK,
        data: updatedUser,
        decode
      };
    }
  };

});

module.exports = router;