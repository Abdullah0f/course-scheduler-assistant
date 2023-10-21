<template>
  <NavBar/>

  <div class="container">
    <RouterView />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue"
export default {
  components: { NavBar }
}
</script>
<style scoped>
</style>