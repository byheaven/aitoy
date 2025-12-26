export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/game/index',
    'pages/chest/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#1a1a2e',
    navigationBarTitleText: '鲨之星',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    custom: true,
    color: '#999999',
    selectedColor: '#FF6B6B',
    backgroundColor: '#1a1a2e',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '🎮 每日关卡'
      },
      {
        pagePath: 'pages/chest/index',
        text: '🎁 我的宝箱'
      }
    ]
  }
})
