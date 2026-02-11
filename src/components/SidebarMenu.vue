<template>
    <transition name="slide-left">
        <aside v-if="open" class="sidebar">
            <i class="icon-x" @click="emit('close')"></i>
            <nav class="flex flex-col mt-[14px]">
                <a class="menu-item" href="/main">HOME</a>
                <a class="menu-item" href="/casting">아티스트 섭외 문의</a>
                
                <div class="menu-group">
                    <div 
                        class="flex justify-between items-center"  
                        @click="toggleArtist"
                    >
                        <a class="menu-item">아티스트</a>
                        <i
                            class="icon-chevron-down"
                            :class="{ open: isArtistOpen }"
                        ></i>
                    </div>
                    <transition name="slide-down">
                        <div
                            v-if="isArtistOpen"
                            class="sub-menu"
                        >
                            <a class="menu-item" href="/artist/singer">가수</a>
                            <a class="menu-item" href="/artist/moderator">MC / 개그맨</a>
                        </div>
                    </transition>
                </div>
            </nav>
        </aside>
    </transition>

    <transition name="fade">
        <div v-if="open" class="overlay" @click="emit('close')" />
    </transition>

</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentPath = ref(route.path)

const emit = defineEmits(['close'])

const props = defineProps({
  menu: {
    type: Object,
    default : ()=>({})
  },
  open: {
    type: Boolean,
    default: false
  }
})

const isArtistOpen = ref(true)

const toggleArtist = () => {
  isArtistOpen.value = !isArtistOpen.value
}
</script>