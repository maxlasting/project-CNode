export const menuSchema = {
  home: '首页',
  book: '教程',
  'info-circle-o': '关于',
}

export const menuItemSchema = {
  '/index': 'home',
  '/book': 'book',
  '/info': 'info-circle-o',
}

export const linkSchema = {
  home: '/index',
  book: '/book',
  'info-circle-o': '/info',
  user: 'login',
  flag: 'register',
}

export const tabSchema = {
  all: '全部',
  good: '精华',
  share: '分享',
  ask: '问答',
  job: '招聘',
  dev: '测试',
}

export default { menuSchema, tabSchema, linkSchema }