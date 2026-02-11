<template>
    <div class="main-container">
        <div class="content casting">
            <span class="title">아티스트 섭외 문의</span>
            <div class="box">
                행사 목적과 일정에 맞는 아티스트를 추천해드립니다.<br/>
                아래 정보를 입력해주시면 빠르게 안내드릴게요.
            </div>
            
            <div class="form-box">
                <div class="input-wrap" :class="{ invalid: $v.name.$error }">
                    <label for="name">성함<span class="dot"></span></label>
                    <input class="custom-input" id="name" @input="onChangeInput"/>
                    <span class="invalid-msg" v-if="$v.name.$error">
                      <span class="icon-alert-circle"></span>{{ $v.name.$errors[0].$message }}
                    </span>
                </div>

                <div class="input-wrap" :class="{ invalid: $v.phoneNum.$error }">
                    <label for="tel-phone">연락처<span class="dot"></span></label>
                    <div class="row-content-wrap">
                        <input
                            v-for="(val, idx) in phoneParts"
                            :key="idx"
                            type="text"
                            maxlength="4"
                            inputmode="numeric"
                            class="custom-input"
                            :value="val"
                            @input="e => onInput(e, idx)"
                        />
                    </div>
                    <span class="invalid-msg" v-if="$v.phoneNum.$error">
                      <span class="icon-alert-circle"></span>{{ $v.phoneNum.$errors[0].$message }}
                    </span>
                </div>

                <div class="input-wrap" :class="{ invalid: $v.artist.$error }">
                    <label for="artist">희망 아티스트<span class="dot"></span></label>
                    <input class="custom-input" id="artist" @input="onChangeInput"/>
                    <span class="invalid-msg" v-if="$v.artist.$error">
                      <span class="icon-alert-circle"></span>{{ $v.artist.$errors[0].$message }}
                    </span>
                </div>

                 <div class="input-wrap">
                    <label for="date">희망 날짜<span class="dot"></span></label>
                     <CustomRangeDatePicker
                        :setDatePropValue="setDatePropValue"
                        @dayClick="getDateRange"
                    />
                </div>

                <div class="input-wrap" :class="{ invalid: $v.region.$error }">
                    <label for="region">행사 지역<span class="dot"></span></label>
                    <input class="custom-input" id="region" @input="onChangeInput"/>
                    <span class="invalid-msg" v-if="$v.region.$error">
                      <span class="icon-alert-circle"></span>{{ $v.region.$errors[0].$message }}
                    </span>
                </div>

                <div class="input-wrap" :class="{ invalid: $v.category.$error }">
                    <label for="name">행사 카테고리<span class="dot"></span></label>
                    <CustomDropDown
                        :isOpen="isCategorySelect"
                        :isUp="true"
                        :selected="selectedCategory"
                        :options="CategoryList"
                        @click-select="clickCategorySelect"
                        @select-option="selectCategoryOption"
                    />
                    <span class="invalid-msg" v-if="$v.category.$error">
                      <span class="icon-alert-circle"></span>{{ $v.category.$errors[0].$message }}
                    </span>
                </div>

            <button class="btn w-full mb-4" @click="checkValidation">문의하기</button>

            </div>
        </div>
    </div>    
</template>

<script setup>
import { computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

import CustomRangeDatePicker from '@/components/CustomDatepicker.vue'
import CustomDropDown from '@/components/CustomDropdown.vue'
import emailjs from '@emailjs/browser'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const currentDate = new Date()
const today = dateSetting(currentDate)

const setDatePropValue = ref(today + ' ~ ' + today)

const startDate = ref(today)
const endDate = ref(today)

// 카테고리 드롭다운
const isCategorySelect = ref(false)
const selectedCategory = ref({ id: '', title: '타입 전체' })
const CategoryList = ref([
  { id: 0, title: '대학 행사' },
  { id: 1, title: '지역 행사' },
  { id: 2, title: '기업 행사' },
  { id: 3, title: '축가 / 사회' },
  { id: 4, title: '기타' }
])

const submitData = ref({
    name: '',
    phoneNum: '',
    artist:'',
    startDate:today,
    endDate: today,
    region:'',
    category:'',
})
const phoneParts = ref(['', '', ''])
const phoneLength = helpers.withMessage(
  '연락처를 정확히 입력해주세요.',
  value => value && value.length >= 10 && value.length <= 12
)

const rules = computed(() => ({
    name: { 
        required: helpers.withMessage('성명은 필수 입력값입니다.', required),
    },
    artist: { 
        required: helpers.withMessage('희망 아티스트는 필수 입력값입니다.', required),
    },
    region: {
        required: helpers.withMessage('희망 지역은 필수 입력값입니다.', required),
    },
    phoneNum: {
        required: helpers.withMessage('연락처는 필수 입력값입니다.', required),
        phoneLength
    },
    category: {
        required: helpers.withMessage('행사 카테고리는 필수 입력값입니다.', required),
    }
}))
const $v = useVuelidate(rules, submitData)

const submitForm = () => {
    console.log(submitData.value)
    sendEmail()
}

function checkValidation() {
    const result = $v.value.$validate()
    result
    .then((res) => {
        if (res) {
            submitForm()
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

function onChangeInput(e) {
  const { id, value } = e.target
  submitData.value[id] = value
}


function dateSetting(dateInfo) {
  const year = dateInfo.getFullYear()
  const month = dateInfo.getMonth() + 1
  const date = dateInfo.getDate()
  return `${year}-${dateFormat(month)}-${dateFormat(date)}`
}

function dateFormat(date) {
  const stringDate = date.toString()
  return stringDate.length === 1 ? '0' + stringDate : stringDate
}

function getDateRange({ start, end }) {
  startDate.value = start
  endDate.value = end
  submitData.value.startDate = dateSetting(startDate.value)
  submitData.value.endDate = dateSetting(endDate.value)
}

function onInput(e, idx) {
  const value = e.target.value.replace(/\D/g, '').slice(0, 4)
  phoneParts.value[idx] = value

  // 항상 하나의 값으로 합치기
  submitData.value.phoneNum = phoneParts.value.join('')
}

// 카테고리 드롭다운
function clickCategorySelect(bool) {
  isCategorySelect.value = bool
}
function selectCategoryOption(e, option) {
  e.stopPropagation()
  selectedCategory.value = option
  submitData.value.category = option.title
  isCategorySelect.value = false
}

function sendEmail() {
  emailjs.send(
    serviceId,
    templateId,
    {
      name: submitData.value.name,
      phone: submitData.value.phoneNum,
      artist: submitData.value.artist,
      date: submitData.value.startDate + '∼' + submitData.value.endDate,
      region: submitData.value.region,
      category: submitData.value.category
    },
    key
  )
  .then(() => {
    alert('메일이 전송되었습니다!')
  })
  .catch(err => {
    console.error(err)
  })
}


</script>