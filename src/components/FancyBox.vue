<template>
  <div class="artist-list">
    <a
      v-for="(img, idx) in imgList"
      :key="idx"
      :href="img"
      class="artist-card"
    >
        <div class="img-box">
          <a 
            :href="img.img" 
            data-fancybox="gallery"
            :data-caption="img.name">
            <img :src="img.img" loading="lazy"/>
          </a>
        </div>
        <span class="artist-name">{{ img.name }}</span>
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
