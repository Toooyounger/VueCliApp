<template>
  <div>
    <el-table :data="doctorMsg" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="hospital_id" label="医院名称" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="position" label="职业" width="180"></el-table-column>
      <el-table-column prop="skill" label="擅长治疗项目" width="180"></el-table-column>
      <el-table-column prop="seeing" label="问诊量" width="180"></el-table-column>
    </el-table>
    <el-button type="primary" @click="insertForm=true">新增</el-button>
    <el-button type="info">修改</el-button>
    <el-button type="danger">删除</el-button>

    <div>
      <el-dialog title="增加医生" v-model="insertForm">
        <el-form :model="doctorForm">
          <el-form-item label="id:" :label-width="formLabelWidth">
            <el-input v-model="doctorForm.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医院名称:" :label-width="formLabelWidth">
            <el-input v-model="doctorForm.hospital_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名:" :label-width="formLabelWidth">
            <el-input v-model="doctorForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位:" :label-width="formLabelWidth">
            <el-input v-model="doctorForm.position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="擅长的治疗:" :label-width="formLabelWidth">
            <el-input v-model="doctorForm.skill" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="insertDoctor()">保存</el-button>
        <el-button type="danger">清空</el-button>
      </el-dialog>
    </div>

  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'

const insertForm = ref(false);
const formLabelWidth = '140px'
const doctorForm = reactive({
  id: "",
  hospital_id: "",
  name: "",
  position: "",
  skill: "",
})
</script>


<script>
export default {
  name: "DoctorPage",
  data() {
    return {
      doctorMsg: [{
        id: "",
        hospital_id: "",
        name: "",
        position: "",
        skill: "",
        seeing: ""
      }],
    }
  },
  methods: {
    getDoctorAllMsg() {
      this.$api.doctor.getDoctorMsg("doctor/getDoctorMsg")
          .then(res => {
            console.log(res);
            this.doctorMsg = res;
          })
    },
    insertDoctor(){
      this.$api.doctor.insertMsg("doctor/insertMsg",this.doctorForm)
          .then(res=>{
            console.log(res);
          })
    }
  },
  mounted() {
    this.getDoctorAllMsg();
  }
}
</script>


<style scoped>

</style>