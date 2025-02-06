<template>
  <div class="space-y-4">
    <p>從接觸詐騙訊息的管道來看，整體而言，手機來電占逾三成，社群媒體和手機簡訊則分別占超過二三％，均高於通訊軟體所占的十五％。</p>
    <p>進一步與年齡交叉分析，則呈現顯著的世代差異。三十九歲以下受試者，有約六成是透過社群媒體和通訊軟體接觸疑似詐騙訊息；逾六十歲以上長者，接觸管道則較為單純，逾七成是透過手機來電或家用電話兩種途徑，凸顯未來如何強化來電辨識機制，是高齡詐騙的防範重點。</p>
    <br>
    <ChartGroup :sliderData="chartData" />
  </div>
</template>

<script setup>
import ChartGroup from './ChartGroup.vue';

import useClientSize from '../../composables/useClientSize'
const { isMobile } = useClientSize();

const chartData = [
  {
    title: '過去一年中，您曾在哪些管道接觸到疑似詐騙訊息？',
    subtitle: '(複選)',
    after: '<p class="mt-4">※經交叉分析，18∼39歲民眾，透過社群媒體和通訊軟體接觸詐騙訊息比率超過5成；60歲以上民眾逾7成是經由「電話」接觸。</p>',
    options: {
      "yAxis": {
        "type": "category",
        "inverse": true,
        "axisLabel": {"fontFamily": "Noto Sans TC"},
        "data": [
          "手機來電",
          "社群媒體\n(如Facebook、\nInstagram、X、\nThreads等)",
          "手機簡訊",
          "家用電話",
          "通訊軟體(如Line、\nFacebook messenger\n、WeChat等)",
          "其他(網頁廣告、\n線上購物平台、\n面對面等...)",
          "沒有詐騙訊息"
        ]
      },
      "series": [{
        "data": [{ value: 31.9, itemStyle: {color: '#fc8452'} }, 23.5, 23, 17.7, 15, 9.9, 24.8],
        "type": "bar",
        "label": {"show": true, "formatter": "{c}%"}
      }]
    }
  },
  {
    title: '過去一年中，您大約多久接觸到一次意圖詐騙訊息？',
    subtitle: '(包含疑似詐騙電話、訊息、廣告、真人對談等)',
    after: '<p class="mt-4">※近3成民眾每月至少接收一次意圖詐騙訊息，接收頻率隨年齡增長而遞減。</p>',
    options: {
      "yAxis": {
        "type": "category",
        "inverse": true,
        "axisLabel": {"fontFamily": "Noto Sans TC"},
        "data": [
          "每周至少一次",
          "約每月一次",
          "幾個月一次",
          "一年一次",
          "不知道／拒答",
          "沒有詐騙訊息"
        ]
      },
      "series": [{
        "data": [{ value: 13.4, itemStyle: {color: '#fc8452'} }, { value: 17.5, itemStyle: {color: '#fc8452'} }, 29.3, 7.4, 7.6, 24.8],
        "type": "bar",
        "label": {"show": true, "formatter": "{c}%"}
      }]
    }
  },
  {
    title: '過去一年中，您曾接觸過那些詐騙訊息類型？',
    subtitle: '(複選)',
    options: {
      "yAxis": {
        "type": "category",
        "inverse": true,
        "axisLabel": {"fontFamily": "Noto Sans TC"},
        "data": [
          "投資詐騙",
          "購物詐騙",
          "假冒公務機關詐騙\n(含檢察官、警察等)",
          "假冒親友詐騙",
          "假帳單詐騙",
          "中獎/優惠詐騙",
          "假融資詐騙",
          "交友/愛情詐騙",
          "勒索、恐嚇詐騙(不\n雅照、親友被綁架等)",
          "其他(求職詐騙、\n名人冒名詐騙、\n房產詐騙...等)",
          "不知道/拒答"
        ]
      },
      "series": [{
        "data": [{ value: 31.3, itemStyle: {color: '#fc8452'} }, 15.4, 10.7, 9.7, 8.2, 5.1, 4.5, 3.9, 3, 5.5, 6],
        "type": "bar",
        "label": {"show": true, "formatter": "{c}%"}
      }]
    }
  },
  {
    title: '今年與去年相比，您接觸到的詐騙訊息是更多還是更少？',
    subtitle: '',
    options: {
      series: [
        {
          type: 'pie',
          radius: isMobile.value ? ['20%', '45%'] : ['35%', '60%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          },
          data: [
            { value: 31.8, name: '更多' },
            { value: 24.5, name: '一樣' },
            { value: 31.8, name: '更少' },
            { value: 11.9, name: '不知道/拒答' }
          ],
          label: {
            show: true,
            formatter: '{b}\n{c}%',
            fontWeight: '500',
            fontSize: 15,
            position: 'outside',
          },
        }
      ]
    }
  },
  {
    title: '',
    subtitle: '',
    after: '<p class="mt-4">※除了最盛行的投資詐騙，橫跨所有世代;其餘以年齡層來看，50歲以下接觸的樣態多集中在購物詐騙、假帳單詐騙；50歲以上則以假冒公務機關和假冒親友詐騙訊息最多。</p>',
    options: {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        confine: true,
        formatter: (par) => {
          return par.reduce((prev, current) => {
            if (current.data === 0) return prev;
            return `${prev}<p class="text-sm">${current.marker} <span>${current.seriesName}: ${current.value}%</span></p>`
          }, `<p class="font-bold text-base mb-1">${par[0].axisValue}</p>`)
        }
      },
      xAxis: { type: 'value', },
      yAxis: {
        type: 'category',
        inverse: true,
        axisLabel: {"fontFamily": "Noto Sans TC"},
        data: ['18~29歲', '30~39歲', '40~49歲', '50~59歲', '60~69歲', '70歲以上'],
        axisLabel: { show: false },
      },
      grid: { left: 0, top: (isMobile.value ? 130 : 70), right: 0, bottom: 0 },
      legend: {
        show: true,
        itemGap: 15,
        data: ['投資詐騙', '購物詐騙', '假帳單詐騙', '中獎/優惠詐騙', '假冒親友詐騙', '假冒公務機關', '勒索恐嚇詐騙', '假融資詐騙', '交友/愛情詐騙'],
      },
      series: [
        {
          name: 'labelName', // 偽yAxis label
          type: 'bar',
          data: [0, 0, 0, 0, 0, 0],
          barWidth: 0,
          label: {
            show: true,
            position: [10, -20],
            formatter: (params) => params.name,
            color: '#7f7f7f',
            fontWeight: 'bold',
            fontSize: 16,
          },
          itemStyle: { color: 'transparent' },
          emphasis: { disabled: true },
          legendHoverLink: false,
        },
        {
          name: '投資詐騙', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 10 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [39.4, 36.4, 37.9, 33, 27, 11.9]
        },
        {
          name: '購物詐騙', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 10 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [18.5, 29.8, 22.6, 8.3, 5.9, 0]
        },
        {
          name: '假帳單詐騙', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 10 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [0, 10.1, 7.6, 7.2, 12.8, 7.6]
        },
        {
          name: '中獎/優惠詐騙', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 10 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [8.4, 10.1, 5.5, 0, 0, 0]
        },
        {
          name: '假冒親友詐騙', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 10 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [0, 9.2, 0, 10.7, 14.7, 16.3]
        },
        {
          name: '假冒公務機關', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 10 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [0, 0, 6.5, 15.1, 14.8, 21.5]
        },
        {
          name: '勒索恐嚇詐騙', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 10 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [0, 0, 0, 0, 0, 10.8]
        },
        {
          name: '假融資詐騙', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 10 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [6.3, 0, 0, 0, 0, 0]
        },
        {
          name: '交友/愛情詐騙', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 10 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [5.9, 0, 0, 0, 0, 0]
        },
      ]
    }
  },
  {
    title: '您接觸到疑似詐騙訊息時<br>有沒有曾經向警方報案，或使用政府任一檢舉管道？',
    subtitle: '',
    options: {
      series: [
        {
          type: 'pie',
          radius: isMobile.value ? ['20%', '45%'] : ['35%', '60%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          },
          data: [
            { value: 14.6, name: '有' },
            { value: 85.4, name: '沒有' },
          ],
          label: {
            show: true,
            formatter: '{b}\n{c}%',
            fontWeight: '500',
            fontSize: 15,
            position: 'outside',
          },
        }
      ]
    }
  },
]
</script>