<template>
  <div>
    <article class="pt-px">
      <h1 class="text-2xl lg:text-3xl xl:text-4xl sm:text-center mb-6 mt-12 sm:my-16 xl:leading-snug mx-auto w-11/12 max-w-screen-lg min-h-[1.375em]">
        2025 防詐新戰略
      </h1>

      <div class="container">
        <p class="text-xl mb-6">反詐大調查 主動檢舉、阻斷傳播者不到15％ 高學歷高自信 受騙更難脫困</p>
        <Introduction>
          <p>「上周我才收到一張停車欠費通知，六十元而已，點進去網站做得像真的一樣，信用卡號差點被騙走。」三十一歲的工程師丞浩點開LINE，翻出與假網友的聊天對話，嘴裡邊嘟囔「最近詐騙又變多了，個資不知道從哪流出去的。」</p>
          <p>兩個月前，丞浩的親戚長輩遭詐團設局，退休金幾乎被榨乾，這讓他繃緊神經，耳提面命家中兩老，千萬別理會不明來電和簡訊。「不過你教一招，詐團可以再變出五招，只能不厭其煩地提醒。」他用八個字形容，防詐，就是「全民皆兵，長期抗戰」。</p>
          <p>為了解民眾接觸詐騙訊息的情形，《今周刊》委託山水民調公司，針對全國十八歲以上的民眾，進行「二○二四全民反詐騙大調查」，希望透過現況分析，找出相應的防堵作為。</p>
        </Introduction>
      </div>

      <div class="container pb-20">
        <ContentWrapper class="my-8 space-y-4">
          <h3 class="text-lg sm:text-xl text-primary font-bold">詐團分眾投放 假機關瞄準50歲以上族群</h3>
          <ChartType1 />
          <h3 class="text-lg sm:text-xl text-primary font-bold">投資詐騙橫跨全世代 長者逾七成經「電話」接觸</h3>
          <p>至於接觸詐騙訊息的頻率，整體有三成受試者「每月至少接觸一次」，且年齡層愈低，接收訊息愈為頻繁。以十八歲到二十九歲的年輕族群來看，將近半數每月至少接觸一次詐騙訊息，甚至逾兩成「每周至少接觸一次」。</p>
          <p>在大量詐騙訊息中，「投資詐騙」類別幾乎橫跨所有世代，攻占各年齡層的首位。這項結果，也與警政署刑事局打詐儀錶板中的投資詐騙受害人數居高不下，形成呼應。</p>
          <p>再細究各年齡區間的前三大熱門樣態，正好以「五十歲」為一道分界線。不滿五十歲的族群，較常接觸「購物」、「假帳單」、「中獎／優惠」等詐騙，單筆財損金額較小；而逾五十歲中高齡族群，則較多接觸假冒公務機關、假冒親友等詐騙樣態。 不過，無論年齡分布，當民眾接獲疑似詐騙訊息，只有近十五％受試者會主動向政府相關管道通報或檢舉，比率極低。</p>
          <p>民眾普遍沒有意願採取積極行動，阻斷詐騙訊息的傳遞，加上整體社會對於自我識詐能力過度自信，已成為防詐雙重警訊。</p>
          <p>這項調查中，當問及有沒有信心識別詐騙，整體受試者有高達八三％表示「有信心」，僅約一○％自認「沒信心」，形成懸殊差距。</p>
        </ContentWrapper>

        <ContentWrapper class="my-8 space-y-4">
          <h3 class="text-lg sm:text-xl text-primary font-bold">3種職業自信爆表 學歷、收入越高 越有信心不受騙</h3>
          <ChartType2 />
        </ContentWrapper>
      </div>
    </article>


  </div>
</template>

<script setup>
import Introduction from '../components/Introduction.vue'
import ContentWrapper from '../components/ContentWrapper.vue'
import ChartType1 from '../components/charts/ChartType1.vue'
import ChartType2 from '../components/charts/ChartType2.vue'
import { format } from 'echarts/core'
</script>