import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import './index.scss'

const TAB_LIST = [
  { pagePath: '/pages/index/index', text: '每日关卡', icon: '🎮' },
  { pagePath: '/pages/chest/index', text: '我的宝箱', icon: '🎁' }
]

export default function CustomTabBar() {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    const pages = Taro.getCurrentPages()
    if (pages.length > 0) {
      const currentPage = pages[pages.length - 1]
      const route = '/' + currentPage.route
      const index = TAB_LIST.findIndex(item => item.pagePath === route)
      if (index >= 0) {
        setSelected(index)
      }
    }
  }, [])

  const handleTabClick = (index: number, pagePath: string) => {
    if (index === selected) return
    setSelected(index)
    Taro.switchTab({ url: pagePath })
  }

  return (
    <View className='custom-tab-bar'>
      {TAB_LIST.map((item, index) => (
        <View
          key={item.pagePath}
          className={`tab-item ${index === selected ? 'active' : ''}`}
          onClick={() => handleTabClick(index, item.pagePath)}
        >
          <Text className='tab-icon'>{item.icon}</Text>
          <Text className='tab-text'>{item.text}</Text>
        </View>
      ))}
    </View>
  )
}
