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
                    <input type="text" class="custom-input" id="name" @input="onChangeInput" placeholder="성함"/>
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
                    <input type="text" class="custom-input" id="artist" @input="onChangeInput" placeholder="희망 아티스트"/>
                    <span class="invalid-msg" v-if="$v.artist.$error">
                      <span class="icon-alert-circle"></span>{{ $v.artist.$errors[0].$message }}
                    </span>
                </div>

                 <div class="input-wrap">
                   <label for="date">희망 날짜/시간<span class="dot"></span></label>
                    <div class="flex gap-2">
                       <CustomRangeDatePicker
                          class="w-full"
                          :setDatePropValue="setDatePropValue"
                          @dayClick="getDateRange"
                      />
                      <input class="custom-input max-w-[100px]" id="time" @input="onChangeInput" placeholder="희망 시간"/>
                    </div>
                </div>

                <div class="input-wrap" :class="{ invalid: $v.region.$error }">
                    <label for="region">행사 지역<span class="dot"></span></label>
                    <input type="text" class="custom-input" id="region" @input="onChangeInput" placeholder="행사 지역"/>
                    <span class="invalid-msg" v-if="$v.region.$error">
                      <span class="icon-alert-circle"></span>{{ $v.region.$errors[0].$message }}
                    </span>
                </div>

                <div class="input-wrap" :class="{ invalid: $v.budget.$error }">
                    <label for="budget">섭외 예산<span class="dot"></span></label>
                    <input type="text" class="custom-input" id="budget" @input="onChangeInput" placeholder="섭외 예산" />
                    <span class="invalid-msg" v-if="$v.budget.$error">
                      <span class="icon-alert-circle"></span>{{ $v.budget.$errors[0].$message }}
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

            <button class="btn w-full mb-4" style="background: linear-gradient(to top, #03c75a, #54f59c);" @click="checkValidation">문의하기</button>
            <Spinner v-if="isLoading" />
            </div>
    
            <div class="contact-grid mt-12">
                <a 
                    href="tel:01058000841"
                    class="contact-item"
                >
                    <div class="icon-circle">
                        <i>📞</i>
                    </div>
                    <span>전화 문의</span>
                </a>

                <a 
                    href="sms:01058000841"
                    class="contact-item"
                >
                    <div class="icon-circle">
                        <i>💬</i>
                    </div>
                    <span>문자 문의</span>
                </a>

                <a 
                    href="mailto:vog.agency2026@gmail.com"
                    class="contact-item"
                >
                    <div class="icon-circle">
                        <i>✉️</i>
                    </div>
                    <span>이메일</span>
                </a>

                <a 
                    href="http://pf.kakao.com/_xhxexcxon/chat" 
                    target="_blank" 
                    class="contact-item"
                >
                    <div class="icon-circle">
                        <i>🗨️</i>
                    </div>
                    <span>Talk 문의</span>
                </a>
            </div>
        </div>
    </div>    
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

import CustomRangeDatePicker from '@/components/CustomDatepicker.vue'
import CustomDropDown from '@/components/CustomDropdown.vue'
import emailjs from '@emailjs/browser'
import Spinner from '@/components/Spinner.vue'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const currentDate = new Date()
const today = dateSetting(currentDate)

const setDatePropValue = ref(today + ' ~ ' + today)

const startDate = ref(today)
const endDate = ref(today)

const isLoading = ref(false)

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
    time: '',
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
    },
    budget : {
        required: helpers.withMessage('섭외 예산은 필수 입력값입니다.', required),
    }
}))
const $v = useVuelidate(rules, submitData)

const submitForm = () => {
    isLoading.value = true
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
  if (id === 'budget') {
     // 숫자만 추출
    const numericValue = value.replace(/\D/g, '')

    // 데이터에는 콤마 없는 값 저장
    submitData.value[id] = numericValue

    // 화면에는 콤마 포맷
    const formatted = numericValue ? Number(numericValue).toLocaleString() : ''
    e.target.value = formatted
  } else {
    submitData.value[id] = value
  }
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
      time: submitData.value.time,
      region: submitData.value.region,
      budget: submitData.value.budget,
      category: submitData.value.category
    },
    key
  )
  .then(() => {
    alert('메일이 전송되었습니다!')
    isLoading.value = false
  })
  .catch(err => {
    console.error(err)
    isLoading.value = false
  })
}

watch(() => isLoading.value, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

</script>