<template>
  <div>
    <div v-if="showDashboard" id="dashboard" class="container w-11/12 max-w-[1024px] pt-px">
      <div class="my-20 -mt-14 sm:mb-20">
        <div class="relative sm:flex pt-6 sm:pt-0 text-center bg-white rounded-lg sm:rounded-2xl shadow-xl">
          <div class="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap tracking-wide 
            border px-3 py-1 shadow rounded-b-lg bg-black/70 text-white text-sm sm:text-base">
            {{ dataDate }}
          </div>
          <div class="sm:w-1/2 py-4 sm:my-16 sm:py-0 border-b sm:border-r sm:border-b-0">
            <strong
              class="block text-4xl min-h-[2.25rem] lg:text-6xl sm:min-h-[3rem] text-primary 
                mb-2 lg:mb-4 whitespace-nowrap tracking-normal"
              v-html="formatNumberToChinese(cases)"
            />
            <span class="block text-sm sm:text-base">詐騙案件受理數（件）</span>
          </div>
          <div class="sm:w-1/2 py-4 sm:my-16 sm:py-0">
            <strong
              class="block text-4xl min-h-[2.25rem] lg:text-6xl sm:min-h-[3rem] text-primary 
                mb-2 lg:mb-4 whitespace-nowrap tracking-normal"
              v-html="formatNumberToChinese(amount)"
            />
            <span class="block text-sm sm:text-base">財產損失金額（元）</span>
          </div>
          <a
            class="absolute px-3 pt-1 pb-1.5 bottom-0 left-1/2 -translate-x-1/2 translate-y-full 
            text-white text-xs sm:text-sm bg-primary rounded-b-lg whitespace-nowrap @media-hover:hover:opacity-80"
            href="https://165dashboard.tw/"
            target="_blank"
          >詳細165打詐儀錶板</a>
        </div>
      </div>
    </div>

    <div id="about" class="pt-px">
      <h1 class="text-2xl lg:text-3xl xl:text-4xl sm:text-center mb-6 mt-12 sm:my-16 xl:leading-snug mx-auto w-11/12 max-w-screen-lg min-h-[1.375em]">
        2025 防詐新戰略
      </h1>

      <div class="container pb-20">
        <Introduction>
          <p>科技詐騙猖獗！台灣每月財損高達120億，誰來守護你的安全？</p>
          <p>刑事局統計顯示，台灣每月因詐騙損失驚人 120億新台幣！從假投資到假購物，犯罪集團手法層出不窮，科技更助長了詐騙的進化，讓人防不勝防。</p>
          <p>身為台灣指標性的財經媒體，今周刊責無旁貸，攜手政府、企業及全民，揭露詐騙真相、提升防詐意識，共築防詐盾牆，守護社會財產安全！</p>
        </Introduction>

        <ContentWrapper id="media" style="background: none; width: 100%;">
          <Title>防詐影片</Title>
          <BtYouTubePlayer class="rounded sm:rounded-xl overflow-hidden" videoId="GtvD1ljhU5g" />
        </ContentWrapper>
      </div>
    </div>

    <div v-if="info.slider && info.slider.content.length" class="bg-white">
      <div id="slider" class="container w-11/12 sm:w-full py-20">
        <Title>{{ info.slider.title }}</Title>
        <BtSlider
          :sliderData="info.slider.content"
          :showNavigation="false"
          showPagination
          theme="outside-title"
        />
      </div>
    </div>

    <article class="container py-20">
      <ContentWrapper id="antiFraud" class="my-8">
        <Title>防詐大調查</Title>
        <div class="space-y-4 font-normal">
          <p class="my-8 lg:my-12">《今周刊》與第三方調查機構「山水民意研究股份有限公司」合作，針對民眾分為三大主題進行調查，包含「遇到／遭到詐騙經驗」、「政府打詐滿意度評分」 、「對於防詐的精進作為」三部份，了解民眾現今遭遇到的詐騙情況與防詐政策的了解，尋求反詐具體可行路徑及方法。</p>
          
          <h3 class="text-lg sm:text-xl text-primary font-bold">投資詐騙橫跨全世代長者逾七成經「電話」接觸</h3>
          <ChartType1 />
        </div>

        <div class="py-4 mt-8 text-center">
          <RouterLink
            class="inline-block border border-primary text-primary text-lg px-4 py-2 rounded-md
            @media-hover:hover:bg-primary @media-hover:hover:text-white"
            to="/charts"
          >查看完整調查</RouterLink>
        </div>
      </ContentWrapper>
    </article>

    <div v-if="info.news &&  info.news.content.length" id="card" class="container w-11/12 sm:w-full py-20">
      <Title>{{ info.news.title }}</Title>
      <BtSlider
        :sliderData="info.news.content"
        :showNavigation="false"
        showPagination
        theme="outside-title"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import moment from "moment";

import useInfoData from '../composables/useInfoData';
import useClientConfig from '../composables/useClientConfig';
import api from '../services/api';

import BtNavbar from '../components/BtNavbar/Nav.vue';
import Title from '../components/Title.vue';
import Introduction from '../components/Introduction.vue';
import ChartType1 from '../components/charts/ChartType1.vue';

import ContentWrapper from '../components/ContentWrapper.vue';
import BtYouTubePlayer from '../components/BtYouTubePlayer/Player.vue'
import BtSlider from '../components/BtSlider.vue';
import BtFooter from '../components/BtFooter.vue';

const { isDev } = useClientConfig()
const { info, menu } = useInfoData();

const formatNumberToChinese = (number) => {
  if (number < 1000000) return number.toLocaleString();
  const billion = Math.floor(number / 100000000);
  const million = (number % 100000000) / 10000;
  const formattedMillion = million.toLocaleString('zh-Hans', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return billion > 0 ?
    `${billion}<span class="text-lg">億</span> ${formattedMillion}<span class="text-lg">萬</span>` :
    `${formattedMillion}<span class="text-lg">萬</span>`
}

const cases = ref(0);
const amount = ref(0);
const dataDate = ref('');
const showDashboard = ref(true)

const getDashboard = () => {
  const week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  const target = `https://events-oauth${isDev ? '-hardy' : ''}.businesstoday.com.tw/api/Dashboard165/get/`
  
  const removeMenuBtn = () => {
    menu.value = menu.value.filter(item => item.url !== '#dashboard')
  }
  api.get(target).then((res) => {
    try {
      const { TotalCases, TotalLosses, Date } = res
      cases.value = TotalCases;
      amount.value = TotalLosses * 10000;
      const date = moment(Date, 'YYYY-MM-DD').add(1, 'days')
      dataDate.value = `${date.format('YYYY-MM-DD')} ${week[date.isoWeekday() - 1]}`
    } catch (error) {
      console.error(error)
      showDashboard.value = false;
      removeMenuBtn()
    }
  }).catch((error) => {
    console.error(error)
    showDashboard.value = false;
    removeMenuBtn()
  })
}

getDashboard()

</script>