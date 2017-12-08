<template>
		<div class="agent">
				<div class="depart-list-header">
						<el-date-picker
							v-model="value4"
							placeholder="選擇日期" @change="changeselect" class="selectmonthinput" format="yyyy/MM/dd" >
						</el-date-picker>
						<input type="text" class="searchinput" v-model="searchRealname" @change="changeinput" placeholder="司機姓名" @keyup.13="addAgent">
						<el-button @click="addAgent" type="success">查找</el-button>
				</div>
				 <div class="onlineManager" id="my_text">
						<el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="交易总金额:" class="my_form-item">
								<!-- <el-input v-model.number="datesum" readonly="readonly"></el-input> -->
								{{datesum}}
							</el-form-item>
							<el-form-item label="总交易数:"  class="my_form-item">
								{{datenum}}
								<!-- <el-input v-model.number="datenum" readonly="readonly"></el-input> -->
							</el-form-item>
						</el-form>
				</div>
				<div class="onlineManager">
						<p class="depart-title"></p>
						<el-row class="depart-table_row borderdouble">
						<el-col :span="4" class="depart-table_col">商户编号</el-col>
								<el-col :span="4" class="depart-table_col">交易金額</el-col>
								<el-col :span="6" class="depart-table_col">的士司機證號碼</el-col>
								<el-col :span="4" class="depart-table_col">交易时间</el-col>
								<el-col :span="4" class="depart-table_col">司机名称</el-col>
								<el-col :span="2" class="depart-table_col">操作</el-col>
						</el-row>
						<div v-if="taxi_bol">
							<el-row class="depart-table_row" v-for="(item, index) in taxiAdminlist">
									<el-col :span="4" class="depart-table_col">{{item.shno}}</el-col>
									<el-col :span="4" class="depart-table_col">{{item.txAmt}}</el-col>
									<el-col :span="6" class="depart-table_col">{{item.gonghao}}</el-col>
									<el-col :span="4" class="depart-table_col">{{item.settletime}}</el-col>
									<el-col :span="4" class="depart-table_col">{{item.name}}</el-col>
									<el-col :span="2" class="depart-table_col">
									<el-button size='mini' @click="Editinfo(item)" type="success">詳情</el-button>
									</el-col>
							</el-row>
							<el-pagination :total="this.tableData.sumtal.length" @current-change="handleCurrentChange" :page-size="10" v-if="this.tableData.sumtal.length > 10"></el-pagination>
						</div>

						<div v-if="search_bol">
							 <el-row class="depart-table_row" v-for="(item, index) in searchList">
									<el-col :span="4" class="depart-table_col">{{item.shno}}</el-col>
									<el-col :span="4" class="depart-table_colright">{{item.txAmt}}</el-col>


									<el-col :span="6" class="depart-table_col">{{item.gonghao}}</el-col>
									<el-col :span="4" class="depart-table_col">{{item.settletime}}</el-col>

									<el-col :span="4" class="depart-table_col">{{item.name}}</el-col>


								 <el-col :span="2" class="depart-table_col">
											<el-button size='mini' @click="Editinfo(item)" type="success">詳情</el-button>
									</el-col>
							</el-row>
							<el-pagination
								@current-change="handleCurrentChange1"
								layout="prev, pager, next"
								:total="searchCon.length"
								page-size="20" v-if="searchCon.length > 20">
							</el-pagination>
						</div>

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


				<!-- 詳情司機司机 -->
				<el-dialog title="司機流水詳情" v-model="editAgentVisible" size='small'>
				<div class="xiangqing">
						<el-col :span="8" class="xiangqingL">商戶號</el-col>
						<el-col :span="16" class="xiangqingR">{{xiangqingCon.shno}}</el-col>
					</div>
					<div class="xiangqing">
						<el-col :span="8" class="xiangqingL">系统受理时间</el-col>
						<el-col :span="16" class="xiangqingR">{{xiangqingCon.setdate}}</el-col>
					</div>
					<div class="xiangqing">
						<el-col :span="8" class="xiangqingL">交易金額</el-col>
						<el-col :span="16" class="xiangqingR">{{xiangqingCon.txAmt}}</el-col>
					</div>
					<div class="xiangqing">
						<el-col :span="8" class="xiangqingL">终端编号</el-col>
						<el-col :span="16" class="xiangqingR">{{xiangqingCon.zdno}}</el-col>
					</div>
					<div class="xiangqing">
						<el-col :span="8" class="xiangqingL">sn號</el-col>
						<el-col :span="16" class="xiangqingR">{{xiangqingCon.sn}}</el-col>
					</div>
					<div class="xiangqing">
						<el-col :span="8" class="xiangqingL">的士司機證號碼</el-col>
						<el-col :span="16" class="xiangqingR">{{xiangqingCon.gonghao}}</el-col>
					</div>
					<div class="xiangqing">
						<el-col :span="8" class="xiangqingL">交易时间</el-col>
						<el-col :span="16" class="xiangqingR">{{xiangqingCon.settletime}}</el-col>
					</div>
				<div class="xiangqing">
						<el-col :span="8" class="xiangqingL">身份證號碼</el-col>
						<el-col :span="16" class="xiangqingR">{{xiangqingCon.idcard}}</el-col>
					</div>
					<div class="xiangqing">
						<el-col :span="8" class="xiangqingL">司机名称</el-col>
						<el-col :span="16" class="xiangqingR">{{xiangqingCon.name}}</el-col>
					</div>
					<div class="xiangqing">
						<el-col :span="8" class="xiangqingL">預付卡號碼</el-col>
						<el-col :span="16" class="xiangqingR">{{xiangqingCon.kahao}}</el-col>
					</div>
					<div class="xiangqing">
						<el-col :span="8" class="xiangqingL">检索参考号</el-col>
						<el-col :span="16" class="xiangqingR">{{xiangqingCon.refno}}</el-col>
					</div>
					 <div class="xiangqing">
						<el-col :span="8" class="xiangqingL">交易类型</el-col>
						<el-col :span="16" class="xiangqingR">{{xiangqingCon.txntype}}</el-col>
					</div>
					 <div class="xiangqing">
						<el-col :span="8" class="xiangqingL">批次號</el-col>
						<el-col :span="16" class="xiangqingR">{{xiangqingCon.pcno}}</el-col>
					</div>
					<div class="xiangqing">
						<el-col :span="8" class="xiangqingL">返回码</el-col>
						<el-col :span="16" class="xiangqingR">{{xiangqingCon.respcode}}</el-col>
					</div>


				</el-dialog>
				<iframe src="" name="ifrmname" id="ifrmid">

				</iframe>
		</div>
</template>
<script type="text/javascript">
		import Ajax from '../api/ajax.js'


		Date.prototype.Format = function (fmt) { //author: meizz
		var o = {
				"M+": this.getMonth() + 1, //月份
				"d+": this.getDate(), //日
				"h+": this.getHours(), //小时
				"m+": this.getMinutes(), //分
				"s+": this.getSeconds(), //秒
				"q+": Math.floor((this.getMonth() + 3) / 3), //季度
				"S": this.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
}
function addDate(dadd){
var a = new Date();
a = a.valueOf();
a = a + dadd * 24 * 60 * 60 * 1000;
a = new Date(a);
return a;
}

		export default{
				data () {
						var validatePass = (rule, value, callback) => {
								if (value === '') {
										callback(new Error('请输入密码'));
								} else {
										callback();
								}
						};
						return {
								xiangqingCon: [],
								searchCon: [],
								tableData: [],
								value4: '',
								datesum: '',
								datenum: '',
								taxi_bol: false,
								search_bol:false,
								no_data: true,
								no_search: false,
								searchRealname: '',
								searchRealnames: '',
								searchList: [],
								taxiAdminlist:[],
								 searchList2: [],
								taxiAdminlist2:[],
								statusclass:['可用','禁止'],
								editAgentVisible:false,
								 editlistVisible:false,
								editAgentStruct: {
										form: {
											shno:'',
											setdate:'',
											txAmt:'',
											zdno:'',
											sn: '',
											gonghao: '',
											idcard: '',
											name: '',
											kahao: '',
											refno: '',
											txntype: '',
											pcno: '',
											respcode: '',
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
												{ required: true, message: '请填写司机邮箱', trigger: 'blur' },
												{ type: 'email', message: '邮箱格式不正确', trigger: 'blur,change'}
											],
											pwd: [
												{ required: true, message: '请填写密码', trigger: 'blur' },
												{ validator: validatePass, trigger: 'blur' }
											],
											cardno: [
												{ required: true, message: '请填写司机预付卡' },
											],
											driverno: [
												{ required: true, message: '请填写司机司機编号' },
											],
										}
								},
						}
				},
				async created () {
						var  month=addDate(-2).Format("yyyy/MM/dd");
						let res = await Ajax.Get('/im/user/getByDuiZhang?month='+month+'&realname='+this.searchRealname);


						if (res) {
							this.taxi_bol = true;
							this.search_bol = false;
							this.no_data = false;
							this.no_search = false;
						}
						this.taxiAdminlist = res;
						this.tableData = res;


						this.handleCurrentChange(1)
						// console.log(res)
				},
				methods: {
						async changeselect(){
							this.taxiAdminlist = [];
							this.searchList = [];
							console.log(this.value4);
							if (this.value4!=null) {
							var time1 = this.value4.Format("yyyy/MM/dd");
							console.log(time1);
							await this.getMonthCam(time1);
							}
							else{
							await this.getMonthCam('');
							}
						},
						async getMonthCam(month){
							this.tableData = []
							if(month==''){
								 month=new Date().Format("yyyy/MM/dd");
							}

							let res_2 = await Ajax.Get('im/user/getByDuiZhang?month=' + month+'&realname='+this.searchRealname)
							this.tableData = res_2;
							if (res_2) {
								this.taxi_bol = true;
								this.search_bol = false;
								this.no_data = false;
								this.no_search = false;
							}
							else{
								this.taxi_bol = false;
								this.search_bol = false;
								this.no_data = true;
								this.no_search = false;
							}
							this.handleCurrentChange(1);
							console.log(res_2)
						},

						handleCurrentChange(val){
							this.page = val;
							this.getUsers();
 this.datesum=this.tableData.sumtotal;
						 //  alert(this.datesum);
							this.datenum=this.tableData.sum;
					this.taxiAdminlist = this.tableData.sumtal.slice( (val - 1) * 9,val * 9)
						},
						getUsers(){
							this.taxiAdminlist=[];
							this.searchList=[];
							this.datesum=this.tableData.sumtotal;
							this.datenum=this.tableData.sum;

							for (var i = 0; i < this.tableData.sumtal.length; i++) {
								if((i>=(this.page-1)*20) && (i<this.page*20)){
									this.taxiAdminlist.push(this.tableData.sumtal[i])
									this.searchList.push(this.tableData.sumtal[i])
								}
							}
						},
						handleCurrentChange1(val){
							this.searchList = this.searchCon.slice( (val - 1) * 9,val * 9)
						},
						getUsers1(){
							this.searchList=[];
							for (var i = 0; i < this.tableData.sumtal.length; i++) {
								if((i>=(this.page-1)*20) && (i<this.page*20)){
									this.searchList.push(this.tableData.sumtal[i])
								}
							}
						},


						changeinput(){
							console.log(this.searchRealname)
						},

						addAgent () {
								this.searchRealnames = this.searchRealname;
								this.searchCon = [];
								this.searchList = [];
								var num=0;
								var totalmoney=0;

								//精准搜索
								// for(var i = 0; i < this.tableData.sumtal.length; i++){
								// 	if (this.searchRealname == this.tableData.sumtal[i].name) {
								// 		// console.log(i)
								// 		this.searchCon.push(this.tableData.sumtal[i])
								// 		this.searchList.push(this.tableData.sumtal[i])
								// 		 totalmoney=totalmoney+this.tableData.sumtal[i].txAmt;
								// 		num++;
								// 	}
								// }

								//模糊搜索
								for(var i=0; i<this.tableData.sumtal.length; i++){
                if(this.tableData.sumtal[i].name.indexOf(this.searchRealname) >= 0){
                  this.searchCon.push(this.tableData.sumtal[i])
										this.searchList.push(this.tableData.sumtal[i])
										 totalmoney=totalmoney+this.tableData.sumtal[i].txAmt;
										num++;
              	  }
              	}


								var total=totalmoney.toString();
								var toa="";
								if(total.indexOf(".")>0){
									toa=total.substring(0,total.indexOf(".")+3);
								}
								else{
									toa=total;
								}

								this.datesum=toa;
								this.datenum=num;
								console.log(this.taxiAdminlist)
								this.handleCurrentChange1(1)

								if (this.searchRealname == '') {
									console.log('空')
									this.taxi_bol = true;
									this.search_bol = false;
									this.no_data = false;
									this.no_search = false;
									this.handleCurrentChange(1);
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

						},
						async Editinfolist (item) {

								this.editlistVisible = true;

								this.xiangqingCon = item;
								this.taxiAdminlist2=[];
								this.searchList2=[];
							this.searchList2=[];
							for (var i = 0; i < this.xiangqingCon.length; i++) {

									this.taxiAdminlist2.push(this.xiangqingCon[i])
									this.searchList2.push(this.xiangqingCon[i])

							}
						},
						async Editinfo (item) {
								// console.log(id)
								this.editAgentVisible = true;
								// let res = await Ajax.Get('/im/user/getAgent?id='+ id);
								this.xiangqingCon = item;
								this.editAgentStruct.form={
										shno:'',
											setdate:item.setdate,
											txAmt:item.txAmt,
											zdno:item.zdno,
											sn: item.sn,
											gonghao: item.gonghao,
											idcard: item.idcard,
											name: item.name,
											kahao: item.kahao,
											refno: item.refno,
											txntype: item.txntype,
											pcno: '',
											respcode: ''
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
																message: '詳情司機司机成功！',
																type: 'success'
														})
														this.editAgentVisible = false;
												}
												else{
														this.$notify({
																title: '失败提示',
																message: '詳情司機司机失败！',
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
.depart-table_colright{
		padding: 0rem 1.2rem 0.8rem 1.2rem;
		color: #1f2d3d;
		font-size: 14px;
		text-align:right
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

.selectmonthinput{
	margin-right: 1rem;
}

.xiangqingL{
	text-align: right;
	padding-right: 2rem;
	box-sizing: border-box;
}
.xiangqing{
	height: 3rem;
	font-size: 1.6rem;
	line-height: 3rem;
	/*border-bottom: 1px solid #bfcbd9;*/
}
.el-dialog--small{
	min-width: 400px;
}
.el-form-item{
	margin: 1rem 0;
}
</style>