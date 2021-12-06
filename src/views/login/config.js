export const passwordRules = [
  {
    required: true,
    message: '密码不能为空',
    trigger: 'onChange'
  },
  {
    pattern: /^[a-zA-Z0-9_-]{4,12}$/,
    message: '密码为4到12位（字母,数字,下划线,减号)',
    trigger: 'onChange'
  }
]
export const usernameRules = [
  {
    required: true,
    message: '账号不能为空',
    trigger: 'onChange'
  },
  {
    pattern: /^[a-zA-Z0-9]{4,16}$/,
    message: '账号为4到16位（字母,数字)',
    trigger: 'onChange'
  }
]
