<template>
  <nav>
    <ul >
      <li><router-link to="/">الرئيسية</router-link></li>
      <li><router-link to="/schedules">الجداول</router-link></li>
      <li><router-link to="/profile">الملف الشخصي</router-link></li>
      <li><router-link to="/uploadData">رفع ملف</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background-color: #333;
  height: 80px;
  width: 100%;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-inline: 20px;
  height: 100%;
  display: flex;
  align-items: center;
}

a {
  width: 120px;
  display: block;
  text-decoration: none;
  text-align: center;
  color: white;
  padding: 20px 8px;
}

.router-link-active {
  background: crimson;
  border-radius: 10px;
}
</style>



