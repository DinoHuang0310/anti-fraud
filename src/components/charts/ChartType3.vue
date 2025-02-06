<template>
  <div class="space-y-4">
    <h3 class="text-xl sm:text-2xl text-primary font-medium">近8成民意盼詐騙罰則再加重 嚴懲社群平台</h3>
    <p>社群平台已成詐騙溫床，使無數民眾受害，據數發部統計，台灣詐騙廣告逾九成來自Meta（臉書母公司）。調查中，逾七成受試者認為，政府針對未依法在二十四小時內下架詐騙廣告的業者，應提高開罰強度；同時也期待平台不只下架廣告，更應強制將涉及詐騙的帳號、社團移除。</p>
    <p>刑事局一六五反詐騙諮詢專線祕書莊明雄透露，過去執法單位向Meta通報詐騙廣告，多數未能在二十四小時內下架，二○二五年數發部因應《詐欺犯罪危害防制條例》推出的子法上路，已有法源可以開罰業者，重點在於能否落實執法。</p>
    <br>
    <ChartGroup :sliderData="chartData" />
    <br>
    <h3 class="text-xl sm:text-2xl text-primary font-medium">政府宣傳積極、成績待加強 新法上路 回應民意</h3>
    <p>他也認為，Meta、Google等平台業者，應該自主建立AI偵測機制，從源頭阻絕詐騙廣告，善盡企業社會責任，「而不是讓各國政府耗費大量資源，處理在平台受害的案件。」</p>
    <p>回頭看民眾端，個人也可以透過幾道簡單手續，為自己設下防線。</p>
    <p>目前地政事務所開放民眾辦理不動產預告登記，當未來房屋要移轉或抵押時，必須經過指定請求權人的同意才能辦理。儘管有高達八三％受試者不知道這項措施，但得知後有超過七四％願意辦理，作為防詐自保手段。</p>
    <h3 class="text-xl sm:text-2xl text-primary font-medium">預防房地產、定存遭騙轉移 多數贊成異動通知第三人</h3>
    <p>值得注意的是，現行民眾在解除定存，或一次匯出大筆款項時，並無通知第三人的機制。調查詢問，是否贊成未來開放民眾自由註記，解除定存或匯出逾一定金額款項時，須通知指定聯絡人，結果顯示，兩項措施均有近八成受試者力挺，當中更分別有逾九成願意親自辦理。</p>
    <p>交叉比對來看，會發現學歷愈高、收入愈高者，在處理個人資產時，「不贊成」須通知第三人的比率愈高。</p>
    <p>此外，目前各銀行礙於《個人資料保護法》限制，無法在民眾個人帳戶涉及詐騙或異常交易時，同步將資訊傳給其他開戶銀行，達到預警作用。但在調查中，高達八二．八％受試者，表明願意犧牲部分個資，授權銀行通知其他金融機構，不贊成者僅占十二．一％。</p>
    <p>這項調查，反映民眾接觸詐騙的現況，以及對各項防詐機制的態度，可作為政策參考依據，有賴政府拿出具體行動，持續滾動修正。</p>
  </div>
</template>

<script setup>
import ChartGroup from './ChartGroup.vue';

import useClientSize from '../../composables/useClientSize'
const { isMobile } = useClientSize();

const chartData = [
  {
    title: '請問您認為政府應該更加強哪些方面作為，才能有效防堵詐騙？',
    subtitle: '(複選)',
    options: {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        confine: true,
        formatter: (par) => {
          return par.reduce((prev, current) => {
            if (current.seriesName === 'labelName') return prev;
            return `${prev}<strong class="text-base" style="color: ${current.color}">${current.value}%</strong>`
          }, `<p class="block text-sm tracking-normal break-all whitespace-pre-wrap">${par[0].axisValue.replace('\n', '')}</p>`)
        }
      },
      xAxis: { type: 'value', },
      yAxis: {
        type: 'category',
        inverse: true,
        axisLabel: {"fontFamily": "Noto Sans TC"},
        data: [
          '提高詐騙相關刑法或行政罰鍰',
          '加快追查及攔阻金流的效率',
          '強化與金融機構合作',
          '加快調閱詐騙帳戶等資料的速度',
          '加強宣導防詐觀念',
          '強化與國際數位平台溝通合作',
          '其他(強化與電信業者合作、防止公務\n機關個資外洩...等)',
          '無明確意見',
        ],
        axisLabel: { show: false },
      },
      grid: { left: 10, top: 0, right: 10, bottom: 0 },
      series: [
        {
          name: 'labelName', // 偽yAxis label
          type: 'bar',
          data: [0, 0, 0, 0, 0, 0, 0, 0],
          barWidth: 0,
          label: {
            show: true,
            position: [10, -20],
            formatter: (params) => isMobile.value ? params.name : params.name.replace('\n', ''),
            color: '#7f7f7f',
            fontWeight: 'bold',
            fontSize: 16,
          },
          itemStyle: { color: 'transparent' },
          emphasis: { disabled: true },
          legendHoverLink: false,
        },
        {
          name: '', type: 'bar',
          label: {
            show: true,
            formatter: params => (params.value > 5 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [{ value: 79.7, itemStyle: {color: '#fc8452'} }, 62.1, 58.8, 57.8, 54.2, 52, 1.1, 2.4]
        },
      ]
    }
  },
  {
    title: '近幾年社群平台(如Facebook、Line等)詐騙廣告和訊息猖獗，<br>您認為政府單位和社群平台應該加強哪些作為？',
    subtitle: '(複選)',
    options: {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        confine: true,
        formatter: (par) => {
          return par.reduce((prev, current) => {
            if (current.seriesName === 'labelName') return prev;
            return `${prev}<strong class="text-base" style="color: ${current.color}">${current.value}%</strong>`
          }, `<p class="block text-sm tracking-normal break-all whitespace-pre-wrap">${par[0].axisValue.replace('\n', '')}</p>`)
        }
      },
      xAxis: { type: 'value', },
      yAxis: {
        type: 'category',
        inverse: true,
        axisLabel: {"fontFamily": "Noto Sans TC"},
        data: [
          '政府單位針對24小時內未下架詐騙廣告\n的業者，應更強力開罰',
          '社群網站應強制將涉及詐騙的帳號、粉\n絲專頁及社團移除',
          '社群網站應加強廣告投放實名制審核',
          '政府與社群網站建立快速溝通管道，更\n及時通報涉及詐騙訊息',
          '針對未落實規定的社群網站，政府單位\n應限制其部分業務',
          '社群網站應加強名人或企業投資廣告\n查核',
          '無明確意見',
        ],
        axisLabel: { show: false },
      },
      grid: { left: 10, top: 0, right: 10, bottom: 0 },
      series: [
        {
          name: 'labelName', // 偽yAxis label
          type: 'bar',
          data: [0, 0, 0, 0, 0, 0, 0],
          barWidth: 0,
          label: {
            show: true,
            position: [10, isMobile.value ? -25 : -20],
            formatter: (params) => isMobile.value ? params.name : params.name.replace('\n', ''),
            color: '#7f7f7f',
            fontWeight: 'bold',
            fontSize: 16,
            textBorderColor: '#ffffff',
            textBorderWidth: 2,
          },
          itemStyle: { color: 'transparent' },
          emphasis: { disabled: true },
          legendHoverLink: false,
        },
        {
          name: '', type: 'bar',
          label: {
            show: true,
            formatter: params => (params.value > 5 ? params.value + '%' : ''),
          },
          emphasis: { focus: 'series' },
          barWidth: 45,
          data: [
            { value: 74, x: 5, itemStyle: {color: '#fc8452'} }, 73.7, 69.1, 67.7, 62.1, 60, 3.4]
        },
      ]
    }
  },
  {
    title: '目前地政事務所開放民眾替家人的不動產辦理「預告登記」，未來不動產要移轉、抵押等，都必須經過指定的「請求權人」同意才能動作',
    subtitle: '',
    after: '※儘管逾8成受試者不知道這項服務，但在得知後有近75%願意辦理。',
    options: {
      tooltip: {
        trigger: 'item',
        formatter: (par) => {
          const { name, value } = par.data
          const title = `<div class="text-sm tracking-normal break-all whitespace-pre-wrap">${name.replace(/\n/g, '')}</div>`
          return `${title}<strong class="text-base" style="color: ${par.color}">${value}%</strong>`
        }
      },
      title: [
        {
          text: '請問您知不知道這項措施？',
          left: isMobile.value ? '50%' : '25%',
          top: '2%',
          textAlign: 'center',
          textStyle: {
            color: '#505050',
            fontFamily: 'Noto Sans TC',
            fontWeight: '500',
          },
        },
        {
          text: '若您有需要時, 願不願意這樣做?',
          left: isMobile.value ? '50%' : '75%',
          top: isMobile.value ? '52%' : '2%',
          textAlign: 'center',
          textStyle: {
            color: '#505050',
            fontFamily: 'Noto Sans TC',
            fontWeight: '500',
          },
        }
      ],
      series: [
        {
          type: 'pie',
          radius: isMobile.value ? ['25%', '50%'] : ['35%', '60%'],
          center: isMobile.value ? ['50%', '25%'] : ['25%', '50%'],
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}\n{c}%',
            fontWeight: '500',
            fontSize: 15,
            position: 'outside',
          },
          emphasis: {label: { show: true }},
          data: [
            { value: 17, name: '知道', itemStyle: { color: '#5470c6' }},
            { value: 83, name: '不知道', itemStyle: { color: '#91cc75' }},
          ]
        },
        {
          type: 'pie',
          radius: isMobile.value ? ['25%', '50%'] : ['35%', '60%'],
          center: isMobile.value ? ['50%', '75%'] : ['75%', '50%'],
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}\n{c}%',
            fontWeight: '500',
            fontSize: 15,
            position: 'outside',
          },
          data: [
            { value: 74.8, name: '願意', itemStyle: { color: '#5470c6' }},
            { value: 18.5, name: '不願意', itemStyle: { color: '#91cc75' }},
            { value: 6.7, name: '無明確意見', itemStyle: { color: '#c3c3c3' }},
          ]
        }
      ],
    }
  },
  {
    title: '請問您贊不贊成民眾在購買定期存款單時，可自行選擇註記，當解除定存時，銀行須通知指定聯絡人？',
    subtitle: '',
    after: '※交叉分析發現，學歷愈高、收入愈高，「不贊成」比率愈高。其中，研究所學歷者有28.7％表示不贊成，高於整體約12個百分點。',
    options: {
      tooltip: {
        trigger: 'item',
        formatter: (par) => {
          const { name, value } = par.data
          const title = `<div class="text-sm tracking-normal break-all whitespace-pre-wrap">${name.replace(/\n/g, '')}</div>`
          return `${title}<strong class="text-base" style="color: ${par.color}">${value}%</strong>`
        }
      },
      title: {
        text: '若您有需要時, 願不願意這樣做?',
        left: isMobile.value ? '50%' : '75%',
        top: isMobile.value ? '52%' : '2%',
        textAlign: 'center',
        textStyle: {
          color: '#505050',
          fontFamily: 'Noto Sans TC',
          fontWeight: '500',
        },
      },
      series: [
        {
          type: 'pie',
          radius: isMobile.value ? ['25%', '50%'] : ['35%', '60%'],
          center: isMobile.value ? ['50%', '25%'] : ['25%', '50%'],
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}\n{c}%',
            fontWeight: '500',
            fontSize: 15,
            position: 'outside',
          },
          emphasis: {label: { show: true }},
          data: [
            { value: 78.9, name: '贊成', itemStyle: { color: '#5470c6' }},
            { value: 16.6, name: '不贊成', itemStyle: { color: '#91cc75' }},
            { value: 4.5, name: '無明確意見', itemStyle: { color: '#c3c3c3' }},
          ]
        },
        {
          type: 'pie',
          radius: isMobile.value ? ['25%', '50%'] : ['35%', '60%'],
          center: isMobile.value ? ['50%', '75%'] : ['75%', '50%'],
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}\n{c}%',
            fontWeight: '500',
            fontSize: 15,
            position: 'outside',
          },
          data: [
            { value: 91.2, name: '願意', itemStyle: { color: '#5470c6' }},
            { value: 6.2, name: '不願意', itemStyle: { color: '#91cc75' }},
            { value: 2.7, name: '無明確意見', itemStyle: { color: '#c3c3c3' }},
          ]
        }
      ],
    }
  },
  {
    title: '請問您贊不贊成民眾在開立活儲帳戶時，可自行選擇註記，往後匯出超過自己設定金額時，銀行須通知指定聯絡人？',
    subtitle: '',
    after: '※交叉分析發現，學歷愈高、收入愈高，「不贊成」比率愈高。其中，研究所學歷者，有28.9％表示不贊成，年薪逾百萬者則有多達30.7％不贊成。',
    options: {
      tooltip: {
        trigger: 'item',
        formatter: (par) => {
          const { name, value } = par.data
          const title = `<div class="text-sm tracking-normal break-all whitespace-pre-wrap">${name.replace(/\n/g, '')}</div>`
          return `${title}<strong class="text-base" style="color: ${par.color}">${value}%</strong>`
        }
      },
      title: {
        text: '若您有需要時, 願不願意這樣做?',
        left: isMobile.value ? '50%' : '75%',
        top: isMobile.value ? '52%' : '2%',
        textAlign: 'center',
        textStyle: {
          color: '#505050',
          fontFamily: 'Noto Sans TC',
          fontWeight: '500',
        },
      },
      series: [
        {
          type: 'pie',
          radius: isMobile.value ? ['25%', '50%'] : ['35%', '60%'],
          center: isMobile.value ? ['50%', '25%'] : ['25%', '50%'],
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}\n{c}%',
            fontWeight: '500',
            fontSize: 15,
            position: 'outside',
          },
          emphasis: {label: { show: true }},
          data: [
            { value: 79.4, name: '贊成', itemStyle: { color: '#5470c6' }},
            { value: 17.5, name: '不贊成', itemStyle: { color: '#91cc75' }},
            { value: 3.1, name: '無明確意見', itemStyle: { color: '#c3c3c3' }},
          ]
        },
        {
          type: 'pie',
          radius: isMobile.value ? ['25%', '50%'] : ['35%', '60%'],
          center: isMobile.value ? ['50%', '75%'] : ['75%', '50%'],
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}\n{c}%',
            fontWeight: '500',
            fontSize: 15,
            position: 'outside',
          },
          data: [
            { value: 92.6, name: '願意', itemStyle: { color: '#5470c6' }},
            { value: 5.5, name: '不願意', itemStyle: { color: '#91cc75' }},
            { value: 1.9, name: '無明確意見', itemStyle: { color: '#c3c3c3' }},
          ]
        }
      ],
    }
  },
  {
    title: '目前各家銀行單日提款上限是以日期計算，您贊不贊成改以間隔24小時為計算時間？',
    subtitle: '',
    after: '',
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
            { value: 54.4, name: '贊成', itemStyle: { color: '#5470c6' }},
            { value: 35.2, name: '不贊成', itemStyle: { color: '#91cc75' }},
            { value: 10.4, name: '無明確意見', itemStyle: { color: '#c3c3c3' }},
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
    title: '當您在Ａ銀行的帳戶遭到詐騙造成財損，或有涉及詐騙的異常交易情形，目前Ａ銀行受限於個資保護，無法將該訊息同步通知其餘您有開戶的銀行。您是否贊成修改規定，讓Ａ銀行在此情況下能立即通知其他銀行？',
    subtitle: '',
    after: '※逾８成民眾願意有詐騙異常交易情形時，犧牲部分個資保護，授權銀行將訊息通知其他金融機構。且學歷愈高、收入愈高者，贊成比率愈高。',
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
            { value: 82.8, name: '贊成', itemStyle: { color: '#5470c6' }},
            { value: 12.1, name: '不贊成', itemStyle: { color: '#91cc75' }},
            { value: 12.1, name: '無明確意見', itemStyle: { color: '#c3c3c3' }},
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