<template>
  <div>
    <el-table :data="doctorMsg" style="width: 100%" border="true" @select="handleSelect" id="mainForm">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column prop="doctorId" label="ID" width="180" align="center"></el-table-column>
      <el-table-column prop="doctor_hospital.hospital_name" label="医院名称" width="180" align="center"></el-table-column>
      <el-table-column prop="doctorName" label="姓名" width="180" align="center"></el-table-column>
      <el-table-column prop="position" label="职业" width="180" align="center"></el-table-column>
      <el-table-column prop="skill" label="擅长治疗项目" width="180" align="center"></el-table-column>
      <el-table-column prop="seeing" label="问诊量" width="180" align="center"></el-table-column>
    </el-table>
    <el-button type="primary" @click="insertForm=true" class="outButton">新增</el-button>
    <el-button type="info" @click="updateForm=true" class="outButton">修改</el-button>
    <el-button type="danger" @click="deleteDoctor()" class="outButton">删除</el-button>

    <div class="FormModel">
      <el-dialog title="增加医生" v-model="insertForm" width="430px">
        <el-form :model="insertDoctorForm" label-position="top">
          <el-form-item label="id:" :label-width="formLabelWidth">
            <el-input v-model="insertDoctorForm.doctorId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医院名称:" :label-width="formLabelWidth">
            <el-input v-model="insertDoctorForm.hospitalId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名:" :label-width="formLabelWidth">
            <el-input v-model="insertDoctorForm.doctorName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位:" :label-width="formLabelWidth">
            <el-input v-model="insertDoctorForm.position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="治疗项目:" :label-width="formLabelWidth">
            <el-input v-model="insertDoctorForm.skill" autocomplete="off"></el-input>
          </el-form-item>
          <el-upload
              v-model:file-list="fileList"
              class="PicButton"
              action="http://localhost:8090/doctor/uploadAvatar"
              list-type="picture"
              :headers="myHeaders"
          >
            <el-button type="primary">上传头像</el-button>
            <template #tip>
              <div class="el-upload__tip">
                图片大小不能大于500kb
              </div>
            </template>
          </el-upload>

        </el-form>
        <el-button type="primary" @click="insertDoctor()" class="insideButton">保存</el-button>
        <el-button type="danger" @click="insertForm=false" class="insideButton">取消</el-button>
      </el-dialog>
    </div>

    <div class="FormModel">
      <el-dialog title="修改信息" v-model="updateForm" width="430px">
        <el-form :model="updateMsg" label-position="top">
          <el-form-item label="id:" :label-width="formLabelWidth">
            <el-input v-model="updateMsg.doctorId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医院名称:" :label-width="formLabelWidth">
            <el-input v-model="updateMsg.doctor_hospital.hospital_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名:" :label-width="formLabelWidth">
            <el-input v-model="updateMsg.doctorName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位:" :label-width="formLabelWidth">
            <el-input v-model="updateMsg.position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="治疗项目:" :label-width="formLabelWidth">
            <el-input v-model="updateMsg.skill" autocomplete="off"></el-input>
          </el-form-item>
          <el-upload
              v-model:file-list="fileList"
              class="PicButton"
              action="http://localhost:8090/doctor/uploadAvatar"
              list-type="picture"
              :headers="myHeaders"
          >
            <el-button type="primary">上传头像</el-button>
            <template #tip>
              <div class="el-upload__tip">
                图片大小不能大于500kb
              </div>
            </template>
          </el-upload>

        </el-form>
        <el-button type="primary" @click="updateDoctor()" class="insideButton">保存</el-button>
        <el-button type="danger" @click="updateForm=false" class="insideButton">取消</el-button>
      </el-dialog>
    </div>

  </div>
</template>

<script setup>

</script>


<script>
import {reactive, ref} from 'vue'

var token = sessionStorage.getItem("token");

export default {
  name: "DoctorPage",
  data() {
    return {
      doctorMsg: [{
        id: "",
        hospital_id: "",
        avatar:"",
        name: "",
        position: "",
        skill: "",
        seeing: "",
        doctor_hospital:{hospital_name:""},
      }],
      header: {token: sessionStorage.getItem("token")},
      myHeaders: {Authorization: token},
      obj:{
        selectId:""
      },
      updateMsg: {
        doctorId: "",
        hospitalId:"",
        doctorName: "",
        position: "",
        skill: "",
        selectId:"",
        doctor_hospital:{hospital_name:""}
      }
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
    insertDoctor() {
      console.log(this.insertDoctorForm);
      this.$api.doctor.insertMsg("doctor/insertMsg", this.insertDoctorForm)
          .then(res => {
           this.doctorMsg.push(this.insertDoctorForm)
            console.log(res);
          })
    },
    handleSelect(selection, row) {
      this.obj.selectId = row.doctorId;
      console.log(row.doctorId);

      this.updateMsg = row;
      this.updateMsg.selectId=row.doctorId;
      this.updateMsg.hospitalId = row.doctor_hospital.hospital_name;
      console.log("选择后updateMsg中的数据："+this.updateMsg);
      // this.stateArr.push.apply(selection.id);
      // console.log("stateArr的数据："+this.stateArr);
    },
    deleteDoctor() {
      console.log(this.obj.selectId);
      this.$api.doctor.deleteDoctor("doctor/deleteMsg", this.obj)
          .then(res => {
            console.log(res);
          })
    },
    updateDoctor() {
      console.log("修改后updateMsg中的数据：",this.updateMsg);
      this.$api.doctor.updateDoctor("doctor/updateMsg",this.updateMsg)
      .then(res=>{
        console.log(res);
      })
    }
  },
  mounted() {
    this.getDoctorAllMsg();
  },
  setup() {
    const insertForm = ref(false);
    const updateForm = ref(false);
    const formLabelWidth = '140px';
    const insertDoctorForm = reactive({
      doctorId: "",
      hospitalId: "",
      doctorName: "",
      position: "",
      skill: "",
    });
    const fileList = ref([]);

    return {
      insertForm,
      updateForm,
      formLabelWidth,
      insertDoctorForm,
      fileList,
    }
  }
}
</script>


<style scoped>
#mainForm {
  margin-left: 20px;
  margin-top: 10px;
}

.outButton {
  margin-top: 10px;
  margin-left: 50px;
}

.insideButton {
  margin-top: 5px;
  margin-left: 75px;
}

.PicButton{
}

.FormModel{
  width: 150px;
}
</style>