<template>
  <div>
    <el-table :data="HospitalMsg" style="width: 100%" border="true" @select="handleSelect" id="mainForm">
      <el-table-column prop="id" width="50" label="id" align="center"></el-table-column>
      <el-table-column prop="name" label="医院名称" width="100" align="center"></el-table-column>
      <el-table-column prop="address" label="地址" width="180" align="center"></el-table-column>
      <el-table-column prop="phone" label="医院电话" width="120" align="center"></el-table-column>
      <el-table-column prop="synopsis" label="医院简介" width="180" align="center"></el-table-column>
      <el-table-column prop="score" label="医院评分" width="100" align="center"></el-table-column>
      <el-table-column prop="likeNum" label="点赞数" width="100" align="center"></el-table-column>
      <el-table-column prop="image" label="图片url" width="180" align="center"></el-table-column>
      <el-table-column prop="remaing" label="医院预约名额剩余量"  align="center"></el-table-column>
    </el-table>
    <el-button type="primary" @click="insertForm=true" class="outButton">新增</el-button>
    <el-button type="info" @click="updateForm=true" class="outButton">修改</el-button>
    <el-button type="danger" @click="deleteHospital()" class="outButton">删除</el-button>

    <div>
      <el-dialog title="增加医院" v-model="insertForm">
        <el-form :model="insertHospitalForm">
          <el-form-item label="id:" :label-width="formLabelWidth">
            <el-input v-model="insertHospitalForm.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医院名称:" :label-width="formLabelWidth">
            <el-input v-model="insertHospitalForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址:" :label-width="formLabelWidth">
            <el-input v-model="insertHospitalForm.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医院电话" :label-width="formLabelWidth">
            <el-input v-model="insertHospitalForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医院简介" :label-width="formLabelWidth">
            <el-input v-model="insertHospitalForm.synopsis" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医院评分" :label-width="formLabelWidth">
            <el-input v-model="insertHospitalForm.score" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医院点赞数" :label-width="formLabelWidth">
            <el-input v-model="insertHospitalForm.likeNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医院的图片" :label-width="formLabelWidth">
            <el-input v-model="insertHospitalForm.imge" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="预约名额剩余量" :label-width="formLabelWidth">
            <el-input v-model="insertHospitalForm.remaing" autocomplete="off"></el-input>
          </el-form-item>
          <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              action="http://localhost:8090/hospital/uploadAvatar"
              list-type="picture"
              :headers="myHeaders"
          >
            <el-button type="primary">上传图片</el-button>
            <template #tip>
              <div class="el-upload__tip">
                图片大小不能大于500kb
              </div>
            </template>
          </el-upload>

        </el-form>
        <el-button type="primary" @click="insertHospital()" class="insideButton">保存</el-button>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="修改信息" v-model="updateForm">
        <el-form :model="updateMsg">
          <el-form-item label="id:" :label-width="formLabelWidth">
            <el-input v-model="updateMsg.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医院名称:" :label-width="formLabelWidth">
            <el-input v-model="updateMsg.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址:" :label-width="formLabelWidth">
            <el-input v-model="updateMsg.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医院电话:" :label-width="formLabelWidth">
            <el-input v-model="updateMsg.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医院简介:" :label-width="formLabelWidth">
            <el-input v-model="updateMsg.synopsis" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医院评分:" :label-width="formLabelWidth">
            <el-input v-model="updateMsg.score" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医院点赞数:" :label-width="formLabelWidth">
            <el-input v-model="updateMsg.likeNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医院图片:" :label-width="formLabelWidth">
            <el-input v-model="updateMsg.imge" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="预约名额剩余量:" :label-width="formLabelWidth">
            <el-input v-model="updateMsg.remaing" autocomplete="off"></el-input>
          </el-form-item>

          <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              action="http://localhost:8090/hospital/uploadAvatar"
              list-type="picture"
              :headers="myHeaders"
          >
            <el-button type="primary">上传图片</el-button>
            <template #tip>
              <div class="el-upload__tip">
                图片大小不能大于500kb
              </div>
            </template>
          </el-upload>

        </el-form>
        <el-button type="primary" @click="updateHospital()" class="insideButton">保存</el-button>
      </el-dialog>
    </div>

  </div>
</template>


<script>
import {reactive, ref} from 'vue'

const token = sessionStorage.getItem("token");

export default {
  name: "HospitalPage",
  data() {
    return {
      HospitalMsg: [{
        id: "",
        name: "",
        address:"",
        phone: "",
        synopsis: "",
        score: "",
        likeNum: "",
        image:"",
        remaing:"",
      }],
      header: {token: sessionStorage.getItem("token")},
      myHeaders: {Authorization: token},
      obj:{
        id:""
      },
      updateMsg: {
        id: "",
        name: "",
        address:"",
        phone: "",
        synopsis: "",
        score: "",
        likeNum: "",
        image:"",
        remaing:"",
      }
    }
  },
  methods: {
    getHospitalAllMsg() {
      this.$api.hospital.getHospitalList('/hospital/getHospitalList');
       this.$api.hospital.getHospitalList("/hospital/getHospitalList")
           .then(res => {
             console.log(res);
             this.HospitalMsg = res;
           })
    },
    insertHospital() {
      console.log(this.insertHospitalForm);
      this.$api.hospital.insertMsg("Hospital/insertMsg", this.insertHospitalForm)
          .then(res => {
            this.HospitalMsg.push(this.insertHospitalForm)
            console.log(res);
          })
    },
    handleSelect(selection, row) {
      this.obj.id = row.id;
      console.log(row.id);

      this.updateMsg = row;
      this.updateMsg.id=row.id;
      this.updateMsg.id = row.doctor_hospital.doctor_name;
      console.log("选择后updateMsg中的数据："+this.updateMsg);
    },
     deleteHospital() {
       console.log(this.obj.id);
       this.$api.hospital.deleteHospital("Hospital/deleteMsg", this.obj)
           .then(res => {
             console.log(res);
       })
     },
    updateHospital() {
      console.log("修改后HospitalMsg中的数据：",this.updateMsg);
      this.$api.hospital.updateHospital("Hospital/HospitalMsg",this.updateMsg)
          .then(res=>{
            console.log(res);
          })
    }
  },
  mounted() {
    this.getHospitalAllMsg();
  },
  setup() {
    const insertForm = ref(false);
    const updateForm = ref(false);
    const formLabelWidth = '140px';
    const insertHospitalForm = reactive({
      id: "",
      name:"",
      phone:"",
      address:"",
      synopsis:"",
    });
    const fileList = ref([]);

    return {
      insertForm,
      updateForm,
      formLabelWidth,
      insertHospitalForm,
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
  margin-left: 30px;
}
</style>