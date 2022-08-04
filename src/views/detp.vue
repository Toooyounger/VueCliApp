<template>
<div>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>
  <my-icons name="CopyDocument">

  </my-icons>
</div>
</template>

<script>
import myIcons from "@/views/myIcons";
export default {
  name: "detpPag",
  components:{
    myIcons
  }
}
</script>

<style scoped>

</style>