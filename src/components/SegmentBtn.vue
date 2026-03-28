<template>
    <div class="segment-btn">
        <div
            class="indicator"
            :style="indicatorStyle"
        ></div>

        <button 
            v-for="(btn, idx) in btnList" 
            :class="{selected:btn.selected}"
            :key="idx"
            @click="clickBtn(idx)"
        >{{ btn.title }}</button>
    </div>
</template>

<script setup>
import { computed } from 'vue';
 
const props = defineProps({
  btnList : {
    type:Array,
  },
    btnNum: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:btnNum'])

const clickBtn = (idx) => {
  emit('update:btnNum', idx)
}

const indicatorStyle = computed(() => {
  const count = props.btnList.length
  const width = `calc((100% - 12px) / ${count})`
  return {
    width,
    transform: `translateX(calc(${props.btnNum * 100}% + ${props.btnNum * (8 / count)}px))`,
  }
})


</script>