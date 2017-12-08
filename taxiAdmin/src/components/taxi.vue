<template>
  <div class="taxi_wrap">
    <p class="taxi_title">司機註冊</p>
    <el-form :model="ruleForm" :rules="rules" label="center" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="電話號碼" prop="phone">
            <el-input v-model.number="ruleForm.phone" type="number"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="realname">
            <el-input v-model="ruleForm.realname"></el-input>
          </el-form-item>
          <el-form-item label="司機證號" prop="driverno">
            <el-input v-model="ruleForm.driverno" ></el-input>
          </el-form-item>
          <el-form-item label="預付卡號" prop="cardno">
            <el-input v-model="ruleForm.cardno"></el-input>
          </el-form-item>
          <el-form-item label="身份證" prop="zfno">
            <el-input v-model="ruleForm.zfno"></el-input>
          </el-form-item>
          <el-form-item :label='身份證'  class="licence-word">
              <span class="img-position">
                <img ref="imgfileOne" :src="ruleForm.img" width="70">
              </span>
              <el-button onclick="licence.click()">上傳身份證照片</el-button>
                      <input type="file" accept="image/png,image/jpg" id="licence" v-on:change="ImageOneChange($event)" style="display: none" :disabled="disabledcompanyW">
            </el-form-item>
          <el-form-item :label='的士證'  class="licence-word">
              <span class="img-position">
                <img ref="imgfileTwo" :src="ruleForm.imgtwo" width="70">
              </span>
              <el-button onclick="licencetwo.click()">上傳的士證照片</el-button>
                      <input type="file" accept="image/png,image/jpg" id="licencetwo" v-on:change="ImageTwoChange($event)" style="display: none" :disabled="disabledcompanyW">
            </el-form-item>
            <el-form-item :label='駕駛證副本'  class="licence-word">
              <span class="img-position">
                <img ref="imgfileThere" :src="ruleForm.imgthere" width="70">
              </span>
              <el-button onclick="licencethere.click()">上傳駕駛證副本照片</el-button>
                      <input type="file" accept="image/png,image/jpg" id="licencethere" v-on:change="ImageThereChange($event)" style="display: none" :disabled="disabledcompanyW">
            </el-form-item>

          <el-form-item label="密碼" prop="pwd">
            <el-input type="password" v-model="ruleForm.pwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="確認密碼" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">確認</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/javascript">
import Image from '../service/image.js'
import Ajax from '../api/ajax.js'

export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatedrive = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入司机证号'));
        }
      };
      return {
        ruleForm: {
          phone: '',
          realname: '',
          driverno: '',
          cardno: '',
          pwd: '',
          checkPass:'',
          imgbol1:true,
          imgbol2:true,
          imgbol3:true,
          texiz: '',
          texis: '',
          texisj: '',
          file : [],
          zfno:'',
        },
        rules:{
            phone: [
                { required: true, message: '请填写电话号码'}
            ],
            realname: [
                { required: true, message: '请输入姓名', trigger: 'blur'},
            ],
            driverno: [
                { required: true, message: '司機證號', trigger: 'blur' },
            ],
            cardno: [
                { required: true, message: '请输入预付卡号', trigger: 'blur'},
            ],
            zfno: [
                { required: true, message: '身份證', trigger: 'blur'},
            ],
            pwd: [
                { validator: validatePass, trigger: 'blur' },
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' },
            ],
        }
      }
    },

    methods: {
    async submitForm(){

                if(this.ruleForm.phone!="" && this.ruleForm.realname!="" &&
                 this.ruleForm.driverno!="" && this.ruleForm.cardno!="" &&
                   this.ruleForm.pwd!="" && this.ruleForm.zfno!=""){
                this.ruleForm.texiz=this.ruleForm.imgtwo;
                this.ruleForm.texis=this.ruleForm.img;
                this.ruleForm.texisj=this.ruleForm.imgthere;

                var Ob = {
                  phone: this.ruleForm.phone,
                  email: '',
                  realname: this.ruleForm.realname,
                  driverno: this.ruleForm.driverno,
                  cardno: this.ruleForm.cardno,
                  pwd: this.ruleForm.pwd,
                  texiz: this.ruleForm.texiz,
                  texis: this.ruleForm.texis,
                  texisj: this.ruleForm.texisj,
                  zfno:this.ruleForm.zfno
                }
                console.log(Ob)

                let res = await Ajax.Post('im/user/textRegist',Ob);
                this.$notify({
                    title : '操作提示',
                    message :'注册成功',
                    type : 'success'
                });
              }
              else{
                  alert("請填寫完畢");
              }
            },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        ImageOneChange (e) {
      var files = e.target.files || e.dataTransfer.files
          var reader = new FileReader();
          reader.readAsDataURL(files[0]);
          var that = this;
          reader.onload = function(e){
              var mb = (e.total/1024)/1024;
              if(mb>= 2){
                  alert('文件大小大于2M');
                  return;
              }
              that.$refs.imgfileOne.src = this.result;
              that.ruleForm.img = this.result;
              // console.log(that.ruleForm.img)
              that.imgbol1 =false;
          }
    },
    ImageTwoChange (e) {
      var files = e.target.files || e.dataTransfer.files
          var reader = new FileReader();
          reader.readAsDataURL(files[0]);
          var that = this;
          reader.onload = function(e){
              var mb = (e.total/1024)/1024;
              if(mb>= 2){
                  alert('文件大小大于2M');
                  return;
              }
              that.$refs.imgfileTwo.src = this.result;
              that.ruleForm.imgtwo = this.result;
               //console.log(that.ruleForm.imgtwo)
              that.imgbol2 =false;
          }
    },
    ImageThereChange (e) {
      var files = e.target.files || e.dataTransfer.files
          var reader = new FileReader();
          reader.readAsDataURL(files[0]);
          var that = this;
          reader.onload = function(e){
              var mb = (e.total/1024)/1024;
              if(mb>= 2){
                  alert('文件大小大于2M');
                  return;
              }
              that.$refs.imgfileThere.src = this.result;
              that.ruleForm.imgthere = this.result;
               //console.log(that.ruleForm.imgthere)
              that.imgbol3 =false;
          }
    },
    },
    async created () {

    }
}
</script>
<style type="text/css" scoped>
.taxi_wrap{
    margin: 1rem 1rem;
    padding: 1rem;
    background-color: white;
    border-radius: 4px;
    overflow: hidden;
}
.taxi_wrap .taxi_title{
  font-size: 2.6rem;
  padding: 1rem 0rem;
  margin-bottom: 1rem;
}
.taxi_wrap .block{
  margin-top: 14px;
}
.taxi_wrap .no_data{
    text-align: center;
    font-size: 20px;
}
.taxi_wrap .el-form-item__content .el-input{
    max-width: 50% ;
}
</style>