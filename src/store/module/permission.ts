import { defineStore } from 'pinia'
import { type RouteLocationNormalized } from 'vue-router'
const usePermissionStore = defineStore('permission', () => {
  const latestRoute = ref<RouteLocationNormalized>()
  const setLatestRoute = (to: RouteLocationNormalized) => {
    latestRoute.value = to
  }
  return { latestRoute, setLatestRoute }
})

export default usePermissionStore
