import CacheKey from "@/constants/cache-key";
import { type SidebarOpened, SidebarClosed } from "@/constants/app-key";
import { UserInfo } from "@/store/module/user";
/** 缓存数据时用到的 Key */
export const getSidebarStatus = () => {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS);
};
export const setSidebarStatus = (
  sidebarStatus: SidebarOpened | SidebarClosed
) => {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus);
};

export const getUserInfo = () => {
  const info = sessionStorage.getItem(CacheKey.USER_INFO);
  if (info) {
    return JSON.parse(info);
  }
};
export const setUserInfo = (userInfo: UserInfo) => {
  return sessionStorage.setItem(CacheKey.USER_INFO, JSON.stringify(userInfo));
};
