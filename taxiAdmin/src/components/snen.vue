<template>
  <div class="agent">
    <div class="depart-list-header">
            <input type="text" class="searchinput" v-model="sn" @change="changeinput" placeholder="sn號" @keyup.13="changeinput">
            <input type="text" class="searchinput" v-model="en" @change="changeinput" placeholder="en號" @keyup.13="changeinput">
            <el-button @click="changeinput" type="success">查找</el-button>
            <el-button @click="addsnen" type="success">新增</el-button>
    </div>
        <div class="onlineManager" >
            <p class="depart-title">Sn號和En號列表</p>
            <el-row class="depart-table_row borderdouble">

                <el-col :span="6" class="depart-table_col">Sn號</el-col>
                <el-col :span="6" class="depart-table_col">En號</el-col>
                <el-col :span="4" class="depart-table_col">编辑操作</el-col>
                <el-col :span="4" class="depart-table_col">删除操作</el-col>
            </el-row>
            <div v-if="taxi_bol">

            <el-row class="depart-table_row" v-for="(item, index) in this.snenlist" v-if="taxi_bol">


                <el-col :span="6" class="depart-table_col">{{item.sn}}</el-col>
                <el-col :span="6" class="depart-table_col">{{item.en}}</el-col>
                <el-col :span="4" class="depart-table_col">
                    <el-button size='mini' @click="Editinfo(item)" type="success">編輯</el-button>
                </el-col>
                <el-col :span="4" class="depart-table_col">
                    <el-button size='mini' @click="Delinfo(item)" type="success">删除</el-button>
                </el-col>
            </el-row>
            </el-checkbox-group>
<el-pagination :total="this.tableData.length" @current-change="handleCurrentChange" :page-size="10" v-if="this.tableData.length > 10"></el-pagination>
</div>


        </div>
        <div class="no_s" v-if="no_data">
            <el-row class="depart-table_row" style="margin-bottom: 0;">
                <el-col :span="24" class="depart-table_col no_datas">暫無數據</el-col>
            </el-row>
        </div>
        <div class="no_s" v-if="no_search">
            <el-row class="depart-table_row" style="margin-bottom: 0; margin-top: 1rem;">
                <el-col :span="24" class="depart-table_col no_searchs"><span>沒找到與相關的數據，請輸入sn號或者en號</span>！</el-col>
            </el-row>
        </div>


        <!-- 编辑司機司机 -->
        <el-dialog title="编辑Sn和En" v-model="editAgentVisible" size='small'>
            <el-form :model="editAgentStruct.form" :rules="editAgentStruct.rule" ref="addAgentStruct" label-width='100px'>
                <el-form-item>
                    <el-input type="hidden" v-model="editAgentStruct.form.id"></el-input>
                </el-form-item>
                <el-form-item label="Sn：" prop="sn" required>
                    <el-input v-model.number="editAgentStruct.form.sn"></el-input>
                </el-form-item>
                <el-form-item label="En：" prop="en" required>
                    <el-input v-model="editAgentStruct.form.en"></el-input>
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

                taxi_bol: false,
                search_bol:false,
                no_data: true,
                no_search: false,
                sn: '',
                en: '',
                searchList: [],
                snenlist:[],
                statusclass:['可用','禁止'],
                editAgentVisible:false,
                editAgentStruct: {
                    form: {
                      id:'',
                      sn:'',
                      en:'',
                    },
                    rule: {
                      sn: [
                        { required: true, message: '请填写sn'}
                      ],
                      en: [
                        { required: true, message: '请填写en' }
                      ],
                    }
                },
            }
        },
        async created () {
            let res = await Ajax.Get('/im/user/getSnList?sn=&en=');
            if (res) {
              this.taxi_bol = true;
              this.search_bol = false;
              this.no_data = false;
              this.no_search = false;
            }
            this.snenlist = res;
             this.tableData=res;
        },
        methods: {
            async changeselect(){

                await this.getList(this.sn,this.en)

            },
            async getList(sn,en){
              let res = await Ajax.Get('/im/user/getSnList?sn='+sn+'&en='+en);
            if (res) {
              this.taxi_bol = true;
              this.search_bol = false;
              this.no_data = false;
              this.no_search = false;
            }
            this.UIData.memberList = res;
             this.tableData=res;
            },
             async changeinput(){
              let res = await Ajax.Get('/im/user/getSnList?sn='+this.sn+'&en='+this.en);
            if (res) {
              this.taxi_bol = true;
              this.search_bol = false;
              this.no_data = false;
              this.no_search = false;
            }
            this.snenlist= res;
             this.tableData=res;
            },
          async addsnen () {
                this.editAgentVisible = true;
            },
            async Editinfo (item) {
                // console.log(id)
                this.editAgentVisible = true;
                // let res = await Ajax.Get('/im/user/getAgent?id='+ id);
                this.editAgentStruct.form={
                    id:item.ids,
                    sn:item.sn,
                    en:item.en
                }
            },
            async Delinfo (item) {
                // console.log(id)

                let res = await Ajax.Get('/im/user/deletesn?ids='+item.id);
                this.$notify({
                                title: '成功提示',
                                message: '删除Sn號和En號成功！',
                                type: 'success'
                            })
                let res1= await Ajax.Get('/im/user/getSnList?sn=&en=');
                        this.snenlist = res1;
                        this.tableData=res1;
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
                        if(this.editAgentStruct.form.sn!='' && this.editAgentStruct.form.en!=''){
                            //alert(this.editAgentStruct.form.id);
let res = await Ajax.Posts('im/user/addSnen',this.editAgentStruct.form);
                        this.$notify({
                                title: '成功提示',
                                message: '编辑Sn號和En號成功！',
                                type: 'success'
                            })
                            let res1= await Ajax.Get('/im/user/getSnList?sn=&en=');
                        this.snenlist = res1;
                        this.tableData=res1;
                        }





                    }
                })
            },
            handleCurrentChange(val){
              this.page = val;

             this.UIData.memberList = this.tableData.sumtal.slice( (val - 1) * 9,val * 9)


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