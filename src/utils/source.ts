// 设备类型枚举
export enum DeviceType {
  PC = 'pc',
  APP = 'app'
}

// 平台类型枚举
export enum Platform {
  Android = 'android',
  iOS = 'ios',
  iPad = 'ipad',
  Desktop = 'desktop'
}

// UserAgent 工具类
class UserAgentHelper {
  private readonly userAgent: string

  constructor() {
    this.userAgent = navigator.userAgent.toLowerCase()
  }

  private matches(pattern: string | RegExp): boolean {
    return typeof pattern === 'string'
      ? this.userAgent.includes(pattern)
      : pattern.test(this.userAgent)
  }

  isWeCom(): boolean {
    return this.matches('wxwork')
  }

  isWeChat(): boolean {
    return this.matches('micromessenger')
  }

  isAndroid(): boolean {
    return this.matches(/android/i)
  }

  isIOS(): boolean {
    return this.matches(/iphone|ipad|ipod/i)
  }

  isPad(): boolean {
    return this.matches(/ipad/i)
  }

  isMobile(): boolean {
    return this.matches(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i)
  }

  isMobileOnly(): boolean {
    return this.matches(/android|webos|iphone|blackberry|iemobile|opera mini/i)
  }
}

// 创建单例实例
const ua = new UserAgentHelper()

// Source 管理类
class SourceManager {
  private _source: string

  constructor(initialSource: string) {
    this._source = initialSource
  }

  get source(): string {
    return this._source
  }

  updateSource(newSource: string): void {
    this._source = newSource
  }
}

// 创建单例实例
export const sourceManager = new SourceManager('App')

// 导出公共方法
export const getSource = (): string => sourceManager.source
export const updateSource = (newSource: string): void => sourceManager.updateSource(newSource)

// 设备和环境相关的判断
export const needSSO = (): boolean => {
  // if (ua.isMobile() && (isWeCom() || isWeChat())) {
  //   return false
  // }
  return true
}

export const needVoiceInput = (): boolean => ua.isMobile() && (ua.isWeCom() || ua.isWeChat())

export const isWeCom = (): boolean => ua.isWeCom()
export const isWeChat = (): boolean => ua.isWeChat()
export const isMobile = (): boolean => ua.isMobile()
export const isMobileOnly = (): boolean => ua.isMobileOnly()
export const isPad = (): boolean => ua.isPad()
export const isAndroid = (): boolean => ua.isAndroid()
export const isIOS = (): boolean => ua.isIOS()
export const isPC = (): boolean => !ua.isMobile()

export const getDeviceType = (): DeviceType => (ua.isMobile() ? DeviceType.APP : DeviceType.PC)

export const isLandscape = (): boolean => window.screen.width > window.screen.height

export const isNeedHistory = (): boolean => ua.isMobile()
