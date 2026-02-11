<template>
  <div class="artist-list">
    <a
      v-for="(img, idx) in imgList"
      :key="idx"
      :href="img"
      data-fancybox="gallery"
      class="artist-card"
    >
        <div class="img-box">
            <img :src="img.img" />
        </div>
        <span class="artist-name">{{ img.artist }}</span>
    </a>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { Fancybox } from '@fancyapps/ui'

const props = defineProps({
    imgList: { type: Array, default: () => []},
})

onMounted(() => {
  Fancybox.bind('[data-fancybox="gallery"]', {
    infinite: true,
    Thumbs: false,
  })
})

onUnmounted(() => {
  Fancybox.destroy()
})
</script>
