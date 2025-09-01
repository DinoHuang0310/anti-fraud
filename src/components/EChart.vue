<template>
  <div class="relative overflow-hidden">
    <VChart
      class="absolute w-full h-full top-0 left-0"
      :option="chartSetter"
      autoresize
    />
    <slot />
  </div>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart, LineChart } from "echarts/charts";
// import "echarts";
import {
  TitleComponent,
  TooltipComponent,
  // ToolboxComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart from "vue-echarts";

import { computed } from "vue";
import useClientSize from '../composables/useClientSize'
const { isMobile } = useClientSize();

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,

  TitleComponent,
  TooltipComponent,
  // ToolboxComponent,
  LegendComponent,
  GridComponent,
]);

const props = defineProps({
  chartOption: {
    type: Object,
  }
})

const chartSetter = computed(() => {
  if (!props.chartOption?.series?.length) return props.chartOption
  
  const isBarChart = props.chartOption.series[0].type === 'bar' && props.chartOption.series.length === 1;
  
  if (isBarChart) {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        confine: true,
        formatter: (par) => {
          const { name, value, color } = par[0];
          return `<p class="text-sm tracking-normal break-all whitespace-pre-wrap mb-2">${name.replace(/\n/g, '')}</p><strong class="text-base" style="color: ${color}">${value}%</strong>`
        }
      },
      grid: { left: (isMobile.value ? 100 : 150), top: 0, right: 0, bottom: 0 },
      xAxis: {type: 'value'},
      ...props.chartOption
    }
  } else if (props.chartOption.series[0].type === 'pie') {
    return {
      tooltip: {
        trigger: 'item',
        formatter: (par) => {
          const { name, value } = par.data
          const title = `<div class="text-sm tracking-normal break-all whitespace-pre-wrap mb-1">${name.replace(/\n/g, '')}</div>`
          return `${title}<strong class="text-base" style="color: ${par.color}">${value}%</strong>`
        }
      },
      ...props.chartOption
    }
  }
  return props.chartOption
})

</script>
