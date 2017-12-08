<template>
    <div class="container">
        <nav-base :position="'navbar-fixed login-nav'"></nav-base>
        <div class="content login-content">
            <div class="login-form">
                <div class="header">
                    <p class="active item">後臺系統登錄</p>
                </div>
                <div class="login-form_content">
                    <div class="login-form-content_input-gorup">
                        <label>登錄名</label>
                        <input v-model="postData.username" type="email" @keyup.13="Submit">
                    </div>

                    <div class="login-form-content_input-gorup">
                        <label>密碼</label>
                        <input v-model="postData.pwd" type="password" @keyup.13="Submit">
                    </div>

                    <div class="login-form_content_action-box">
                        <label for="rememberPassword">
                            <input id="rememberPassword" type="checkbox">
                            記住密碼
                        </label>

                        <a href="#" class="resetPassword">忘記密碼</a>
                    </div>
                    <el-button @click="Submit" type="primary" class="login-form_content_summit-btn">登錄</el-button>
                </div>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
    import Validator from 'validatorjs'
    import Ajax from '../api/ajax.js'
    import Auth from '../service/auth.js'
    export default{
        data () {
            return {
                postData:{
                    username:'',
                    pwd:'',
                    flag:1
                }
            }
        },
        methods: {
           async Submit(){
                let rules  = {
                    "username":"required",
                    "pwd" : "required|min:6"
                };

                let errors = {
                    "required.username" : "请填写登录名",
                    "required.pwd" : "请填写密码",
                    "min.pwd":"密码最少6位，请填写正确的密码"
                }

                let validation = new Validator(this.postData, rules,errors);
                if(validation.fails()){
                    let errors = validation.errors.all();
                    for(let key in errors){
                        let msg = errors[key][0];
                        this.$notify({
                            title : '错误提示',
                            message : msg,
                            type : 'error'
                        });
                        return;
                    }
                }
                 //alert(this.postData.pwd);
                let postUrl = 'im/user/loginUser?username='+this.postData.username +
                    '&pwd='+this.postData.pwd+'&flag='+this.postData.flag
                let response = await Ajax.Get(postUrl);
                Auth.setMainData(response)
                Auth.setLogged('token');
                this.$router.push({name:'taxi'});
            }
        }
    }
</script>
<style lang="css" scoped>
    .login-base_box{
        height: 100%;
    }

    .login-content{
        /*height: 85%;*/
        background-color: #fff;
    }

    .container{
        overflow: hidden;
        background-color: #fff;
    }
.login-form{
    margin-top: 10rem;
    display: flex;
    flex-direction: column;
    width: 29rem;
}

.login-form>.header{
    text-align: center;
    font-size:2.5rem;
    color: #6c6c6c;
}


.login-form>.header>.active{
    color: #00abfd;
    font-weight: bold;
}


.login-form_content{
    margin-top: 4rem;
}

.login-form-content_input-gorup{
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    color: #adadad;
    font-size: 1.4rem;
}

.login-form-content_input-gorup>label{
    margin-bottom: 0.5rem;
    margin-left: 2rem;
}

.login-form-content_input-gorup>input{
    border-radius: 2rem;
    border: 1px solid #e6e6e8;
    background-color: #f7f6f7;
    height: 3.6rem;
    padding-left: 2rem;
    font-size: 1.5rem;
    transition: all 1s ease;
    outline:none;
}

.login-form-content_input-gorup>input:focus{
    border: 1px solid #00abfd;
    border-radius: 2rem;
}

.login-form_content_action-box{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
    color: #888888;
    font-size: 1.3rem;
    margin-top: -1rem;
    margin-left: 0.5rem;
    margin-bottom: 1.5rem;
}

.resetPassword{
    margin-right: 0.5rem;
    color: #42aadc;
}

.login-form_content_summit-btn{
    width: 100%;
    border-radius: 2rem !important;
}
</style>