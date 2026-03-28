<template>
    <div class="main-header" :class="{ white: isWhite, home: isHome }">
        <i class="icon-menu" @click="$emit('open-sidebar')"></i>
        <div class="logo-wrap" @click="goMain">
            <span>VoG</span>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const prop = defineProps({
  isWhite: Boolean,
  isHome: Boolean,
})
const router = useRouter()

const goMain = () => {
    router.push('/main')
}
</script>