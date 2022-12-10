<template>
  <RouterView />  
</template>

<script>
import { RouterView } from 'vue-router'
export default {
  data() {
    return {
      session: false
    }
  },
  mounted() {
    if (localStorage.getItem('user')) {
      this.session = true
    }
  },
  components: {
    RouterView,
  },
}

</script>
<style>

</style>
