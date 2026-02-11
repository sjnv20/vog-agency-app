import { createApp } from 'vue'

import router from './router'
import App from './App.vue'

import VCalendar from 'v-calendar'
import clickOutside from '@/directives/clickOutside'

import 'animate.css'
import 'swiper/css'
import 'v-calendar/style.css'


import '@/assets/fonts/font.css'
import '@/assets/css/_reset.css'
import '@/assets/css/_input.css'
import '@fancyapps/ui/dist/fancybox/fancybox.css'


const app = createApp(App)

app.use(VCalendar)
app.use(router)

app.directive('click-outside', clickOutside)
app.config.devtools = false

app.mount('#app')