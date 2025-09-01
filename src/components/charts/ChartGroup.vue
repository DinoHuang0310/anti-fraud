<template>
  <div class="relative">
    <div class="swiper" ref="swiperRef">
      <ul class="swiper-wrapper">
        <li
          class="swiper-slide"
          v-for="list in sliderData"
          :key="list.index"
        >
          <div class="mx-auto lg:max-w-[85%]">
            <h4 v-if="list.title" class="lg:text-lg text-primary text-center font-bold leading-5 lg:leading-6" v-html="list.title" />
            <p v-if="list.subtitle" class="text-sm text-center opacity-70" v-html="list.subtitle" />
          </div>
          <EChart
            class="mt-6"
            :chartOption="list.options"
            :style="setChartHeight(list.options)"
          >
            <template v-if="list.showSlot">
              <slot />
            </template>
          </EChart>
          <div
            v-if="list.after"
            class="text-xs sm:text-sm text-center mx-auto lg:max-w-[85%] opacity-70"
            v-html="list.after"
          />
        </li>
      </ul>
    </div>

    <!-- prev next -->
    <div
      v-if="!isMobile"
      class="swiper-button-prev absolute top-1/2 -translate-y-1/2 -translate-x-full"
      ref="prevRef"
    />
    <div
      v-if="!isMobile"
      class="swiper-button-next absolute top-1/2 -translate-y-1/2 translate-x-full"
      ref="nextRef"
    />

    <!-- pagination -->
    <div v-if="sliderData.length > 1" class="h-8 mt-2 sm:mt-6">
      <div class="swiper-pagination" ref="paginationRef" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick, computed } from 'vue';
import useClientSize from '../../composables/useClientSize'
const { isMobile } = useClientSize();

import EChart from '../EChart.vue';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.min.css';

let swiper = null;
const swiperRef = ref(null);
const paginationRef = ref(null);
const nextRef = ref(null);
const prevRef = ref(null);

const props = defineProps({
  sliderData: {
    type: Array,
    default: [],
  },
})

// watch(props.sliderData, () => {
//   nextTick(() => swiper.update());
// })

onMounted(() => {
  // initialize swiper
  swiper = new Swiper(swiperRef.value, {
    autoHeight: true,
    pagination: {
      el: paginationRef.value,
      clickable: true
    },
    navigation: {
      nextEl: nextRef.value,
      prevEl: prevRef.value,
    },
  });
})

onUnmounted(() => {
  swiper.destroy();
})

const setChartHeight = (chartData) => {
  const groupLength = chartData.series.length;
  const { type } = chartData.series[0]
  if (groupLength > 1 && type === 'bar') {
    const hasLegend = Boolean(chartData.legend)
    const hasBreakLine = chartData.yAxis.data.some(i => i.includes('\n'))
    const singleItemHeight = () => isMobile.value && hasBreakLine ? 95 : 90;
    return {
      'height': `${chartData.yAxis.data.length * singleItemHeight() + (hasLegend ? chartData.grid.top : 0)}px`
    }
  } else if (type === 'bar') {
    const { length } = chartData.yAxis.data;
    return {
      'height': `${length * 65}px`
    }
  } else {
    return {
      'max-height': groupLength > 1 ? (isMobile.value ? undefined : '400px') : '400px',
      'aspect-ratio': groupLength > 1 ? (isMobile.value ? '1 / 2' : '7 / 4') : (isMobile.value ? '1 / 1' : '3 / 2'),
      'margin-left': 'auto',
      'margin-right': 'auto',
    };
  }
}
</script>

<style>
/* swiper reset css */
.swiper-button-next, .swiper-button-prev {
  color: var(--color-primary);
}
.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  border-radius: 6px;
}
.swiper-pagination-bullet-active {
  background-color: var(--color-primary);
}
.swiper-horizontal>.swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  position: relative;
  bottom: 0;
}
.swiper-button-next, .swiper-rtl .swiper-button-prev {
  right: -0.4rem;
}
.swiper-button-prev, .swiper-rtl .swiper-button-next {
  left: -0.4rem;
}
</style>