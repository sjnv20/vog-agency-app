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
            <div class="category">
                <div class="sub-title">
                    <span>가수</span>
                    <i class="icon-chevron-right"></i>
                </div>
                <Swiper
                    v-if="btnNum == 0"
                    :slides-per-view="3"
                    :space-between="12"
                    :loop="true"
                >
                    <SwiperSlide>
                        <img :src="img1"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img :src="img1"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img :src="img1"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img :src="img1"/>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

import SegmentBtn from '@/components/SegmentBtn.vue'

import img1 from '@/assets/images/swiperImg/경서예지.jpg'

const router = useRouter()

const btnNum = ref(0)

const btnList = ref([
    { title: '발라드', selected: true },
    { title: '아이돌', selected: false },
    { title: '트로트', selected: false },
    { title: '힙합', selected: false },
])

const onUpdateBtn = (idx) => {
  btnList.value.forEach((btn, i) => {
    btn.selected = i === idx
    btnNum.value = idx
  })
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