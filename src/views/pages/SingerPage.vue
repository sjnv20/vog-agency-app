<template>
    <div class="main-container">
        <div class="content artist">
            <span class="title">가수</span>
             <div class="box">
                리스트에 없는 아티스트도 섭외 가능합니다.
            </div>
            <SegmentBtn 
                class="mt-4"
                :btnList="btnList"
                :btnNum="btnNum"
                @update:btnNum="onUpdateBtn"
            ></SegmentBtn>

            <FancyBox 
                :imgList="imgList"
            />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue'

import SegmentBtn from '@/components/SegmentBtn.vue'
import FancyBox from '@/components/FancyBox.vue'

import img1 from '@/assets/images/swiperImg/경서예지.jpg'

const btnNum = ref(0)

const btnList = ref([
    { title: '발라드', selected: true },
    { title: '힙합/래퍼', selected: false },
    { title: '트로트', selected: false },
    { title: '댄스', selected: false },
])

const imgList = ref([
    { img: img1, artist: "경서예지"},
    { img: img1, artist: "순순희"},
    { img: img1, artist: "경서예지" },
    { img: img1, artist: "경서예지" },
    { img: img1, artist: "경서예지" },
])

const onUpdateBtn = (idx) => {
  btnList.value.forEach((btn, i) => {
    btn.selected = i === idx
    btnNum.value = idx
  })
}
</script>