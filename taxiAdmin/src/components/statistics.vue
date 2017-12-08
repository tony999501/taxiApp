<template>
	<div class="statis_wrap">
		<p class="statis_title">司機在綫統計</p>
		<el-radio-group v-model="status"  @change="statusFun()" class="radio_wrap">
			<el-radio class="radio" label="1">在綫</el-radio>
  			<el-radio class="radio" label="2">離綫</el-radio>
		</el-radio-group>
		<!-- <div v-if="status == 2"> -->
			<el-row class="depart-table_row borderdouble">
	            <el-col :span="6"
	                    class="depart-table_col">姓名</el-col>
	            <el-col :span="6"
	                    class="depart-table_col">電話</el-col>
	            <el-col :span="6"
	                    class="depart-table_col">工號</el-col>
	            <el-col :span="6"
	                    class="depart-table_col">創建時間</el-col>
	        </el-row>
	        <el-row class="depart-table_row" v-for="(item, index) in showdatalist">
	            <el-col :span="6"
	                    class="depart-table_col">{{item.realname}}</el-col>
	            <el-col :span="6"
	                    class="depart-table_col">{{item.phone}}</el-col>
	            <el-col :span="6"
	                    class="depart-table_col">{{item.gonghao}}</el-col>
	            <el-col :span="6"
	                    class="depart-table_col">{{item.createtime}}</el-col>
	        </el-row>
              
		<!-- </div> -->
		<!-- <div v-if="status == 1">
			<el-row class="depart-table_row borderdouble">
	            <el-col :span="5"
	                    class="depart-table_col">姓名</el-col>
	            <el-col :span="5"
	                    class="depart-table_col">電話</el-col>
	            <el-col :span="4"
	                    class="depart-table_col">工號</el-col>
	            <el-col :span="6"
	                    class="depart-table_col">創建時間</el-col>
				<el-col :span="4"
	                    class="depart-table_col">操作</el-col>
	        </el-row>
	        <el-row class="depart-table_row" v-for="(item, index) in showdatalist">
	            <el-col :span="5"
	                    class="depart-table_col">{{item.realname}}</el-col>
	            <el-col :span="5"
	                    class="depart-table_col">{{item.phone}}</el-col>
	            <el-col :span="4"
	                    class="depart-table_col">{{item.gonghao}}</el-col>
	            <el-col :span="6"
	                    class="depart-table_col">{{item.createtime}}</el-col>
	            <el-col :span="4"
	                    class="depart-table_col">
	                <el-button size='mini' @click="logOut(item)" type="success">登出</el-button>  
	            </el-col>
	        </el-row>
		</div> -->
        <el-pagination :total="datalist.length" @current-change="handleCurrentChange" :page-size="10" v-if="datalist.length > 10"></el-pagination>
        <!-- 司机登场记录 -->
        <!-- <el-dialog title="司機登出" v-model="outVisible" size=‘small>
            <el-form :model="outStruct.form" :rules="outStruct.rule" ref="outForm" label-width='170px'> 
                <el-form-item label="司機證號: " prop="phone" required>
                    <el-input v-model="outStruct.form.phone"></el-input>
                </el-form-item>
                <el-form-item label="密碼：" prop="pwd" required>
                    <el-input type="password" v-model="outStruct.form.pwd"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="outVisible = false">取消</el-button>
                <el-button type="primary"
                           @click="outSubmit">確定</el-button>
            </div>
        </el-dialog> -->
	</div>	
</template>
<script type="text/javascript">
import Ajax from '../api/ajax.js'
export default {
    data () {
    	var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
      	return {
        	status: '1',
        	datalist:[],
        	showdatalist:[],
        	outVisible:false,
        	outStruct: {
                form: {
                  phone:'',
                  pwd:'',
                },
                rule: {
                  phone: [
                    { required: true, message: '请填写代理商电话', }
                  ],
                  pwd: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                  ],
                }
            },
      	};
    },
    async created(){
    	let res = await Ajax.Get('/im/user/textONStatus');
        this.datalist = res;
        this.handleCurrentChange(1);
        console.log(this.datalist);
    },
    methods: {
        async statusFun(){
        	let res
        	if(Number(this.status) == 1){
        		res = await Ajax.Get('/im/user/textONStatus');
		        
        	}else{
        		res = await Ajax.Get('/im/user/textOffStatus');
        	}
        	this.datalist = res;
        	this.handleCurrentChange(1);
		    console.log(this.datalist);
        },
        handleCurrentChange(val){
        	this.showdatalist = this.datalist.slice( (val - 1) * 9,val * 9)
        },
        logOut(Ob){
        	this.outVisible = true;
        	this.outStruct.form.phone = Ob.gonghao;
        },
        outSubmit(){
        	this.$refs['outForm'].validate(async(valid) => {
                if (!valid) {
                  this.$notify({
                    title: '错误提示',
                    message: '内容有误，请检查后仔细填写',
                    type: 'error'
                  })
                  return false
                }else{
                	console.log(this.outStruct.form)
                	let res = await Ajax.Gets('im/user/textLogout?phone=' + this.outStruct.form.phone + '&pwd=' + this.outStruct.form.pwd);
                	console.log(res)
                        if(res.status == 1){
                            this.$notify({
                                title: '成功提示',
                                message: '已经登出',
                                type: 'success'
                            })
                            this.statusFun()
                        }else if(res.status == 2){
                            this.$notify({
                                title: '失败提示',
                                message: '登场失败',
                                type: 'error'
                            })
                    	}
                    	this.outVisible = false;
                }
            })
        }
    },
}	
</script>
<style type="text/css">
.radio_wrap{
    margin-bottom: 10px;
}
.statis_wrap{
    margin: 1rem 1rem;
    padding: 1rem;
    background-color: white;
    border-radius: 4px;
    width: 95%;
    overflow: hidden;
}
.statis_wrap .statis_title{
	font-size: 2rem;
    padding: 1rem 0rem;
    margin-bottom: 1rem;
}
.depart-table_row{
    transition: all 1s ease;
    border-bottom: 1px solid #e7ebee;
    margin-bottom: 1.2rem;
}
.depart-table_col{
    padding: 0rem .8rem 0.8rem;
    color: #1f2d3d;
    font-size: 14px;
    text-align: center;
}	
.borderdouble{
	margin-top: .6rem;
}

</style>