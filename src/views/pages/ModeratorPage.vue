<template>
    <div class="main-container">
        <div class="content artist">
            <span class="title">MC/개그맨</span>
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
                :imgList="moderatorArtists"
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
    { title: '개그맨', selected: true },
    { title: '아나운서', selected: false },
    { title: '배우', selected: false },
])

const moderatorArtists = computed(() => {
  return ARTIST_CATEGORIES.find(
    category => category.key === 'mc'
  )?.artists || []
})

const onUpdateBtn = (idx) => {
  btnList.value.forEach((btn, i) => {
    btn.selected = i === idx
    btnNum.value = idx
  })
}
</script>