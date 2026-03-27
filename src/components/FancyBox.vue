<template>
  <div class="artist-list">
    <div
      v-for="(img, idx) in visibleList"
      :key="`${img?.name ?? 'artist'}-${idx}`"
      class="artist-card"
    >
      <div class="img-box">
        <a
          :href="img.img"
          data-fancybox="gallery"
          :data-caption="img.name"
        >
          <img :src="img.img" loading="lazy" />
        </a>
      </div>
      <span class="artist-name">{{ img.name }}</span>
    </div>

    <div
      v-if="enableInfinite && visibleCount < imgList.length"
      ref="sentinel"
      class="h-8"
    />
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { Fancybox } from '@fancyapps/ui'

const props = defineProps({
  imgList: { type: Array, default: () => [] },
  pageSize: { type: Number, default: 24 },
  enableInfinite: { type: Boolean, default: true },
})

const visibleCount = ref(props.pageSize)
const sentinel = ref(null)
let observer = null

const visibleList = computed(() => props.imgList.slice(0, visibleCount.value))

const loadMore = async () => {
  visibleCount.value = Math.min(
    visibleCount.value + props.pageSize,
    props.imgList.length
  )
  await nextTick()
  // Fancybox는 selector 기반 바인딩이라 동적 요소도 대부분 동작하지만,
  // 일부 환경에서 누락될 수 있어 한 번 더 bind를 호출해 안전하게 한다.
  Fancybox.bind('[data-fancybox="gallery"]', {
    infinite: true,
    Thumbs: false,
  })
}

onMounted(() => {
  Fancybox.bind('[data-fancybox="gallery"]', {
    infinite: true,
    Thumbs: false,
  })

  if (props.enableInfinite && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) loadMore()
      },
      { rootMargin: '600px 0px' }
    )
    if (sentinel.value) observer.observe(sentinel.value)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  Fancybox.destroy()
})

watch(
  () => props.imgList,
  async () => {
    // 카테고리 변경/리스트 교체 시 처음부터 다시 로드
    visibleCount.value = props.pageSize
    await nextTick()
    if (observer && sentinel.value) {
      observer.disconnect()
      observer.observe(sentinel.value)
    }
  }
)
</script>
