export interface MenuItem {
  id: string
  name: string
  icon: string
  type: string
  permission?: string
  testOnly?: boolean
}

export interface MenuConfig {
  items: MenuItem[]
}
