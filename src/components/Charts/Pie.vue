<template>
  <v-chart
    :style="`width: ${props.width}px; height: ${props.height}px;`"
    class="chart"
    :option="option"
    autoresize
  />
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide, watch } from 'vue'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

interface Props {
  data: any
  width?: string | number
  height?: string | number
}
const props = withDefaults(defineProps<Props>(), {
  width: 300,
  height: 230
})
// 主题
provide(THEME_KEY, 'dark')
const name = ref([])
watch(
  () => props.data,
  () => {
    const data = props.data
    name.value = data.map((item: any) => item.name)
    setOption()
  }
)
const option = ref({})
const setOption = () => {
  option.value = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      left: 'right',
      data: name.value
    },
    series: [
      {
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}
</script>

<style scoped>
.chart {
  border-radius: 3px;
  overflow: hidden;
}
</style>
