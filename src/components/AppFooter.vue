<template>
    <div class="main-footer">
        <p>신의목소리 에이전시&nbsp;&nbsp;|&nbsp;&nbsp;대표자 : 김기태 <br/>
            대표전화 : 010-5800-0841<br/>이메일 : vog.agency2026@gmail.com<br/>
            주소 : 부산광역시 해운대구 해운대로794, 1동 1403호 GF-43<br/>
            사업자등록번호 : 349-65-00637&nbsp;&nbsp;|&nbsp;&nbsp;개인정보관리책임자 : 김기태<br/>
            <span class="text-[#03C75A] underline" @click="openBottomSheet">개인정보처리방침</span>
        </p>
    </div>

    <BottomSheet :isOpen="isOpen" @close="closeBottomSheet" >
        <div 
            class="overflow-y-scroll h-full pb-[56px] pr-2" 
            v-html="PRIVACY_POLICY_HTML" 
        />
    </BottomSheet>
</template>

<script setup>
import { computed, ref } from 'vue'

import { PRIVACY_POLICY_HTML } from '@/data/privacyPolicy.js'
import BottomSheet from '@/components/BottomSheet.vue'

const isOpen = ref(false)

const openBottomSheet = () => {
    isOpen.value = true
}
const closeBottomSheet = () => {
    isOpen.value = false
}
</script>