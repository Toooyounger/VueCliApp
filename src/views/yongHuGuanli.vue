<template>
<div>
  <div >
    <div class="lab">用户名称</div>
    <el-input class="myInput" v-model="input"  prefix-icon="el-icon-user" placeholder="Please input" />
    <div class="lab2">电话号码</div>
    <el-input class="myInput2" v-model="input" placeholder="Please input" />
    <div class="lab3">状态</div>
    <el-input class="myInput3" v-model="input" placeholder="Please input" />

    <div class="next">
      <el-button type="primary" :icon="Search">Search</el-button>
      <el-button type="primary">
        Upload<el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>

    </div>

    <div class="next">
      <el-button type="primary" :icon="User" plain  :disabled="!hasPerms('sys:user:view')">新增</el-button>
      <el-button type="success" :icon="Search" plain>修改</el-button>
      <el-button type="warning" :icon="Search" plain>删除</el-button>
      <el-button type="danger" :icon="Search" plain>导出</el-button>
    </div>

    <div id="tab">
      <el-table :data="tableData" style="width: 100%" >
        <el-table-column type="selection" width="50"  align="center"/>
        <el-table-column prop="num" label="角色编号" width="150" align="center" />
        <el-table-column prop="role" label="角色名称" width="150" align="center"/>
        <el-table-column prop="roleString" label="权限字符" width="150" align="center" />
        <el-table-column prop="showLine" label="显示顺序" width="150" align="center"/>
        <el-table-column prop="state" label="状态" width="150" align="center"/>
        <el-table-column prop="date" label="创建时间" width="180" />
        <el-table-column prop="action" label="操作"  />
      </el-table>
    </div>

  </div>

</div>
</template>

<script setup>
import { Search, Upload ,User} from '@element-plus/icons-vue'
const tableData = [
  {
    num: '1',
    role: '超级管理员',
    roleString: 'admin',
    showLine:'1',
    state:'true',
    date: '2022-05-18 13:42:09',
    action:''
  },
  {
    num: '2',
    role: '普通角色',
    roleString: 'common',
    showLine:'2',
    state:'true',
    date: '2022-05-18 13:42:09',
    action:''
  },

]
</script>
<script >

import {hasPermission} from "@/permissions";

export default {
  name: "yongHuGuanli",
  components:{
  },
  data(){
    return{
      input:'',
      aaa:'Avatar'
    }
  },
  methods:{
    hasPerms: function (perms) {
      // 根据权限标识和外部指示状态进行权限判断
      return hasPermission(perms)
    },
  }
}
</script>

<style scoped>
.next{
  margin-left: 1%;
  margin-top: 2%;
}
.lab{
  margin-left: 1%;
  margin-top: 2%;
  height: 32px;
  line-height: 32px;
  font-weight: bolder;
  color: rgb(96,98,102);
  display: inline-block;
}
.lab2{
  margin-left: 22%;
  margin-top: 2%;
  height: 32px;
  line-height: 32px;
  font-weight: bolder;
  color: rgb(96,98,102);
  display: inline-block;
}
.lab3{
  margin-left: 22%;
  margin-top: 2%;
  height: 32px;
  line-height: 32px;
  font-weight: bolder;
  color: rgb(96,98,102);
  display: inline-block;
}
.myInput3{
  float: left;
  position: absolute;
  width: 20%;
  margin-top: 2%;
  margin-left: 1%;
}
.myInput2{
  float: left;
  position: absolute;
  width: 20%;
  margin-top: 2%;
  margin-left: 1%;
}
.myInput{
  float: left;
  position: absolute;
  width: 20%;
  margin-top: 2%;
  margin-left: 1%;
}
</style>