<template>
    <Swiper 
        :slides-per-view="3" 
        :slides-per-group="3"
        :space-between="12" 
        loop
        :modules="[Autoplay]"
        :autoplay="{
            delay: 2000,
            disableOnInteraction: false
        }"
    >
      <SwiperSlide v-for="(artist, i) in artists" :key="i">
        <img :src="artist.img" loading="lazy" />
      </SwiperSlide>
    </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

const props = defineProps({
  artists: {
    type: Array,
    default: () => []
  }
})


</script>