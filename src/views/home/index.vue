<template>
  <div class="app-container">
    <div class="total-data">
      <div class="left">
        <el-card class="card-item">
          <template #header>二手车总数</template>
          <span>{{ totalUsedCars }}</span>
        </el-card>
        <el-card class="card-item">
          <template #header>二手车沟通总数</template>
          <span>{{ totalCommunicates }}</span>
        </el-card>
        <el-card class="card-item">
          <div class="sub-item">
            <span class="title">今日新增二手车数：</span>
            <span class="number" :title="usedCarsIncrementToday">{{ usedCarsIncrementToday }}</span>
          </div>
          <div class="sub-item">
            <span class="title">昨日新增二手车数：</span>
            <span class="number" :title="usedCarsIncrementYesterday">{{
              usedCarsIncrementYesterday
            }}</span>
          </div>
        </el-card>
        <el-card class="card-item">
          <div class="sub-item">
            <span class="title">今日二手车沟通数：</span>
            <span class="number" :title="communicateToday">{{ communicateToday }}</span>
          </div>
          <div class="sub-item">
            <span class="title">昨日二手车沟通数：</span>
            <span class="number" :title="communicateYesterday">{{ communicateYesterday }}</span>
          </div>
        </el-card>
      </div>
      <div class="right">
        <Pie :data="pieData" />
      </div>
    </div>
    <div class="line-bar">
      <div class="charts">
        <LineandBar :data="seriesData" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { statistics } from '@/api/home'
interface PieItem {
  name: string
  value: string | number
}

const loading = ref(false)
const totalUsedCars = ref('0') // 二手车总数
const totalCommunicates = ref('0') // 沟通总数
const usedCarsIncrementToday = ref('0') // 今日二手车新增数
const usedCarsIncrementYesterday = ref('0') // 昨日二手车新增数
const communicateYesterday = ref('0') // 昨日沟通新增数
const communicateToday = ref('0') // 今日沟通新增数
const pieData = ref<PieItem[]>([])
const seriesData = reactive<any>({
  communicates: [],
  usedCars: [],
  legend: ['沟通', '二手车'],
  xAxis: []
})
const getData = async () => {
  loading.value = true
  try {
    const res = await statistics()
    const {
      totalUsedCar,
      totalCommunicate,
      usedCarIncrementToday,
      usedCarIncrementYesterday,
      communicateIncrementToday,
      communicateIncrementYesterday,
      communicates,
      usedCars
    } = res.body
    totalUsedCars.value = totalUsedCar
    totalCommunicates.value = totalCommunicate
    usedCarsIncrementToday.value = usedCarIncrementToday
    usedCarsIncrementYesterday.value = usedCarIncrementYesterday
    communicateToday.value = communicateIncrementToday
    communicateYesterday.value = communicateIncrementYesterday
    setPie()
    setSeriesData(communicates, usedCars)
  } catch (error) {}
}

// 请求数据
getData()

// 设置饼图数据
const setPie = () => {
  pieData.value = [
    { value: totalCommunicates.value, name: '沟通' },
    { value: totalUsedCars.value, name: '二手车' }
  ]
}

// 设置二手车数据
const setSeriesData = (communicates: any, usedCars: any) => {
  const newCommunicates = []
  const newUsedCars = []
  const newXAxis = []
  for (const key in communicates) {
    newCommunicates.push(Number(communicates[key]))
    newXAxis.push(`${key}月`)
  }

  for (const key in usedCars) {
    newUsedCars.push(Number(usedCars[key]))
  }
  seriesData.communicates = newCommunicates
  seriesData.usedCars = newUsedCars
  seriesData.xAxis = newXAxis
}
</script>
<style lang="scss" scoped>
.total-data {
  display: flex;
  justify-content: center;
  .left {
    display: flex;
    flex-wrap: wrap;
    width: 450px;
    .card-item {
      width: 205px;
      margin: 0 20px 20px 0;
      .sub-item {
        display: flex;
        margin-bottom: 5px;
        align-items: center;
        font-size: 13px;
      }
    }
    .title {
      display: flex;
    }
    .number {
      max-width: 45px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.line-bar {
  display: flex;
  justify-content: center;
  .charts {
    width: 750px;
    border-radius: 3px;
    overflow: hidden;
  }
}
</style>
