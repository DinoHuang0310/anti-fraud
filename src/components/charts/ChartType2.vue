<template>
  <div class="space-y-4">
    <h3 class="text-xl sm:text-2xl text-primary font-medium">3種職業自信爆表 學歷、收入越高 越有信心不受騙</h3>
    <p>進一步拆解各職業別的回覆，會發現「專業、科學和技術服務業」人士，以及普遍對詐騙手法較熟悉的「金融保險業」、「公務員與軍警人員」，信心指數特別高，自認能識別詐騙比率均超過九三％，高於整體答覆十個百分點；反觀「不動產業」、「運輸倉儲業」和「醫療及社會工作者」態度較為保守，有信心識詐者均不到七成。</p>
    <p>不只職業有別，民眾的信心指數，也與學歷和個人年收入高度相關。</p>
    <br>
    <ChartGroup :sliderData="chartData">
      <div
        class="absolute h-full"
        :style="{'padding-top': '60px', 'width': `${isMobile ? 60 : 80}px`}"
      >
        <div class="relative w-full h-full">
          <div
            class="absolute top-[5%] h-[90%]"
            :class="isMobile ? 'left-2 w-2' : 'left-3 w-3'"
            style="background: linear-gradient(to bottom, #5470c6, #fc8452);"
          >
            <div class="absolute text-sm -right-6 top-2 leading-[1.2]">信<br>心<br>指<br>數<br>較<br>高</div>
            <div class="absolute text-sm -right-6 bottom-2 leading-[1.2]">信<br>心<br>指<br>數<br>較<br>低</div>
            <div
              class="absolute w-0 h-0 left-1/2 top-0 -translate-x-1/2 -translate-y-full"
              :style="{
                'border-width': `28px ${isMobile ? '14px' : '16px'}`,
                'border-style': 'solid',
                'border-color': 'transparent transparent #5470c6 transparent'
              }"
            />
            <div
              class="absolute w-0 h-0 left-1/2 bottom-0 -translate-x-1/2 translate-y-full"
              :style="{
                'border-width': `28px ${isMobile ? '14px' : '16px'}`,
                'border-style': 'solid',
                'border-color': '#fc8452 transparent transparent transparent'
              }"
            />
          </div>
        </div>
      </div>
    </ChartGroup>
    <br>
    <h3 class="text-xl sm:text-2xl text-primary font-medium">高知識分子易輕忽風險 礙於社會觀感 遭詐騙也不敢求助</h3>
    <p>調查顯示，受試者學歷愈高、個人年收入愈多，識詐信心愈充足，像是擁有研究所學歷者，相對於國中學歷以下的受試者，回答有信心者多出十五個百分點；年收入逾百萬的受試者，也逾九○％有自信。</p>
    <p>不過，從心理學角度切入，太過自信，反而更容易在面臨詐騙時，陷入更大困境。</p>
    <p>臨床心理師蘇益賢分析，高知識分子的專業背景，往往讓他們自認能輕易辨別詐騙，過於相信自己的判斷。「像是金融從業人員，因為很熟悉這些交易行為，做決策時多會直接借用過去的知識，直覺性下判斷，卻也容易忽略蛛絲馬跡，逐步走入陷阱。」</p>
    <p>尤其當詐團創造高壓、充滿感性訴求的情境，如恐嚇「不這樣做會凍結你的財產」、「帳戶會被鎖起來」，緊急狀態下，大腦的慢思考會停止，由容易相信眼睛所見、容易上當的快思考當家，再怎麼聰明絕頂，都可能被說服上當。</p>
    <p>「偏偏社經地位較高的人，有很多『偶像包袱』。」蘇益賢觀察，專家、高知識分子的角色定位，讓他們遇到疑似詐騙訊息時，會因為擔心遭受質疑，不願向外求助或諮詢他人意見，反而更難從詐騙情境脫身。</p>
    <p>除了民眾要學習調整心態，政府的防詐對策，也需不斷修正進化。</p>
    <p>調查中，受試者對於政府打詐「宣導」滿意度超過五成，高於不滿意度三九．三％；但問到政府打詐的「具體成績」，滿意度卻僅剩四成，不滿意度上升到五○．八％，呈現死亡交叉。顯示多數民眾認為政府實際打詐作為，仍有精進空間。</p>
  </div>
</template>

<script setup>
import ChartGroup from './ChartGroup.vue';

import useClientSize from '../../composables/useClientSize'
const { isMobile } = useClientSize();

const chartData = [
  {
    showSlot: true,
    title: '您有沒有信心能識別詐騙？',
    subtitle: '',
    after: '<p class="mt-4">※83％受試者有信心能識別詐騙，專業科學技術業、金融業和公務員信心指數更超過9成。</p>',
    options: {
      color: ['#5470c6', '#fc8452', '#c3c3c3'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        confine: true,
        formatter: (par) => {
          return par.reduce((prev, current) => {
            if (current.seriesName === 'labelName') return prev;
            return `${prev}<p class="text-sm">${current.marker} <span>${current.seriesName}: ${current.value}%</span></p>`
          }, `<p class="font-bold text-base mb-1">${par[0].axisValue}</p>`)
        }
      },
      xAxis: { type: 'value', },
      yAxis: {
        type: 'category',
        inverse: true,
        axisLabel: {"fontFamily": "Noto Sans TC"},
        data: ['專業、科學及技術服務業', '金融保險業', '公務員與軍警人員', '整體受試者', '不動產業', '運輸倉儲業', '醫療及社會工作者'],
        axisLabel: { show: false },
      },
      grid: { left: (isMobile.value ? 60 : 80), top: 60, right: 0, bottom: 0 },
      legend: {
        show: true,
        itemGap: 15,
        data: ['有信心', '沒信心', '無明確意見'],
      },
      series: [
        {
          name: 'labelName', // 偽yAxis label
          type: 'bar',
          data: [0, 0, 0, 0, 0, 0, 0],
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
          name: '有信心', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 5 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [95.7, 93.9, 93.7, 83.1, 69.6, 69.4, 68.9]
        },
        {
          name: '沒信心', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 5 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [0, 6.1, 3, 10.1, 25, 27.9, 29]
        },
        {
          name: '無明確意見', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 5 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [4.3, 0, 3.3, 6.8, 5.4, 2.7, 2.1]
        },
      ]
    }
  },
  {
    title: '您有沒有信心能識別詐騙？',
    subtitle: '學歷交叉分析',
    after: '<p class="mt-4">※交叉分析來看，學歷愈高，愈有信心不會受騙。</p>',
    options: {
      color: ['#5470c6', '#fc8452', '#c3c3c3'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        confine: true,
        formatter: (par) => {
          return par.reduce((prev, current) => {
            if (current.seriesName === 'labelName') return prev;
            return `${prev}<p class="text-sm">${current.marker} <span>${current.seriesName}: ${current.value}%</span></p>`
          }, `<p class="font-bold text-base mb-1">${par[0].axisValue}</p>`)
        }
      },
      xAxis: { type: 'value', },
      yAxis: {
        type: 'category',
        inverse: true,
        axisLabel: {"fontFamily": "Noto Sans TC"},
        data: ['國中以下', '高中職', '專科', '大學', '研究所以上'],
        axisLabel: { show: false },
      },
      grid: { left: 0, top: 60, right: 0, bottom: 0 },
      legend: {
        show: true,
        itemGap: 15,
        data: ['有信心', '沒信心', '無明確意見'],
      },
      series: [
        {
          name: 'labelName', // 偽yAxis label
          type: 'bar',
          data: [0, 0, 0, 0, 0],
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
          name: '有信心', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 5 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [76.7, 79.4, 84.8, 88.4, 92]
        },
        {
          name: '沒信心', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 5 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [7.6, 12.7, 12.2, 9.5, 7.6]
        },
        {
          name: '無明確意見', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 5 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [15.7, 7.9, 3, 2.1, 0.4]
        },
      ]
    }
  },
  {
    title: '您有沒有信心能識別詐騙？',
    subtitle: '年收入交叉分析',
    after: '<p class="mt-4">※交叉分析來看，個人年收入愈高，愈有信心不會受騙。</p>',
    options: {
      color: ['#5470c6', '#fc8452', '#c3c3c3'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        confine: true,
        formatter: (par) => {
          return par.reduce((prev, current) => {
            if (current.seriesName === 'labelName') return prev;
            return `${prev}<p class="text-sm">${current.marker} <span>${current.seriesName}: ${current.value}%</span></p>`
          }, `<p class="font-bold text-base mb-1">${par[0].axisValue}</p>`)
        }
      },
      xAxis: { type: 'value', },
      yAxis: {
        type: 'category',
        inverse: true,
        axisLabel: {"fontFamily": "Noto Sans TC"},
        data: ['30萬元以下', '31萬～50萬元', '51萬～80萬元', '81萬～100萬元', '101萬元以上', '無固定或拒答'],
        axisLabel: { show: false },
      },
      grid: { left: 0, top: 60, right: 0, bottom: 0 },
      legend: {
        show: true,
        itemGap: 15,
        data: ['有信心', '沒信心', '無明確意見'],
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
          name: '有信心', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 5 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [79.5, 84.2, 83.2, 90.6, 91.2, 71]
        },
        {
          name: '沒信心', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 5 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [11.2, 10.3, 11, 7.4, 7.7, 11.2]
        },
        {
          name: '無明確意見', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value > 5 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [9.3, 5.5, 5.8, 2, 1.1, 17.8]
        },
      ]
    }
  },
  {
    title: '請問您對於政府過去一年打詐所做的宣導滿不滿意？',
    subtitle: '',
    after: '<p class="mt-4">※受試者對政府打詐「宣導」及「具體成績」滿意程度有別，呈現死亡交叉。</p>',
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
            { value: 10.3, name: '非常滿意' },
            { value: 42, name: '稍微滿意' },
            { value: 21.9, name: '稍微不滿意' },
            { value: 17.4, name: '非常不滿意' },
            { value: 8.4, name: '無明確意見', itemStyle: { color: '#c3c3c3' }},
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
    title: '請問您對於政府過去一年打詐的具體成績滿不滿意？',
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
            { value: 7.5, name: '非常滿意' },
            { value: 33, name: '稍微滿意' },
            { value: 25.8, name: '稍微不滿意' },
            { value: 25, name: '非常不滿意' },
            { value: 8.7, name: '無明確意見', itemStyle: { color: '#c3c3c3' }},
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