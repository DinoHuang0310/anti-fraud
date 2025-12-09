<template>
  <div>
    <div v-if="showDashboard" id="dashboard" class="container w-11/12 max-w-[1024px] pt-px">
      <div class="-mt-14">
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

    <div v-if="!monthListError" class="container pt-20 w-11/12 max-w-[1024px]">
      <div ref="infoChart" class="pt-6 bg-white rounded-lg sm:rounded-2xl">
        <EChart class="aspect-[5/4] sm:aspect-video" :chartOption="chartData" />
      </div>
    </div>

    <div id="about" class="pt-20">
      <h1 class="text-2xl lg:text-3xl xl:text-4xl sm:text-center mb-6 sm:my-8 xl:leading-snug mx-auto w-11/12 max-w-screen-lg min-h-[1.375em]">
        2025 防詐新戰略
      </h1>

      <div class="container pb-20">
        <Introduction>
          <p>科技詐騙猖獗！台灣每月財損高達120億，誰來守護你的安全？</p>
          <p>刑事局統計顯示，台灣每月因詐騙損失驚人 120億新台幣！從假投資到假購物，犯罪集團手法層出不窮，科技更助長了詐騙的進化，讓人防不勝防。</p>
          <p>身為台灣指標性的財經媒體，今周刊責無旁貸，攜手政府、企業及全民，揭露詐騙真相、提升防詐意識，共築防詐盾牆，守護社會財產安全！</p>
        </Introduction>

        <div id="media" class="content-wrapper" style="background: none; width: 100%;">
          <Title>防詐影片</Title>
          <BtYouTubePlayer class="rounded sm:rounded-xl overflow-hidden" videoId="GtvD1ljhU5g" />
        </div>
      </div>
    </div>

    <div v-if="info.slider?.content?.length" class="bg-white">
      <div id="slider" class="container w-11/12 sm:w-full py-20">
        <Title>{{ info.slider.title }}</Title>
        <InfinityArticle />
      </div>
    </div>

    <article class="container py-20">
      <div id="antiFraud" class="content-wrapper my-8">
        <Title>防詐大調查</Title>
        <div class="space-y-4 font-normal">
          <p class="my-8 lg:my-12">《今周刊》與第三方調查機構「山水民意研究股份有限公司」合作，針對民眾分為三大主題進行調查，包含「遇到／遭到詐騙經驗」、「政府打詐滿意度評分」 、「對於防詐的精進作為」三部份，了解民眾現今遭遇到的詐騙情況與防詐政策的了解，尋求反詐具體可行路徑及方法。</p>
          
          <h3 class="text-xl sm:text-2xl text-primary font-medium">投資詐騙橫跨全世代長者逾七成經「電話」接觸</h3>
          <ChartType1 />
        </div>

        <div class="py-4 mt-8 text-center">
          <RouterLink
            class="inline-block relative border border-primary text-primary text-lg px-4 py-2 rounded-md
            @media-hover:hover:bg-primary @media-hover:hover:text-white"
            to="/report"
            target="_blank"
          >查看完整調查</RouterLink>
        </div>
      </div>
    </article>

    <div v-if="info.news?.content?.length" id="card" class="container w-11/12 sm:w-full py-20">
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
import { ref, computed, onMounted, watch } from 'vue';
import moment from "moment";

import useInfoData from '../composables/useInfoData';
import useClientConfig from '../composables/useClientConfig';
import api from '../services/api';

import BtNavbar from '../components/BtNavbar/Nav.vue';
import Title from '../components/Title.vue';
import Introduction from '../components/Introduction.vue';
import EChart from '../components/EChart.vue';
import ChartType1 from '../components/charts/ChartType1.vue';

import BtYouTubePlayer from '../components/BtYouTubePlayer/Player.vue'
import BtSlider from '../components/BtSlider.vue';
import InfinityArticle from '../components/InfinityArticle.vue';
import BtFooter from '../components/BtFooter.vue';
import useWindowScroll from '../composables/useWindowScroll'
import useClientSize from '../composables/useClientSize'

const { isWebtest } = useClientConfig()
const { info, menu } = useInfoData();

const formatNumberToChinese = (number, stringOnly) => {
  if (number < 1_000_000) return number.toLocaleString();

  const billion = Math.floor(number / 100_000_000);
  const million = (number % 100_000_000) / 10_000;

  const formattedMillion = million.toLocaleString('zh-Hans', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const hasMillion = formattedMillion !== '0.0';

  // 抽出包裝函式
  const wrap = (text) => stringOnly ? text : `<span class="text-lg">${text}</span>`;

  const parts = [];

  if (billion > 0) parts.push(`${billion}${wrap('億')}`);
  if (hasMillion) parts.push(`${formattedMillion}${wrap('萬')}`);

  return parts.join(' ');
};

const cases = ref(0);
const amount = ref(0);
const dataDate = ref('');
const showDashboard = ref(true)

const domainPath = `https://events-oauth${isWebtest ? '-hardy' : ''}.businesstoday.com.tw/api/Dashboard165`;
const getDashboard = () => {
  const week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  const target = `${domainPath}/get/`
  
  const removeMenuBtn = () => {
    menu.value = menu.value.filter(item => item.url !== '#dashboard')
  }
  api.get(target).then((res) => {
    try {
      const { TotalCases, TotalLosses, Date } = res
      cases.value = TotalCases * 1;
      amount.value = TotalLosses * 10_000;
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

const infoChart = ref(null)
const monthList = ref([]);
const monthListError = ref(false)
const getMonthList = () => {
  const target = `${domainPath}/getMonthList/`
  api.get(target).then((res) => {
    if (Array.isArray(res)) {
      monthList.value = res.reverse()
    } else {
      console.error(res)
      monthListError.value = true
    }
  }).catch((error) => {
    console.error(error)
    monthListError.value = true
  })
}
getMonthList();

const { height, isMobile } = useClientSize()
const chartData = ref({});
const setChartData = () => {
  if (!monthList.value.length && !monthListError.value) {
    setTimeout(() => {
      setChartData()
    }, 1000);
    return;
  }
  chartData.value = {
    animationDuration: 2000,
    grid: isMobile.value ? { top: 50, right: 45, bottom: 35, left: 50 } : null,
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        return params.reduce((prev, current, index) => {
          const { value } = current;
          const html = `
          <div class="mb-1">
            <div class="flex items-center">
              <span class="w-2 h-2 mr-1 rounded-full" style="background: ${current.color}"></span>
              <span>${current.seriesName}:</span>
            </div>
            <div class="pl-3 font-bold">
              ${index === 0 ?
                value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 件' :
                formatNumberToChinese(value, true) + ' 元'
              }
            </div>
          </div>`
          return prev += html
        }, `<div class="mb-1">${params[0].axisValue}</div>`)
      }
    },
    legend: { data: ['詐騙案件受理數', '財產損失金額'] },
    xAxis: [{
      type: 'category',
      data: monthList.value.map(i => i.Month),
      axisPointer: { type: 'shadow' }
    }],
    yAxis: [
      {
        type: 'value',
        name: isMobile.value ? null : '詐騙案件受理數',
        splitNumber: 5,
        min: 0,
        max: 25000,
        axisLabel: {
          fontSize: isMobile.value ? 10 : 12,
          formatter: (value) => {
            if (value > 1000) {
              return `${value / 1000}千件`
            }
            return value + '件'
          }
        },
      },
      {
        type: 'value',
        name: isMobile.value ? null : '財產損失金額',
        splitNumber: 5,
        axisLabel: {
          fontSize: isMobile.value ? 10 : 12,
          formatter: (value) => `${formatNumberToChinese(value, true)}`
        }
      },
    ],
    series: [
      {
        name: '詐騙案件受理數',
        type: 'line',
        data: monthList.value.map(i => i.TotalCases),
      },
      {
        name: '財產損失金額',
        type: 'bar',
        yAxisIndex: 1,
        data: monthList.value.map((i, index) => {
          const isLast = index === monthList.value.length - 1
          const value = i.TotalLosses * 10_000
          return isLast ? {value, itemStyle: { color: '#ff994d' }} : value
        }),
      },
    ]
  }
}

onMounted(() => {
  const getOffsetTop = (elem) => {
    let offsetTop = 0;
    while (elem) {
      offsetTop += elem.offsetTop;
      elem = elem.offsetParent;
    }
    return offsetTop;
  }
  const trigger = getOffsetTop(infoChart.value)
  const delay = isMobile.value ? 100 : 200
  const { overY } = useWindowScroll(Math.max(trigger - height.value + delay, 1))

  watch(overY, (bool) => {
    if (bool) {
      setChartData()
    } else {
      chartData.value = {}
    }
  })
})
</script>