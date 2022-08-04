<template>
<div>
  <div id="title">
      欢迎来到第八组后台管理系统
  </div>
  <div id="content">
    这是一个致力于带来便利的系统。
  </div>
  <div id="title">
    关于我们
  </div>
  <members :name="item.name"  :job="item.job" :color="item.color" v-for="item in our" :key="item.id"></members>
</div>
</template>

<script>
import members from "@/views/members";
export default {
  name: "shouYe",
  components:{
    members
  },
  data(){
    return{
      our:[
        {id:0, name:'李伟',job:'技术支持',color:'rgb(242,115,150)'},
        {id:1, name:'黄尚政',job:'项目经理',color:'#409EFF'},
        {id:2, name:'蒋龙标',job:'项目负责人',color: '#67C23A'},
        {id:3, name:'龙飞廉',job:'项目负责人',color: '#E6A23C'},
        {id:4, name:'王云峰',job:'项目负责人',color: '#F56C6C'},
        {id:5, name:'陶泽康',job:'项目负责人',color: '#c45656'},
        {id:6, name:'庞家恩',job:'项目负责人',color: '#909399'},
        {id:7, name:'朱世贤',job:'项目负责人',color: '#a0cfff'},
        {id:8, name:'黄竟朗',job:'项目负责人',color: 'rgb(63,81,181)'},
        {id:9, name:'陆洋',job:'项目负责人',color: 'rgb(66,185,131)'},
        {id:10, name:'郑佳朋',job:'项目负责人',color: '#B1C7A1FF'},
        {id:11, name:'黄俊',job:'前端工程师',color: '#E1DD4DFF'},
      ]
    }
  }
}
</script>

<style scoped>

#title{
  margin-top: 2%;
  margin-left: 2%;
  font-size: 25px;
  color: rgb(103,106,108);
}
#content{
  color: rgb(103,106,108);
  margin-top: 2%;
  margin-left: 2%;
}

</style>