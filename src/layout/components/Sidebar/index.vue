<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="backgroundColor"
        :text-color="textColor"
        :unique-opened="false"
        :active-text-color="activeTextColor"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :isCollapse="isCollapse"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAppStore from '@/store/module/app'
import useSettingsStore from '@/store/module/settings'
import { getCssVariableValue } from '@/utils'

const { sidebar } = useAppStore()
const route = useRoute()
const router = useRouter()
const settingsStore = useSettingsStore()

const routes = computed(() => router.options.routes)
const showLogo = computed(() => settingsStore.showLogo)
const isCollapse = computed(() => !sidebar.opened)
const backgroundColor = getCssVariableValue('$menuBg')
const textColor = getCssVariableValue('$menuText')
const activeTextColor = getCssVariableValue('$menuActiveText')

const activeMenu = computed(() => {
  const {
    meta: { activeMenu },
    path
  } = route
  return activeMenu ? activeMenu : path
})
</script>
