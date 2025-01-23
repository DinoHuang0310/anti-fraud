<template>
  <div class="relative">
    <div class="swiper" ref="swiperRef">
      <ul class="swiper-wrapper">
        <li
          class="swiper-slide"
          v-for="list in sliderData"
          :key="list.index"
        >
          <h4 v-if="list.title" class="lg:text-lg text-center">{{ list.title }}</h4>
          <p v-if="list.subtitle" class="text-sm text-center opacity-70">({{ list.subtitle }})</p>
          <EChart
            class="mt-6"
            :chartOption="list.options"
            :style="setChartHeight(list.options)"
          />
        </li>
      </ul>
    </div>

    <!-- prev next -->
    <div
      v-if="!isMobile"
      class="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full"
      ref="prevRef"
    />
    <div
      v-if="!isMobile"
      class="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-full"
      ref="nextRef"
    />

    <!-- pagination -->
    <div class="h-8 mt-2 sm:mt-6">
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
  if (groupLength > 1) {
    return {
      'height': `${chartData.yAxis.data.length * 100}px`
    }
  } else if (type === 'bar') {
    const { length } = chartData.yAxis.data;
    return {
      'height': `${length * 65}px`
    }
  } else {
    return {
      'max-height': '400px',
      'aspect-ratio': '3 / 2',
      'margin-left': 'auto',
      'margin-right': 'auto',
    }
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
.swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
  position: relative;
  bottom: 0;
}
.swiper-button-next, .swiper-rtl .swiper-button-prev {
  right: 0;
}
.swiper-button-prev, .swiper-rtl .swiper-button-next {
  left: 0;
}
</style>