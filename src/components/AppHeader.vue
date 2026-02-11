<template>
    <div class="main-header" :class="{ white: isWhite, home: isHome }">
        <i class="icon-menu" @click="$emit('open-sidebar')"></i>
        <div class="logo-wrap">
            <span>VoG</span>
        </div>
    </div>
</template>

<script setup>
defineProps({
  isWhite: Boolean,
  isHome: Boolean,
})
</script>