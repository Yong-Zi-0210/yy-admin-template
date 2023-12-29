<template>
  <ul class="list">
    <li class="list-item" v-for="(item, index) in props.list" :key="index">
      <img :src="item" />
    </li>
  </ul>
</template>
<script setup lang="ts">
interface Props {
  list: any;
}

const props = withDefaults(defineProps<Props>(), {
  list: [],
});
</script>
<style scoped lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  padding: 8px 0 0 8px;
  max-height: 300px;
  overflow-y: auto;
  .list-item {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0 8px 8px 0;
    border-radius: 5px;
    overflow: hidden;
    img {
      height: 100%;
    }
  }
}
</style>
