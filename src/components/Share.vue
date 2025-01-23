<template>
  <div class="flex justify-end items-center mb-4 space-x-2">
    <div class="flex-1 h-px bg-gray-300 mr-4" />
    <a
      href="#"
      @click.prevent="handleClick(`http://www.facebook.com/share.php?u=${shareUrl}`)"
    >
      <img class="w-14" src="../assets/images/ico.share.facebook.png" alt="facebook-share">
    </a>
    <a
      href="#"
      @click.prevent="handleClick(`https://social-plugins.line.me/lineit/share?url=${shareUrl}`)"
    >
      <img class="w-14" src="../assets/images/ico.share.line.png" alt="line-share">
    </a>
  </div>
</template>

<script setup>
const shareUrl = import.meta.env.VITE_URL

const handleClick = (url) => {
  window.open(url, 'newwindow', 'width=1000,height=800')
  return false;
}
</script>

