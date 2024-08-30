<template>
  <v-chart
    :style="`width: 100%; height: ${props.height}px;`"
    class="chart"
    :option="option"
    autoresize
  />
</template>
<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide, watch } from 'vue'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  GridComponent,
  ToolboxComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

interface Props {
  data: any
  type?: string
  width?: string | number
  height?: string | number
}
const props = withDefaults(defineProps<Props>(), {
  width: 300,
  height: 400
})
provide(THEME_KEY, 'dark')
const option = ref({})

// 监听数据变化
watch(
  () => props.data,
  () => {
    setOption()
  },
  { deep: true }
)

// 初始化option
const setOption = () => {
  option.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    // toolbox: {
    //   feature: {
    //     dataView: { show: true, readOnly: false },
    //     magicType: { show: true, type: ["line", "bar"] },
    //     restore: { show: true },
    //     saveAsImage: { show: true },
    //   },
    // },
    legend: {
      data: props.data.legend
    },
    xAxis: [
      {
        type: 'category',
        data: props.data.xAxis,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 300,
        interval: 50,
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        min: 0,
        max: 300,
        interval: 50,
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name: '沟通',
        type: 'line',
        tooltip: {
          valueFormatter: function (value: number) {
            return value
          }
        },
        data: props.data.communicates
      },
      {
        name: '二手车',
        type: 'bar',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value: number) {
            return value
          }
        },
        data: props.data.usedCars
      }
    ]
  }
}
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
}
</style>
