<template>
  <div class="custom-dropdown" v-if="selected">
    <div
      class="dropdown-select"
      :class="[{ show: isOpen }, { up_select: isUp }]"
      ref="customDropdown"
      tabindex="0"
      @keydown="openDropdown"
    >
      <div class="dropdown-box-top" @click="closeSelect">
        <span class="selected">{{ selected.title }}</span>
        <i :class="iconClass"></i>
      </div>
      <div class="dropdown-box" :class="{ show: isOpen }">
        <span
          class="option"
          :class="{ selected: item.title === selected.title}"
          v-for="(item, idx) in options"
          :key="idx"
          @click="$emit('select-option', $event, item)"
          >{{ item.title }}</span
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
  isOpen: { type: Boolean, default: false },
  selected: { type: Object, default: null },
  options: { type: Array, default: () => [] },
  iconClass: { type: String, default: 'icon-chevron-down' },
  isUp: { type: Boolean, default: false },
  disabledEvent: { type: Boolean, default: false }
})

const customDropdown = ref(null)
const emit = defineEmits(['click-select', 'select-option'])

const handleClickOutside = (event) => {
  if (customDropdown.value) {
    if (!customDropdown.value.contains(event.target)) {
      emit('click-select', false)
    }
  }
}

const closeSelect = () => {
  if (customDropdown.value.classList.contains('show')) {
    emit('click-select', false)
  } else {
    emit('click-select', true)
  }
}

function openDropdown(event) {
  if (event.key === 'Enter') {
    emit('click-select', !props.isOpen)
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true)
})
</script>
<style scoped>
</style>
