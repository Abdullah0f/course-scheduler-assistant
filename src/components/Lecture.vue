<template>
  <div class="lecture">
    <h3 class="title">{{ lectureData.title }}</h3>
    <p class="content">الوقت: {{ compTime() }}</p>
    <p class="content">القاعة: {{ lectureData.location }}</p>
    <p class="content">النوع: {{ lectureData.classType }}</p>
    <p class="content">المحاضر: {{ lectureData.instructor }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  lectureData: {
    type: Object,
    required: true
  }
})
function compTime() {
  if (props.lectureData.startHour > '12') {
    return (
      props.lectureData.startHour -
      12 +
      ':' +
      props.lectureData.startMin +
      'م-' +
      (props.lectureData.endHour - 12) +
      ':' +
      props.lectureData.endMin +
      'م'
    )
  } else if (props.lectureData.startHour === '12') {
    return (
      props.lectureData.startHour +
      ':' +
      props.lectureData.startMin +
      'م' +
      props.lectureData.endHour +
      ':' +
      props.lectureData.endMin +
      'م'
    )
  } else {
    return (
      props.lectureData.startHour +
      ':' +
      props.lectureData.startMin +
      'ص-' +
      props.lectureData.endHour +
      ':' +
      props.lectureData.endMin +
      'ص'
    )
  }
}
</script>

<style scoped>
.lecture {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.title {
  margin: 0;
  font-size: 1.2rem;
  text-align: center;
}
.content {
  color: #666;
  margin: 5px 0;
}
</style>
