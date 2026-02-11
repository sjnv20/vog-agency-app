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
                :imgList="singerArtists"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import { ARTIST_CATEGORIES } from '@/data/artists'
import SegmentBtn from '@/components/SegmentBtn.vue'
import FancyBox from '@/components/FancyBox.vue'

const btnNum = ref(0)

const btnList = ref([
    { title: '발라드', selected: true },
    { title: '힙합/래퍼', selected: false },
    { title: '트로트', selected: false },
    { title: '댄스', selected: false },
])

const onUpdateBtn = (idx) => {
  btnList.value.forEach((btn, i) => {
    btn.selected = i === idx
    btnNum.value = idx
  })
}

const singerArtists = computed(() => {
  return ARTIST_CATEGORIES.find(
    category => category.key === 'singer'
  )?.artists || []
})
</script>