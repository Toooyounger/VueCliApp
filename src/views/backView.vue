<template>
    <el-scrollbar id="left_bar">
      <div id="left_div">
        <div id="left_title">
          <font-awesome-icon icon="fa-solid fa-award" />
          后台管理系统
        </div>
        <div id="shouYe"   @click="itemCli">
          <div id="content">
            <router-link to="/backView/shouYe" id="first">
              <el-icon>
                <component :is="Apple"></component>
              </el-icon>
              &nbsp;
              首页
            </router-link>
          </div>
        </div>
        <menu-item :msg="item.name" :host-icon="item.icon" v-for="item in getMenu" :key="item.id" >
          <sub-item :msg="subItem.name" :icon="subItem.icon" :path="'/backView'+subItem.url" v-for="(subItem) in item.children" :key="subItem.id" class="animation" @click="itemCli"></sub-item>
        </menu-item>
      </div>
    </el-scrollbar>



  <RightHeader class="right-head"></RightHeader>
  <router-view id="right_content"></router-view>
</template>

<script setup>
import {Apple} from '@element-plus/icons-vue'
</script>

<script>
import MenuItem from "@/views/MenuItem";
import SubItem from "@/views/SubItem";
import RightHeader from "@/views/RightHeader";

export default {
  emits:['menuCli'],
  name: "backView",
  components:{
    MenuItem,
    SubItem,
    RightHeader,

  },
  computed:{
    getMenu(){
      let leftMenu = this.$store.getters.getNavTree;
      return leftMenu;
    }
  },
  data(){
    return{
        show:false,
        show2:false,
        oldItem:null,
        oldMenu:null,
        display:{
          animation:true,
        },
        showIcon:'fa-solid fa-angle-down',
        showIcon2:'fa-solid fa-angle-down'
    }
  },
  methods:{

      itemCli(e){
      if (this.oldItem!=null){
        this.oldItem.style.color='rgb(191,191,191)'
        this.oldItem.style.border='0'
      }
      e.target.style.color='rgb(60,145,233)';
      e.target.style.borderRight='8px solid rgb(60,129,183)'
      this.oldItem=e.target;
    },
    f1(){
      this.show=!this.show;
      console.log(this.show);
      if (this.showIcon=="fa-solid fa-angle-down"){
        this.showIcon="fa-solid fa-chevron-up"
      }else {
        this.showIcon='fa-solid fa-angle-down'
      }
    },
    f2(){
      this.show2=!this.show2;
      console.log(this.show)
      if (this.showIcon2=="fa-solid fa-angle-down"){
        this.showIcon2="fa-solid fa-chevron-up"
      }else {
        this.showIcon2='fa-solid fa-angle-down'
      }
    }
  }
}

</script>

<style scoped>

  #left_div{
    height: 100%;
    width: 100%;
    background-color: rgb(48,65,86);
  }
  #left_bar{
    width: 13%;
    height: 721px;
    background-color: rgb(48,65,86);
  }
  #first{
    text-decoration-line: none;
    color: rgb(191,191,191);
    display: block;
  }
  .right-head{
    position: absolute;
    top: 0;
    left: 13%;
  }
  #left_title{
    height: 60px;
    width: 100%;
    background-color: cadetblue;
    text-align: center;
    line-height: 60px;
    font-size: 14px;
    font-weight:bolder;
    color: white;
    cursor: pointer;
  }
  #shouYe{
    height: 60px;
    width: 100%;
    line-height: 60px;
    font-size: 14px;
    color: rgb(191,191,191);
    cursor: pointer;
  }
  #content{
    float: left;
    margin-left: 10%;
    width: 90%;
  }
  #shouYe:hover{
    background-color: rgb(45,61,81);
  }
  @keyframes show {
    0%{
      transform: translateX(-100%);
      opacity: 0;
    }
    70%{
      opacity: 0.7;
    }
    100%{
      opacity: 1;
      transform: translateX(0);
    }
  }
  .animation{
    animation: show .5s ease;
  }
  #right_content{
    position: absolute;
    top: 50px;
    left: 13%;
    height: 90%;
    width: 87%;
  }

</style>