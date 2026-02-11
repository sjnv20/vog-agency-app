<template>
    <div class="main-container">
        <div class="top-section">
            <p class="title">행사에 맞는 <br/><span class="animate__animated animate__fadeInUp">최고의 아티스트</span>를<br/>섭외하세요</p>
            <button class="btn mt-6 animate__animated animate__fadeInUp" @click="goToCasting()">섭외하기</button>
            <div class="state-summary animate__animated animate__fadeInUp">
                <div class="circle">
                    <span class="font-bold">300+</span>
                    <span>누적섭외</span>
                </div>
                <div class="circle">
                    <span class="font-bold">110+</span>
                    <span>아티스트</span>
                </div>
                <div class="circle">
                    <span class="font-bold">700+</span>
                    <span>파트너</span>
                </div>
            </div>
        </div>
        <div class="body-section">
            <p class="title">섭외 추천 아티스트</p>
            <div
                v-for="(category, idx) in ARTIST_CATEGORIES"
                :key="category.key"
                class="category"
                :class="{ '!mt-[56px]': idx === 1}"
                @click="clickCategory(idx)"
                >
                <div class="sub-title">
                    <span>{{ category.title }}</span>
                    <i class="icon-chevron-right"></i>
                </div>
                <ArtistSwiper
                    :artists="category.artists"
                />
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

import { ARTIST_CATEGORIES } from '@/data/artists'
import ArtistSwiper from '@/components/ArtistSwiper.vue'

const router = useRouter()

const clickCategory = (idx) => {
    if (idx === 0) {
        router.push('/artist/singer')
    } else {
        router.push('/artist/moderator')
    }
}

const goToCasting = () => {
    router.push('/casting')
}

const emit = defineEmits(['update-header'])

const onScroll = () => {
    emit('update-header', window.scrollY > 50)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  emit('update-header', false)
})

</script>