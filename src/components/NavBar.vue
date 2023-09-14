<template>
  <nav>
    <ul >
      <li><router-link to="/">الرئيسية</router-link></li>
      <li><router-link to="/schedules">الجداول</router-link></li>
      <li><router-link to="/profile">الملف الشخصي</router-link></li>
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
  display: flex;
  justify-content: flex-start;
}

li {
  margin: 10px;
  padding: 20px;
  text-decoration: none ;
}

a {
  text-decoration: none;
  color: white; 
}

.router-link-active {
  font-weight: bold;
  background: crimson;
  border-radius: 10px;
  padding: 15px;
}
</style>



