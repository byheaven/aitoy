import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import './index.scss'

// 获取今日日期字符串（用于关卡ID）
const getTodayId = () => {
  const today = new Date()
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
}

// 计算倒计时
const getCountdown = (targetTime: number) => {
  const now = Date.now()
  const diff = targetTime - now
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, canOpen: true }

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { hours, minutes, seconds, canOpen: false }
}

export default function Index() {
  const [todayId] = useState(getTodayId())
  const [attempts, setAttempts] = useState(0)
  const [isCleared, setIsCleared] = useState(false)
  const [chestUnlockTime, setChestUnlockTime] = useState(0)
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0, canOpen: false })

  // 加载今日数据
  useEffect(() => {
    const loadTodayData = () => {
      try {
        const data = Taro.getStorageSync('suns_puzzle_game_data')
        if (data && data.currentLevel === todayId) {
          setAttempts(data.attempts || 0)
          setIsCleared(data.isCleared || false)
          setChestUnlockTime(data.todayChest?.unlockTime || 0)
        }
      } catch (e) {
        console.log('加载数据失败', e)
      }
    }
    loadTodayData()
  }, [todayId])

  // 更新倒计时
  useEffect(() => {
    if (!chestUnlockTime) return

    const timer = setInterval(() => {
      setCountdown(getCountdown(chestUnlockTime))
    }, 1000)

    return () => clearInterval(timer)
  }, [chestUnlockTime])

  // 开始挑战
  const handleStartChallenge = () => {
    Taro.navigateTo({ url: '/pages/game/index' })
  }

  return (
    <View className='index-page'>
      {/* 顶部标题 */}
      <View className='header'>
        <Text className='title'>🦈 鲨之星</Text>
        <Text className='subtitle'>孙颖莎主题消除游戏</Text>
      </View>

      {/* 今日关卡卡片 */}
      <View className='daily-card'>
        <View className='card-header'>
          <Text className='card-title'>今日关卡</Text>
          <Text className='card-date'>{todayId}</Text>
        </View>

        <View className='card-content'>
          {isCleared ? (
            <View className='cleared-status'>
              <Text className='cleared-icon'>✅</Text>
              <Text className='cleared-text'>今日已通关</Text>
              <Text className='attempts-text'>挑战次数: {attempts} 次</Text>
            </View>
          ) : (
            <View className='challenge-status'>
              <Text className='challenge-icon'>🏓</Text>
              <Text className='challenge-text'>准备开始挑战？</Text>
              {attempts > 0 && (
                <Text className='attempts-text'>已挑战 {attempts} 次</Text>
              )}
            </View>
          )}
        </View>

        <Button
          className='start-btn'
          onClick={handleStartChallenge}
        >
          {isCleared ? '再次挑战' : '开始挑战'}
        </Button>
      </View>

      {/* 宝箱状态卡片 */}
      <View className='chest-card'>
        <View className='card-header'>
          <Text className='card-title'>今日宝箱</Text>
        </View>

        <View className='card-content'>
          {!isCleared ? (
            <View className='chest-locked'>
              <Text className='chest-icon'>🔒</Text>
              <Text className='chest-text'>完成今日关卡解锁宝箱</Text>
            </View>
          ) : countdown.canOpen ? (
            <View className='chest-ready'>
              <Text className='chest-icon'>🎁</Text>
              <Text className='chest-text'>宝箱已就绪，快去开启！</Text>
            </View>
          ) : (
            <View className='chest-countdown'>
              <Text className='chest-icon'>⏰</Text>
              <Text className='chest-text'>宝箱冷却中</Text>
              <Text className='countdown-time'>
                {String(countdown.hours).padStart(2, '0')}:
                {String(countdown.minutes).padStart(2, '0')}:
                {String(countdown.seconds).padStart(2, '0')}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* 底部提示 */}
      <View className='footer'>
        <Text className='footer-text'>每日0点刷新关卡</Text>
      </View>
    </View>
  )
}
