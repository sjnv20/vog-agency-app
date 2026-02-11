export default {
  beforeMount(el, binding) {
    el.__clickOutsideHandler__ = (e) => {
      if (!el.contains(e.target)) {
        binding.value(e)
      }
    }

    document.addEventListener('mousedown', el.__clickOutsideHandler__)
  },

  unmounted(el) {
    document.removeEventListener(
      'mousedown',
      el.__clickOutsideHandler__
    )
  },
}
