<template>
  <div class="content-wrapper md:p-7">
    <div class="sm:flex">
      <div class="sm:w-1/3">
        <img loading="lazy" :src="article.image" :alt="article.title">
      </div>
      <div class="flex-1 sm:pl-6 space-y-1 sm:space-y-2">
        <h4 class="text-lg xl:text-xl mt-2 sm:mt-0">
          <span class="line-clamp-2">{{ article.title }}</span>
        </h4>
        <hr>
        <p class="line-clamp-2 text-sm">{{ article.description }}</p>
        <div class="flex justify-end">
          <a
            class="block w-full sm:w-auto bg-primary text-white text-sm text-center 
            p-2 sm:py-1 mt-1 sm:mt-0 rounded @media-hover:hover:opacity-50"
            :href="article.url"
            target="blank"
          >了解更多</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  article: {
    type: Object,
    required: true
  },
})
</script>
