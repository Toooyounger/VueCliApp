<template>
    <div>
      <br>
      <el-form :model="form" ref="formData" label-width="100px">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文章ID:
      <el-input v-model="currentPic.id" placeholder="文章ID" class="width" v-on:keyup.enter="searchFromId" />
      &nbsp;&nbsp;&nbsp;文章标题:
      <el-input v-model="currentPic.title" placeholder="文章标题" class="width" v-on:keyup.enter="searchFromTitle" />
      <br>
      <br>
      &nbsp;&nbsp;&nbsp;文章类型:
        <el-select v-model="value"  placeholder="文章类型" size="middle" id= "type" v-on:keyup.enter="searchFromType">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      &nbsp;&nbsp;&nbsp;发布时间:
        <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            size="default"
            style="width: 190px"
        />
      &nbsp;&nbsp;&nbsp;<el-button type="primary" @click="searchFromDate">搜索</el-button>
      <el-button @click="cancel">重置</el-button>
      </el-form>
      <br><br><br>
      &nbsp;&nbsp;&nbsp;<el-button type="danger" @click="totaldel">删除</el-button>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="文章ID" width="70" />
        <el-table-column prop="title" label="文章标题" width="350" />
        <el-table-column prop="type" label="文章类型" width="80"/>
        <el-table-column prop="time" label="发布时间" width="180"/>
        <el-table-column prop="img" label="图片路径" />
        <el-table-column fixed="right" label="操作" width="240">
          <template #default="scope">
            <el-button text size="small" @click="handleContent( scope.row)">内容</el-button>
            <el-button size="small" type="primary" @click="handleEdit( scope.row)">编辑</el-button>
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
          v-model="dialogVisible"
          title="Tips"
          width="30%"
          :before-close="handleClose"
      >
        <span>{{content}}</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false"
            >Confirm</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
</template>

<script>
import moment from "moment";
import {reactive, ref} from "vue";

const params = reactive({
  arr: []
})

export default {
  name: "aricleList",
  data(){
    return{
      Data:[],
      tableData : [],
      content:'dsfbfdb',
      dialogVisible:ref(false),
      multipleSelection:[],
      currentPic:{
        id:'',
        title:'',
        type:'',
        time:'',
      },
      value : ref(''),
      value1 : ref(''),
      options : [
        {
          value: '节气养生',
          label: '节气养生',
        },
        {
          value: '自我保健',
          label: '自我保健',
        },
        {
          value: '药膳食疗',
          label: '药膳食疗',
        },
        {
          value: '中药常识',
          label: '中药常识',
        },
        {
          value: '中医文化',
          label: '中医文化',
        },
        {
          value: '儿科健康',
          label: '儿科健康',
        },
      ]
    }
  },
  mounted() {
    this.$api.menu.findNavTree('/aricle/getAricleList')
        .then(res=>{
          console.log("res:",res);
          for(var i=0;i<res.length;i++){
            res[i].time=moment(res[i].time).format("YYYY-MM-DD HH:mm:ss")
          }
          console.log("res1:",res);
          this.Data=res;
          this.tableData=this.Data;
          console.log("请求成功")
          console.log("tableDATA：",this.tableData)

        }).catch(err=>{
      console.log(err);
    })
  },
  methods:{
    searchFromDate(){
      this.value1=moment(this.value1).format("YYYY-MM-DD")
      console.log(this.value1)
      this.tableData=''
      params.arr=[]
      if(this.value1 === ''){
        this.tableData=this.Data
        return
      }else {
        for (var i=0;i<this.Data.length;i++){
          if(this.Data[i].time.includes(this.value1)){
            console.log(this.Data[i])
            params.arr.push(this.Data[i])
          }
        }
      }
      this.tableData=params.arr
    },
    searchFromType(){
      this.tableData=''
      params.arr=[]
      if(this.value === ''){
        this.tableData=this.Data
        return
      }else {
        for (var i=0;i<this.Data.length;i++){
          if(this.Data[i].type===this.value){
            console.log(this.Data[i])
            params.arr.push(this.Data[i])
          }
        }
      }
      this.tableData=params.arr
    },
    searchFromTitle(){
      this.tableData=''
      params.arr=[]
      console.log("Data:",this.Data.type);
      console.log(this.currentPic.title)
      if(this.currentPic.title === ''){
        this.tableData=this.Data
        return
      }else {
        for (var i=0;i<this.Data.length;i++){
          if(this.Data[i].title.includes(this.currentPic.title)){
            console.log(this.Data[i])
            params.arr.push(this.Data[i])
          }
        }
      }
      this.tableData=params.arr
    },
    searchFromId(){
      console.log("Data:",this.Data);
      if(this.currentPic.id === ''){
        console.log("sdfvs")
        this.tableData=this.Data
      }else {
        this.tableData=[this.tableData[this.currentPic.id-1]]
      }
    },
    handleContent(row){
      console.log(row);
      this.dialogVisible=true
      this.$api.aricle.getAricleContent('/aricle/getAricleContent',{'id':row.id})
          .then(res=>{
            console.log(res);
            this.content=res[0].replace(/<.+?>/g, '').replace(/&nbsp;/ig, '');
          }).catch(err=>{
        console.log(err);
      })
    },
    cancel(){
      this.currentPic={id:'', title:'', time:'', type:''}
      this.tableData=this.Data
    },
    handleSelectionChange(val){
      console.log(val);
      this.multipleSelection = val;
    },
    handleEdit(row){
      sessionStorage.setItem("id",row.id);
      this.$router.push("/aricleIssue1");
    },
    totaldel(){
      for(var i=0;i<this.multipleSelection.length;i++){
        console.log(this.multipleSelection[i].id);
        this.tableData.splice(this.multipleSelection[i].id-1-i,1)
        this.$api.aricle.deleteAricle('/aricle/deleteAricle',{'id':this.multipleSelection[i].id})
      }
      this.$router.push("/backView/sys/aricleList");
    },
    handleDelete(index,row){
      console.log(index);
      console.log(row.id);
      console.log("删除")
      this.tableData.splice(index,1)
      this.$api.aricle.deleteAricle('/aricle/deleteAricle',{'id':row.id})
          .then(res=>{
            console.log(res);
          }).catch(err=>{
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
  .width{
    width: 190px;
  }
</style>