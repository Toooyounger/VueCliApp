<template>
  <div id="item" :style="{backgroundColor:color}">
    <div>
      <div>{{name}}</div>
      <div id="text">{{job}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "membersItem",
  props:{
    name:String,
    job:String,
    color:String,
    boxColor:String
  }
}
</script>

<style scoped>
#item{
  background-color: #409EFF;
  margin-left: 6%;
  margin-top: 2%;
  height: 70px;
  width: 10%;
  border-radius: 10px;
  color: white;
  text-align: right;
  padding-right: 20px;
  padding-top: 10px;
  font-size: 20px;
  box-shadow: 5px 5px 15px  rgb(103,106,108);
  display: inline-block;
  transition: 0.35s ;
  cursor: pointer;
}
#item:hover{
  transform: scale(110%);
}
#text{
  margin-top: 8px;
}
</style>