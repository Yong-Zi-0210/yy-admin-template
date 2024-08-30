import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { setSidebarStatus } from '@/utils/cache/local-storage'
/** 设备类型 */
export enum DeviceEnum {
  Mobile,
  Desktop
}

/** 侧边栏打开状态常量 */
export const SIDEBAR_OPENED = 'opened'
/** 侧边栏关闭状态常量 */
export const SIDEBAR_CLOSED = 'closed'

export type SidebarOpened = typeof SIDEBAR_OPENED
export type SidebarClosed = typeof SIDEBAR_CLOSED

interface Sidebar {
  opened: boolean
  withoutAnimation: boolean
}

function handleSidebarStatus(opened: boolean) {
  opened ? setSidebarStatus(SIDEBAR_OPENED) : setSidebarStatus(SIDEBAR_CLOSED)
}

const useAppStore = defineStore('app', () => {
  // 侧边栏状态
  const sidebar: Sidebar = reactive({
    opened: true,
    withoutAnimation: false
  })
  // 设备类型
  const device = ref<DeviceEnum>(DeviceEnum.Desktop)
  /** 监听侧边栏 opened 状态 */
  watch(
    () => sidebar.opened,
    opened => handleSidebarStatus(opened)
  )

  /** 切换侧边栏 */
  const toggleSidebar = (withoutAnimation: boolean = false) => {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = withoutAnimation
  }
  /** 关闭侧边栏 */
  const closeSidebar = (withoutAnimation: boolean) => {
    sidebar.opened = false
    sidebar.withoutAnimation = withoutAnimation
  }
  /** 切换设备类型 */
  const toggleDevice = (value: DeviceEnum) => {
    device.value = value
  }

  return { device, sidebar, toggleSidebar, closeSidebar, toggleDevice }
})

export default useAppStore
