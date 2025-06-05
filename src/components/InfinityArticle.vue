<template>
  <ul class="flex flex-wrap -mx-0.5 sm:-mx-2">
    <li
      v-for="list in showList"
      :key="list.index"
      class="w-1/2 sm:w-1/3 px-1 sm:px-2 mb-4 sm:mb-6"
    >
      <a :href="list.url" target="blank" class="relative block group">
        <div class="relative aspect-[4/3]">
          <img loading="lazy" class="absolute w-full h-full object-cover" :src="list.image" :alt="list.title">
          <div class="absolute w-full h-full top-0 left-0 flex justify-center items-center 
          opacity-0 group-hover:md:opacity-100 transform duration-500 bg-black/70"
          >
            <div class="text-white text-sm border border-white px-4 py-2">了解更多</div>
          </div>
        </div>
        <p class="py-1">
          <span class="line-clamp-2 text-sm sm:text-base tracking-normal">{{ list.title }}</span>
        </p>
      </a>
    </li>
  </ul>

  <div v-if="showAddBtn" class="py-4 mt-8 text-center">
    <button
      class="inline-block relative border border-primary text-primary text-lg px-4 py-2 rounded-md
      @media-hover:hover:bg-primary @media-hover:hover:text-white"
      @click="showIndex++"
    >更多新聞</button>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import useInfoData from '../composables/useInfoData'

export default {
  setup() {
    const groupLength = 6

    const { info } = useInfoData()
    const showIndex = ref(1)

    const showAddBtn = computed(() => showIndex.value * groupLength < info.value.slider.content.length)
    const showList = computed(() => info.value.slider.content.slice(0, showIndex.value * groupLength))

    return {
      showIndex,
      showAddBtn,
      showList,
    }
  }
}
</script>
