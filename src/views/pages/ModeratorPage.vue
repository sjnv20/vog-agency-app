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

            <FancyBox :imgList="selectedArtists" />
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
    { title: '코미디언', selected: true },
    { title: 'MC', selected: false },
])

const onUpdateBtn = (idx) => {
  btnList.value.forEach((btn, i) => {
    btn.selected = i === idx
    btnNum.value = idx
  })
}

const CATEGORY_KEY_BY_TAB_INDEX = {
  0: 'comedian',
  1: 'mc',
}

const selectedArtists = computed(() => {
  const key = CATEGORY_KEY_BY_TAB_INDEX[btnNum.value]
  return ARTIST_CATEGORIES.find(category => category.key === key)?.artists || []
})
</script>