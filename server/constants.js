const OK = {
  code: 0
};

const PARAMETER_ERROR = {
  code: 10000,
  message: '参数错误'
};

const USER_NOT_EXIST = {
  code: 20000,
  message: '用户不存在'
};

const USER_ALREADY_EXIST = {
  code: 20001,
  message: '用户已存在'
};

const PASSWORD_ERROR = {
  code: 20002,
  message: '密码错误'
};

const TOKEN_ERROR = {
  code: 20003,
  message: '验证 Token 错误'
};

module.exports = {
  OK,
  USER_ALREADY_EXIST,
  USER_NOT_EXIST,
  PASSWORD_ERROR,
  PARAMETER_ERROR,
  TOKEN_ERROR
};
