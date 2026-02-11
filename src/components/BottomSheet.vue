<template>
  <transition name="bottom-sheet">
    <div v-if="isOpen" class="bottom-sheet-wrap">
      <div class="overlay" @click="close" />
      <div class="bottom-sheet">
        <div class="w-full flex justify-between items-center h-[44px]">
            <h2>개인정보처리방침</h2>
            <i class="icon-x" @click="close"></i>
        </div>
        <slot/>
      </div>
    </div>
  </transition>
</template>


<script setup>
import { watch, onUnmounted } from 'vue'
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }
)

onUnmounted(() => {
  document.body.style.overflow = ''
  document.body.style.touchAction = ''
})

</script>