<template>
<div class="sideleft">
  <router-link to="/index/user">用户管理</router-link>
</div>
</template>

<script>
export default {
  name: "SideBar",
}
</script>

<style scoped>
.sideleft{
  width: 12%;
  height: 90%;
  background-color: silver;
  float: left;
}
</style>