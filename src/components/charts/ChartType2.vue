<template>
  <div class="space-y-4">
    <p>進一步拆解各職業別的回覆，會發現「專業、科學和技術服務業」人士，以及普遍對詐騙手法較熟悉的「金融保險業」、「公務員與軍警人員」，信心指數特別高，自認能識別詐騙比率均超過九三％，高於整體答覆十個百分點；反觀「不動產業」、「運輸倉儲業」和「醫療及社會工作者」態度較為保守，有信心識詐者均不到七成。</p>
    <p>不只職業有別，民眾的信心指數，也與學歷和個人年收入高度相關。</p>
    <br>
    <ChartGroup :sliderData="chartData" />
    <br>
    <h3 class="text-lg sm:text-xl text-primary font-bold">高知識分子易輕忽風險 礙於社會觀感 遭詐騙也不敢求助</h3>
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
    title: '您有沒有信心能識別詐騙？',
    subtitle: '',
    options: {
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
        data: ['專業、科學及技術服務業', '金融保險業', '公務員與軍警人員', '整體受試者', '不動產業', '運輸倉儲業'],
        axisLabel: { show: false },
      },
      grid: { left: 0, top: (isMobile.value ? 130 : 70), right: 0, bottom: 0 },
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
            formatter: params => (params.value !== 0 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [95.7, 93.9, 93.7, 83.1, 69.6, 69.4]
        },
        {
          name: '沒信心', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value !== 0 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [0, 6.1, 3, 10.1, 25, 27.9]
        },
        {
          name: '無明確意見', type: 'bar', stack: 'total',
          label: {
            show: true,
            formatter: params => (params.value !== 0 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [4.3, 0, 3.3, 6.8, 5.4, 2.7]
        },
      ]
    }
  },
  {
    title: '您接觸到疑似詐騙訊息時，有沒有曾經向警方報案，或使用政府任一檢舉管道？',
    subtitle: '',
    options: {
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
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
        }
      ]
    }
  },
]
</script>