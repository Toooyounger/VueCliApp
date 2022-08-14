<template>
<div>
  <div class="lab">所属医院编号</div>
  <el-input class="myInput" v-model="program.hospital_id"  placeholder="Please input" />
  <div class="lab">项目名称</div>
  <el-input class="myInput" v-model="program.name" placeholder="Please input" />


  <div class="publish_content">
    <div name="editor" id="editor" ref="editor"></div>
  </div>

  <el-button type="primary" @click="submit">确认提交</el-button>

</div>
</template>

<script>
import EWangEditor from "wangeditor";
import {ElNotification} from "element-plus";
export default {
  name: "editProgram",
  data(){
    return{
      program:{
        hospital_id:'',
        name:'',
        content:''
      },
    }
  },
  mounted() {
    let editor = new EWangEditor("#editor");
    editor.config.onchangeTimeout = 400;
    /* 配置检测字符变化的最短时间间隔，默认为 200ms */

    editor.config.customAlert = (err) => {  //如果检测到错误的话就打印.
      console.log(err);
    };

    editor.customConfig = editor.customConfig ? editor.customConfig : editor.config;

    editor.customConfig.onchange = (html) => {  //参数html即已经转化HTML格式的文本
      this.program.content=html
    };
    editor.config.height = 500;
    editor.create()
  },
  methods:{
    submit(){
      console.log('准备提交');
      console.log(this.program);
      this.$api.setPro.setPro('/newPro',this.program).then(
          ()=>{
            ElNotification.success({
              title: '成功',
              message: '已添加',
              showClose: true,
            })
          }
      )


    }
  }
}
</script>

<style scoped>
.myInput{
  display: inline;
  margin-left: 1%;
}
.lab{
  display: inline;
  margin-left: 1%;
  height: 40px;
  line-height: 40px;
  font-weight: bolder;
  color: rgb(96,98,102);
}
</style>