<template>
  <span>{{ formatDate(props.time) }}</span>
</template>
<script setup lang="ts">
import { useDate } from '@/hooks/useDate'
const { formatDate } = useDate()
interface Props {
  time: string | Date | number | null
}
const props = withDefaults(defineProps<Props>(), {
  time: new Date().getTime()
})
</script>
