<template>
  <div class="datepicker-wrap">
    <div class="input-group" @click="openDatePicker">
      <div class="input-group-text">
        <i class="fe fe-calendar lh--9 op-6"></i>
      </div>
      <div class="custom-input-date">
        <input
          type="text"
          class="custom-input form-control fc-datepicker hasDatepicker"
          placeholder="YYYY-MM-DD ~ YYYY-MM-DD"
          :value="selectedDate"
          readonly
        />
        <i class="icon-calendar"></i>
      </div>
    </div>
    <div 
        class="calendar-box" 
        v-show="isDatepickerOpen" 
        v-click-outside="closeDatePicker"
    >
      <VDatePicker 
        v-model.range="range" 
        :min-date="today"
        />
    </div>
  </div>
</template>
<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  setDatePropValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['dayClick'])

const today = new Date()
const isDatepickerOpen = ref(false)
const selectedDate = ref(props.setDatePropValue)

const range = ref({
  start: new Date(),
  end: new Date()
})

watch(
  () => props.setDatePropValue,
  (val) => {
    selectedDate.value = val
  }
)

const openDatePicker = () => {
  isDatepickerOpen.value = true
}
const closeDatePicker = () => {
  isDatepickerOpen.value = false
}

function clickDate(event) {
  if (event.id <= today) {
    selectedDate.value = event.id
  }
}

watch(
  range,
  (val) => {
    if (!val.start || !val.end) return

    let start = val.start
    let end = val.end

    if (start > end) {
      ;[start, end] = [end, start]
    }

    selectedDate.value =
      `${formatDate(start)} ~ ${formatDate(end)}`

    emit('dayClick', { start, end })
    nextTick(() => {
      isDatepickerOpen.value = false
    })
  },
  { deep: true }
)

function formatDate(date) {
  return date.toLocaleDateString('en-CA')
}

</script>
<style scoped>
.calendar-box :deep(.vc-arrow) {
  background-color: white;
}
.calendar-box :deep(.vc-header .vc-title) {
  background-color: white;
}
.calendar-box :deep(.vc-light .vc-attr) {
  --vc-highlight-solid-bg: #03c75a;
  --vc-highlight-light-bg: rgba(3, 199, 90, 0.25);
  --vc-highlight-light-content-color: white;
  --vc-highlight-outline-border: #03c75a;
  --vc-highlight-outline-content-color: #03c75a;
  --vc-content-color: #03c75a;
  --vc-focus-ring: none;
}
.calendar-box :deep(.vc-day-content.vc-disabled) {
  color: #c6d5ea;
}
.calendar-box {
  position: absolute;
  background-color: white;
  z-index: 9;
  box-shadow: 0 10px 30px 0 rgba(24, 28, 33, 0.05);
}
.datepicker-wrap .form-control[readonly] {
  background-color: white;
}
</style>
