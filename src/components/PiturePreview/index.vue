<template>
  <el-image :src="props.src" style="height: 100%" lazy fit="cover"></el-image>
</template>
<script setup lang="ts">
const props = defineProps(['src'])
</script>
