/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

export function formatToDateTime(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format)
}

export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format)
}

/**
 * 根据传入的date返回字符串:
 * 如果是当天的 -> 展示 今天 HH:mm:ss
 * 如果是昨天的 -> 展示 昨天 HH:mm:ss
 * 超过昨天的 -> 展示 YYYY-MM-DD HH:mm:ss
 **/
export function formatRelativeTime(date: dayjs.ConfigType): string {
  const now = dayjs()
  const today = now.startOf('day')
  const yesterday = today.subtract(1, 'day')
  const day = dayjs(date)

  if (day.isSame(today, 'day')) {
    return day.format('今天 HH:mm:ss')
  } else if (day.isSame(yesterday, 'day')) {
    return day.format('昨天 HH:mm:ss')
  }
  return dayjs(date).format(DATE_TIME_FORMAT)
}

export const dateUtil = dayjs

// 获取当前的时间戳字符串
export const getCurrentTimeStamp = () => {
  return new Date().getTime().toString()
}
