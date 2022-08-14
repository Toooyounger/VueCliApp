<template>

  <div>

   <div class="lab">项目名称：</div>
   <el-input class="myInput" v-model="input"  prefix-icon="el-icon-user" placeholder="项目名称" />
   <div class="lab2">所属医院：</div>
   <el-input class="myInput2" v-model="input" placeholder="所属医院" />
   <div class="next">
     <el-button type="primary" :icon="Search">Search</el-button>


   </div>
      <div id="tab">
        <el-table :data="ProgramData" style="width: 100%" @select="getItem">
          <el-table-column type="selection" width="50"  align="center"/>
          <el-table-column prop="id" label="项目编号" width="150" align="center"/>
          <el-table-column prop="name" label="项目名称" width="150" align="center"/>
          <el-table-column prop="hospital_id" label="所属医院" width="150" align="center" />
          <el-table-column prop="content" label="项目内容" width="150" align="center"/>
          <el-table-column prop="views" label="项目浏览量" width="150" align="center"/>
          <el-table-column label="操作" width="250" align="center">
            <template #default="scope">
              <el-button size="mini" type="primary" @click="delPic(scope.$index)">详情</el-button>
              <el-button size="mini" type="primary" @click="newPic" @mouseenter="changePic(scope.$index)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deletePro">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>


  </div>




</template>
<script >

import {hasPermission} from "@/permissions";

export default {
  name: "KaiZhanXiangMu",
  components:{
  },
  data(){
    return{
      input:'',
      aaa:'Avatar',
      ProgramData:[],
      current:null,
    }
  },
  mounted(){
    this.$api.program.getPro("/GetAllPro").then(
        res=>{
          console.log(res);
          this.ProgramData=res;
        }
    )
  },
  methods:{
    hasPerms: function (perms) {
      // 根据权限标识和外部指示状态进行权限判断
      return hasPermission(perms)
    },
    getItem(selection,row){
      this.current=row;
    },
    deletePro(){
      console.log(this.current.id);
      this.$api.program.deletePro('/deletePro',this.current).then(
          res=>{
            this.ProgramData=res;
          }
      )

    }
    // deletePro(){
    //   this.$api.program.deletePro('/deletePro',ProgramData.id)
    //       .then(=>{
    //           console.log(ProgramData.id);
    //
    //
    //         }
    //       )
    //
    // }
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