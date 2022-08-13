<template>
    <div>
      <br>
      &nbsp;&nbsp;&nbsp;文章ID:
      <el-input v-model="id" placeholder="文章ID" class="width" id= "ID"/>
      &nbsp;&nbsp;&nbsp;文章标题:
      <el-input v-model="input" placeholder="文章标题" class="width" id= "title"/>
      &nbsp;&nbsp;&nbsp;<el-select v-model="value" class="m-2" placeholder="文章类型" size="large" id= "type">
       <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>

      <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          action="http://47.95.223.172:8080/upload"
          multiple
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="3"
          :on-exceed="handleExceed"
          :headers="myHeaders"
          style="float:right;margin-right: 10%;"
      >
        <el-button type="primary">上传图片</el-button>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500KB.
          </div>
        </template>
      </el-upload>

      <br><br>
      <MyEdite ref="headerChild"></MyEdite>
      <el-button type="primary" @click="newAricle">确认提交</el-button>
    </div>
</template>



<script>
import MyEdite from "@/views/MyEdite";

import {  ref } from 'vue'
import {ElNotification} from "element-plus";

var token =  sessionStorage.getItem("token")

export default {
  name: "aricleIssue",
  data () {
    return {
      myHeaders: {Authorization: token}
    }
  },
  setup() {
    return {
      id: ref(''),
      input: ref(''),
      value : ref(''),
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
  components:{
    MyEdite
  },
  methods:{
    newAricle(){
      let id =  document.getElementById('ID').value;
      let title =  document.getElementById('title').value;
      let type =  document.getElementById('type').value;
      const content =  this.$refs.headerChild.valueHtml;
      console.log(id);
      console.log(content);
      console.log(type);
      console.log(title)
      this.$api.aricle.newAricle('/aricle/newAricle',{'id':id,'title':title,'type':type,'content':content})
          .then(res=>{
            console.log(res);
            console.log("请求成功")
            ElNotification.success({
              title: '系统提示',
              message: '提交成功',
              showClose: false,
            })
          }).catch(err=>{
            console.log(err);
          })
    }
  }
}
</script>

<style scoped>
.width{
  width: 200px;
}
</style>