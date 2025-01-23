<template>
  <div class="relative bg-gray-100">
    <header class="sticky flex justify-between items-center w-full top-0 px-4 py-2 bg-white border-b z-50">
      <a class="block w-16 xl:w-20" href="https://www.businesstoday.com.tw/" target="blank">
        <img src="./assets/images/businesstoday.svg" alt="businesstoday">
      </a>
      <BtNavbar :navList="menu" :closeByBackdrop="true" :collapse="true" />
    </header>

    <main class="min-h-[100vh]" :style="{'background-image': `url(${imgUrl})`}">
      <div
        class="pb-[110%] sm:pb-[40%] 2xl:pb-[35%] bg-cover bg-center shadow-inner"
        :style="{'background-image': `url(${setBanner})`}"
      />
      <RouterView />
    </main>

    <Organizer v-if="info && info.organizer" :organizer="info.organizer" />

    <BtFooter :copyright="info ? info.copyright : null" :showFloat="true" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import useClientSize from './composables/useClientSize';
import useInfoData from './composables/useInfoData';
import useClientConfig from './composables/useClientConfig';

import BtNavbar from './components/BtNavbar/Nav.vue';
import Organizer from './components/Organizer.vue';
import BtFooter from './components/BtFooter.vue';

const { isMobile } = useClientSize(640)
const { isDev } = useClientConfig()
const imgUrl = new URL('./assets/images/background.png', import.meta.url)

const setBanner = computed(() => {
  const image = `/images/banner${isMobile.value ? '_m' : ''}.jpg`
  return `${isDev ? '' : '.'}${image}`
})

const { info, getInfo, menu } = useInfoData();

getInfo();
</script>