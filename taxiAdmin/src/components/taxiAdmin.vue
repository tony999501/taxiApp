<template>
  <div class="agent">
    <div class="depart-list-header">
            <!-- <el-date-picker
              v-model="value4"
              type="month"
              placeholder="选择月" @change="changeselect">
            </el-date-picker> -->
            <input type="text" class="searchinput" v-model="searchRealname" @change="changeinput" placeholder="司機姓名" @keyup.13="addAgent">
            <el-button @click="addAgent" type="success">查找</el-button>

        </div>
        <div class="onlineManager" >
            <p class="depart-title">司機列表</p>
            <el-row class="depart-table_row borderdouble">
                <el-col :span="4" class="depart-table_col">名稱</el-col>
                <el-col :span="6" class="depart-table_col">電話</el-col>
                <el-col :span="8" class="depart-table_col">司機證號</el-col>
                <el-col :span="6" class="depart-table_col">操作</el-col>
            </el-row>
            <el-row class="depart-table_row" v-for="(item, index) in taxiAdminlist" v-if="taxi_bol">
                <el-col :span="4" class="depart-table_col">{{item.realname}}</el-col>
                <el-col :span="6" class="depart-table_col">{{item.phone}}</el-col>
                <el-col :span="8" class="depart-table_col">{{item.gonghao}}</el-col>
                <el-col :span="6" class="depart-table_col">
                    <el-button size='mini' @click="Editinfo(item)" type="success">編輯</el-button>
                </el-col>
            </el-row>

            <el-row class="depart-table_row" v-for="(item, index) in searchList" v-if="search_bol">
                <el-col :span="4" class="depart-table_col">{{item.realname}}</el-col>
                <el-col :span="6" class="depart-table_col">{{item.phone}}</el-col>
                <el-col :span="8" class="depart-table_col">{{item.gonghao}}</el-col>
                <el-col :span="6" class="depart-table_col">
                    <el-button size='mini' @click="Editinfo(item)" type="success">編輯</el-button>
                </el-col>
            </el-row>

        </div>
        <div class="no_s" v-if="no_data">
            <el-row class="depart-table_row" style="margin-bottom: 0;">
                <el-col :span="24" class="depart-table_col no_datas">暫無數據</el-col>
            </el-row>
        </div>
        <div class="no_s" v-if="no_search">
            <el-row class="depart-table_row" style="margin-bottom: 0; margin-top: 1rem;">
                <el-col :span="24" class="depart-table_col no_searchs">沒找到與<span class="vmodeltext">{{searchRealnames}}</span>相關的數據，請輸入司機姓名的<span class="vmodeltext">全名</span>！</el-col>
            </el-row>
        </div>


        <!-- 编辑司機司机 -->
        <el-dialog title="编辑司機司机" v-model="editAgentVisible" size='small'>
            <el-form :model="editAgentStruct.form" :rules="editAgentStruct.rule" ref="addAgentStruct" label-width='170px'>
                <el-form-item label="司機姓名：" prop="realname" required>
                    <el-input v-model="editAgentStruct.form.realname"></el-input>
                </el-form-item>
                <el-form-item label="司機電話：" prop="phone" required>
                    <el-input v-model.number="editAgentStruct.form.phone"></el-input>
                </el-form-item>
                <el-form-item label="司機郵箱：" prop="email" >
                    <el-input v-model="editAgentStruct.form.email"></el-input>
                </el-form-item>
                <el-form-item label="密碼：" prop="pwd" >
                    <el-input v-model="editAgentStruct.form.pwd"></el-input>
                </el-form-item>
                <el-form-item label="預付卡：" prop="open_id" required>
                    <el-input v-model="editAgentStruct.form.open_id"></el-input>
                </el-form-item>
                <el-form-item label="司機證號：" prop="gonghao" required>
                    <el-input v-model="editAgentStruct.form.gonghao"></el-input>
                </el-form-item>
                 <el-form-item label="身份證" prop="facebook_open_id">
            <el-input v-model="editAgentStruct.form.facebook_open_id"></el-input>
          </el-form-item>
                <el-form-item :label='身份證'  class="licence-word">
              <span class="img-position">
                <img ref="imgfileOne" :src="editAgentStruct.form.texis" width="70">
              </span>
              <el-button onclick="licence.click()">上傳身份證照片</el-button>
                      <input type="file" accept="image/png,image/jpg" id="licence" v-on:change="ImageOneChange($event)" style="display: none" :disabled="disabledcompanyW">
            </el-form-item>
          <el-form-item :label='的士證'  class="licence-word">
              <span class="img-position">
                <img ref="imgfileTwo" :src="editAgentStruct.form.texiz" width="70">
              </span>
              <el-button onclick="licencetwo.click()">上傳的士證照片</el-button>
                      <input type="file" accept="image/png,image/jpg" id="licencetwo" v-on:change="ImageTwoChange($event)" style="display: none" :disabled="disabledcompanyW">
            </el-form-item>
            <el-form-item :label='駕駛證副本'  class="licence-word">
              <span class="img-position">
                <img ref="imgfileThere" :src="editAgentStruct.form.texisj" width="70">
              </span>
              <el-button onclick="licencethere.click()">上傳駕駛證副本照片</el-button>
                      <input type="file" accept="image/png,image/jpg" id="licencethere" v-on:change="ImageThereChange($event)" style="display: none" :disabled="disabledcompanyW">
            </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="editAgentVisible = false">取消</el-button>
                <el-button type="primary"
                           @click="editAgentSubmit">確定</el-button>
            </div>
        </el-dialog>
  </div>
</template>
<script type="text/javascript">
    import Ajax from '../api/ajax.js'
    export default{
        data () {
            return {
                value4: '',
                taxi_bol: false,
                search_bol:false,
                no_data: true,
                no_search: false,
                searchRealname: '',
                searchRealnames: '',
                searchList: [],
                taxiAdminlist:[],
                statusclass:['可用','禁止'],
                editAgentVisible:false,
                editAgentStruct: {
                    form: {
                      realname:'',
                      phone:'',
                      email:'',
                      pwd:'',
                      open_id: '',
                      gonghao: '',
                      userid: '',
                      facebook_open_id: '',
                      texiz:'',
                      texis:'',
                      texisj:'',
                    },
                    rule: {
                      realname: [
                        { required: true, message: '请填写司机姓名', trigger: 'blur' }
                      ],
                      phone: [
                        { required: true, message: '请填写司机电话' },
                        { type: 'number', message: '电话必须为数字值'}
                      ],
                     email: [

                        { type: 'email', message: '邮箱格式不正确', trigger: 'change'}
                      ],

                      open_id: [
                        { required: true, message: '请填写预付卡' },
                      ],
                      gonghao: [
                        { required: true, message: '请填写司機證號' },
                      ],
                      facebook_open_id: [
                        { required: true, message: '请填写身份證' },
                      ],
                    }
                },
            }
        },
        async created () {
            let res = await Ajax.Get('/im/user/textList');
            if (res) {
              this.taxi_bol = true;
              this.search_bol = false;
              this.no_data = false;
              this.no_search = false;
            }
            this.taxiAdminlist = res;

            // console.log(res)
        },
        methods: {
            async changeselect(){
              console.log(this.value4)
              if (this.value4) {
                await this.getMonthCam(this.value4)
              }
            },
            async getMonthCam(month){
              let sendmonth='';
              if(month.getMonth()<10){
                sendmonth = new Date().getFullYear()+'/0'+ (month.getMonth()+1);
              }else{
                sendmonth = new Date().getFullYear()+'/'+ (month.getMonth()+1);
              }
              console.log(sendmonth)
            },


            changeinput(){
              console.log(this.searchRealname)
            },
            addAgent () {  //查询按钮事件
              this.searchRealnames = this.searchRealname;
              this.searchList = [];

              //精准搜索
              // for(var i = 0; i < this.taxiAdminlist.length; i++){
              //   if (this.searchRealname == this.taxiAdminlist[i].realname) {
              //     this.searchList.push(this.taxiAdminlist[i])
              //   }
              //   console.log(this.searchRealnames.realname)
              // }

              //模糊搜索
              for(var i=0; i<this.taxiAdminlist.length; i++){
                if(this.taxiAdminlist[i].realname.indexOf(this.searchRealname) >= 0){
                  this.searchList.push(this.taxiAdminlist[i])
                }
              }





                if (this.searchRealname == '') {
                  console.log('空')
                  this.taxi_bol = true;
                  this.search_bol = false;
                  this.no_data = false;
                  this.no_search = false;
                  return false;
                }
                if (this.searchList.length) {
                  console.log('有')
                  this.taxi_bol = false;
                  this.search_bol = true;
                  this.no_data = false;
                  this.no_search = false;
                  return false;
                }
                if (!this.searchList.length) {
                  console.log('无')
                  this.taxi_bol = false;
                  this.search_bol = false;
                  this.no_data = false;
                  this.no_search = true;
                  return false;
                }
                /*if (searchRealname) {
                  this.taxi_bol = false;
                  this.search_bol = true;
                  this.no_data = false;
                }*/
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
              that.editAgentStruct.form.texis = this.result;
              // console.log(that.editAgentStruct.form.texis)
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
              that.editAgentStruct.form.texiz= this.result;
               console.log(that.editAgentStruct.form.texiz)
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
              that.editAgentStruct.form.texiz = this.result;
               console.log(that.editAgentStruct.form.texiz)
              that.imgbol3 =false;
          }
    },
            async Editinfo (item) {
                // console.log(id)
                this.editAgentVisible = true;
                // let res = await Ajax.Get('/im/user/getAgent?id='+ id);
                this.editAgentStruct.form={
                    userid:item.id,
                    realname:item.realname,
                    phone:parseInt(item.phone),
                    email:item.email,
                    pwd: '',
                    open_id: item.open_id,
                    gonghao: item.gonghao,
                    facebook_open_id:item.facebook_open_id,
                    texiz:item.texiz,
                    texis:item.texis,
                    texisj:item.texisj
                }
            },
            async editAgentSubmit () {


                this.$refs['addAgentStruct'].validate(async(valid) => {
                    if (!valid) {
                      this.$notify({
                        title: this.$i18n.t('错误提示'),
                        message: this.$i18n.t('内容有误，请检查后仔细填写'),
                        type: 'error'
                      })
                      return false
                    }else{
                        console.log(this.editAgentStruct.form)

                        let res = await Ajax.Posts('im/user/updateText',this.editAgentStruct.form);
                        if(res.status==1){
                            this.$notify({
                                title: '成功提示',
                                message: '编辑司機司机成功！',
                                type: 'success'
                            })
                            this.editAgentVisible = false;
                        }
                        else{
                            this.$notify({
                                title: '失败提示',
                                message: '编辑司機司机失败！',
                                type: 'error'
                            })
                        }
                        let res_1 = await Ajax.Get('/im/user/textList');
                        this.taxiAdminlist = res_1;
                        // console.log(res_1)
                    }
                })
            }
        }
    }
</script>
<style type="text/css">
.depart-list-header{
    display: flex;
    flex-direction: row;
    margin: 1rem 1rem;
    padding: 1rem;
    background-color: white;
    border-radius: 4px;
}
.onlineManager{
  margin: 1rem 1rem;
  background-color: white;
    border-radius: 4px;
}
.depart-title{
    font-size: 2rem;
    padding: 1rem 2rem;
    border-bottom:1px solid #E7EBEE;
    margin-bottom: 1rem;
}
.depart-table_row{
    transition: all 1s ease;
    border-bottom: 1px solid #e7ebee;
    margin-bottom: 1.2rem;
}
.depart-table_col{
    padding: 0rem 1.2rem 0.8rem 1.2rem;
    color: #1f2d3d;
    font-size: 14px;
}
.depart-table_col .el-button+.el-button{
  margin: 0
}
.borderdouble{
    border-bottom: 2px solid #DDDDDD;
}

.searchinput{
  width: 18rem;
  padding-left: .6rem;
  margin-right: 1rem;
  /*margin-left: 1rem;*/
  border-radius: 4px;
  border: 1px solid #bfcbd9;
}

.no_datas{
  text-align: center;
  font-size: 2.4rem;
  font-weight: bold;
  padding: 1.5rem;
  /*margin-bottom: 0;*/
}
.no_searchs{
  text-align: center;
  font-size: 2.4rem;
  padding: 1.5rem;
  /*margin-bottom: 0;*/
}
.vmodeltext{
  color: red;
  margin: 0 .5rem;
}
.no_s{
  background: #fff;
  margin: 1rem;
}
/* .onlineManager .depart-table_row :last-child{
  margin-bottom: 0;
} */

</style>