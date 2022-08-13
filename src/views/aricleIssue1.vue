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


    <br><br>
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        style="height: 400px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
    />
    <el-button type="primary" @click="updataAricle">确认修改</el-button>
  </div>
</template>



<script>

import {onBeforeUnmount, onMounted, ref, shallowRef} from 'vue'
import {ElNotification} from "element-plus";
import {Editor, Toolbar} from "@wangeditor/editor-for-vue";


export default {
  components: { Editor, Toolbar },
  name: "aricleIssue",
  setup() {
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('<p>hello</p>')

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      setTimeout(() => {
        valueHtml.value = sessionStorage.getItem("content")
      }, 1500)
    })

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
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
    };
  },
  data(){
    return{
      title:'',
    }
  },
  methods:{
    updataAricle(){
      let id =  document.getElementById('ID').value;
      let title =  document.getElementById('title').value;
      let type =  document.getElementById('type').value;
      const content =  this.valueHtml;
      console.log(id);
      console.log(content);
      console.log(type);
      console.log(title)
      this.$api.aricle.newAricle('/aricle/updataAricle',{'id':id,'title':title,'type':type,'content':content})
          .then(res=>{
            console.log(res);
            console.log("请求成功")
            ElNotification.success({
              title: '系统提示',
              message: '修改成功成功',
              showClose: false,
            })
          }).catch(err=>{
        console.log(err);
      })
    }
  },
  mounted() {
    let id=sessionStorage.getItem("id");
    console.log(id);
    this.$api.aricle.getAricleContent('/aricle/getAricleContent',{'id':id})
        .then(res=>{
          console.log(res[0]);
          sessionStorage.setItem("content",res[0]);
        }).catch(err=>{
      console.log(err);
    })
  }
}
</script>

<style scoped>
.width{
  width: 200px;
}
</style>