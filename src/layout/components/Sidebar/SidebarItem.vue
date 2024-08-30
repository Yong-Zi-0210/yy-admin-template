<template>
  <div
    v-if="!props.item.meta?.hidden"
    :class="{
      'simple-mode': props.isCollapse
    }"
  >
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <SidebarItemLink v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <SvgIcon v-if="theOnlyOneChild.meta.svgIcon" :name="theOnlyOneChild.meta.svgIcon" />
          <component
            v-else-if="theOnlyOneChild.meta.elIcon"
            :is="theOnlyOneChild.meta.elIcon"
            class="el-icon"
          />
          <template v-if="theOnlyOneChild.meta.title" #title>
            {{ theOnlyOneChild.meta.title }}
          </template>
        </el-menu-item>
      </SidebarItemLink>
    </template>

    <el-sub-menu v-else ref="subMenuRef" :index="resolvePath(props.item.path)" teleported>
      <template #title>
        <SvgIcon v-if="props.item.meta?.svgIcon" :name="props.item.meta.svgIcon" />
        <component
          v-else-if="props.item.meta?.elIcon"
          :is="props.item.meta.elIcon"
          class="el-icon"
        />
        <span v-if="props.item.meta?.title">{{ props.item.meta.title }}</span>
      </template>
      <SidebarItem
        v-for="child in props.item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import path from 'path-browserify'
import { isExternal } from '@/utils/validate'
import { RouteRecordRaw } from 'vue-router'
import useAppStore from '@/store/module/app'

interface Props {
  item: RouteRecordRaw
  isNest?: boolean
  basePath?: string
  isCollapse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isNest: false,
  basePath: ''
})

// 设备类型
const appStore = useAppStore()
const device = computed(() => appStore.device)
const subMenuRef = ref(null)
const fixBugIniOS = () => {
  if (subMenuRef.value) {
    const handleMouseleave = ((subMenuRef.value as any).handleMouseleave(
      subMenuRef.value
    ).handleMouseleave = (e: any) => {
      if (device.value === 0) {
        return
      }
      handleMouseleave(e)
    })
  }
}

fixBugIniOS()

// 总是显示菜单
const alwaysShowRootMenu = computed(() => props.item.meta?.alwaysShow)
/** 显示的子菜单 */
const showingChildren = computed(() => {
  return props.item.children?.filter(child => !child.meta?.hidden) ?? []
})

/** 显示的子菜单数量 */
const showingChildNumber = computed(() => {
  return showingChildren.value.length
})

/** 唯一的子菜单项 */
const theOnlyOneChild = computed(() => {
  const number = showingChildNumber.value
  switch (true) {
    case number > 1:
      return null
    case number === 1:
      return showingChildren.value[0]
    default:
      return { ...props.item, path: '' }
  }
})

const resolvePath = (routePath: string) => {
  switch (true) {
    case isExternal(routePath):
      return routePath
    case isExternal(props.basePath):
      return props.basePath
    default:
      return path.resolve(props.basePath, routePath)
  }
}
</script>

<style scoped lang="scss">
.svg-icon {
  min-width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

.el-icon {
  width: 1em;
  margin-right: 16px;
  font-size: 18px;
}

.simple-mode {
  :deep(.el-sub-menu) {
    .el-sub-menu__icon-arrow {
      display: none;
    }
    span {
      visibility: hidden;
    }
  }
}
</style>
