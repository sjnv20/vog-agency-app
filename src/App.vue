<template>
  <div class="layout">
    <AppHeader 
      :isWhite="isHeaderWhite"
      :isHome="headerType == 'home'"
      @open-sidebar="openSidebar"
    />
     <SidebarMenu
      :open="isSidebarOpen"
      @close="closeSidebar"
    />
    <router-view v-slot="{ Component }">
      <component
        :is="Component"
        @update-header="isHeaderWhite = $event"
      />
    </router-view>
    <AppFooter />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router'

import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'

const route = useRoute()
const isHeaderWhite = ref(false)
const headerType = computed(() => route.meta.headerType)

const isSidebarOpen = ref(false)

const openSidebar = () => {
  isSidebarOpen.value = true
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>

<style scoped>
#app {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
}

#app > div:last-child {
  overflow-y: scroll;
}
</style>
