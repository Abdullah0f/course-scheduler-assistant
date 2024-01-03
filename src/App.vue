<template>
  <NavBar />

  <div class="container">
    <RouterView v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </RouterView>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  components: { NavBar }
}
</script>
<style scoped></style>
