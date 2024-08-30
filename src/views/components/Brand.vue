<!-- 二手车品牌 -->
<template>
  <el-select v-model="props.brandId" filterable @change="change" class="select">
    <el-option-group
      v-for="(group, groupIndex) in brandOptions"
      :key="groupIndex"
      :label="group.label"
    >
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-option-group>
  </el-select>
</template>
<script setup lang="ts">
import { brands } from '@/api/usedCar'

interface Brand {
  label?: string
  options?: any[]
}

interface CarBrandsByLetter {
  [key: string]: any
}

const brandOptions = ref<Brand[]>([])
const brandList = ref<CarBrandsByLetter[]>([])
const props = defineProps(['brandId', 'brand'])
const emit = defineEmits(['update:brandId', 'update:brand'])

// 请求品牌列表数据
const getBrands = async () => {
  const res = await brands({
    firstLetter: ''
  })
  const { carBrandsByLetter } = res.body
  for (const key in carBrandsByLetter) {
    carBrandsByLetter[key].map((item: any) => {
      item.label = item.name
      item.value = item.id
      return item
    })
  }
  brandOptions.value = setGroup(carBrandsByLetter)
  brandList.value = setList(carBrandsByLetter)
}
getBrands()

// 设置品牌分组
const setGroup = (carBrandsByLetter: CarBrandsByLetter) => {
  const group = []
  for (const key in carBrandsByLetter) {
    group.push({ label: key, options: carBrandsByLetter[key] })
  }
  return group
}

const setList = (carBrandsByLetter: CarBrandsByLetter) => {
  const list: CarBrandsByLetter[] = []
  for (const key in carBrandsByLetter) {
    carBrandsByLetter[key].map((item: CarBrandsByLetter) => {
      list.push(item)
    })
  }
  return list
}

const change = (value: string | number) => {
  brandList.value.forEach((item: CarBrandsByLetter) => {
    if (item.id === value) {
      emit('update:brandId', value)
      emit('update:brand', item.name)
    }
  })
}
</script>
<style lang="scss" scoped>
.select {
  width: 100%;
}
</style>
