<template>
  <h1>الجدول</h1>
  <Schedule :schedule="schedule" />
</template>

<script setup>
import {schedule} from '../../schedule.js'
import Schedule from '../components/Schedule.vue';


</script>

<style scoped>
</style>