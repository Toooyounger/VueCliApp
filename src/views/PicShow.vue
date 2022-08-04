<template>
<div>
  <div id="title">
    轮播图展示
  </div>
  <div id="Pic-div" >
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in movies" :key="item.Title" >
        <img :src="item.url" alt="" srcset="" height="200" >
      </el-carousel-item>
    </el-carousel>
  </div>
    <div id="title">
      轮播图信息管理
      <div class="next">
        <el-button type="primary" :icon="Plus" plain  @click="dialogFormVisible = true" @mouseenter="clear()">新增</el-button>
        <el-button type="danger" :icon="Bottom" plain @click="info">导出</el-button>
      </div>
    </div>
  <div id="tab">
    <el-table  ref="multipleTableRef" :data="movies"  style="width: 100%" >
      <el-table-column prop="id" label="图片编号" width="80" align="center" />
      <el-table-column prop="title" label="图片标题" width="250" align="center"/>
      <el-table-column prop="describe" label="图片副标题" width="250" align="center" />
      <el-table-column prop="url" label="地址"  align="center"/>
      <el-table-column label="操作" width="250" align="center">
        <template #default="scope">
          <el-button size="mini" type="primary" @click="newPic" @mouseenter="changePic(scope.$index)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delPic(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div id="dialog-div">
    <el-dialog  v-model="dialogFormVisible"  :title="digTitle" width="430px">
      <el-form :model="currentPic" >
        <el-form-item   label="图片编号" label-width="100px">
          <el-input  v-model="currentPic.id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="图片标题" label-width="100px">
          <el-input  v-model="currentPic.title"  autocomplete="off" />
        </el-form-item>
        <el-form-item label="图片副标题" label-width="100px">
          <el-input v-model="currentPic.subtitle"  autocomplete="off" />
        </el-form-item>
        <el-form-item label="" label-width="100px">
          <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              action="http://localhost:8090/uploadPic"
              multiple
              :limit="3"
              :headers="myHeaders"
          >
            <el-button type="primary">上传图片</el-button>
            <template #tip>
              <div class="el-upload__tip">
                图片大小请不要超过500KB
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submit"
        >确认</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>


</div>
</template>

<script  setup>
import { Plus,Bottom} from '@element-plus/icons-vue'
import  { ElTable } from 'element-plus'



</script>

<script >
import {ElNotification} from "element-plus";
var token = sessionStorage.getItem("token");
export default {
  name: "PicShow",
  mounted() {
    this.$api.Carousel.getCarousel('/getCarousel').then(res=>{
      console.log(res);
      this.movies=res;
    });
  },
  data(){
    return{
      loginForm:{
        username:'sas',
        password:'12123',
      },
      dialogFormVisible:false,
      myHeaders:{Authorization:token},
      uploadPic:null,
      serverUrl: 'http://localhost:8090/uploadPic',
      header: {token: sessionStorage.getItem("token")},
      digTitle:'',
      movies:[],
      currentPic:{
        id:'',
        url:'',
        subtitle:'',
        title:'',
      }
    }
  },
  methods:{
    delPic(index){
      this.$api.Carousel.delPic('/delPic',this.movies[index])
          .then(()=>{
            this.movies.splice(index,1);
            ElNotification.success({
              title: '系统提示',
              message: '成功删除图片',
              showClose: true,
            })
          });
    },
    info(){
      ElNotification.success({
        title: 'Info',
        message: 'This is a message',
        showClose: true,
      })
    },
    changePic(index){
      this.currentPic=this.movies[index];
      this.digTitle='修改轮播图'
    },
    newPic(){
      this.dialogFormVisible=true;
    },
    clear(){
      this.currentPic={id:'', Title:'',subtitle:'', url:''}
      this.digTitle="新增轮播图"
    },
    submit(){

      if(this.digTitle=='修改轮播图'){
        this.$api.Carousel.updataPic('/updataPic',this.currentPic).then(()=>{
          ElNotification.success({
            title: '系统提示',
            message: '已更新',
            showClose: true,
          })
          this.dialogFormVisible=false;
        })
      }else {
        if (this.currentPic.title==null||this.currentPic.id==null||this.currentPic.subtitle==null){
          ElNotification.warning({
            title: '警告',
            message: '请补全信息',
            showClose: true,
          })
          return
        }
        this.dialogFormVisible=false;
        this.$api.Carousel.newPic('/newPic',this.currentPic).then((res)=>{
          console.log(res);
          ElNotification.success({
            title: '成功',
            message: '已成功添加新的轮播图',
            showClose: true,
          })
        });
      }


    }
  }
}
</script>

<style scoped>
#tab{
  margin-left: 1%;
}
.next{
  margin-top: 1%;
  display: inline-block;
  margin-left: 5%;
}
 #title{
   margin-top: 1%;
   margin-left: 2%;
   font-size: 22px;
   color: rgb(103,106,108);
 }
 .el-carousel__item h3 {
   color: #475669;
   opacity: 0.75;
   line-height: 200px;
   margin: 0;
   text-align: center;
 }

 .el-carousel__item:nth-child(2n) {
   background-color: #99a9bf;
 }

 .el-carousel__item:nth-child(2n + 1) {
   background-color: #d3dce6;
 }
 #Pic-div{
   margin-left: 10%;
   margin-right: 10%;
   margin-top: 1%;
 }
.el-button--text {
  margin-right: 15px;
}
.el-input {
  width: 250px;
}
#dialog-div{
  width: 150px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.el-upload__tip{
  color: red;
}

</style>