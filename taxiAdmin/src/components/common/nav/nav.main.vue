<template>
    <nav class="navbar" v-bind:class="position">
        <div class="navbar-content navbar-content-login" >
            <div class="flex-row">
                <img class="logoimg" src="../../../icon/logo.png" alt="Taxi后台系统">
            </div>
            <el-button type='text' @click='outLogin' class='out'>退出</el-button>
        </div>
    </nav>
</template>
<script>
    import Auth from '../../../service/auth.js'
    export default{
        props: ['position'],
        data() {
            return {
                avatarlistVisible: false,
            };
        },
        methods: {
            outLogin(){
                Auth.outLogged();
                this.avatarlistVisible=false;
                this.$router.push({name:'login'});
            }
        }
    }
</script>
<style type="text/css">
.navbar{
    background:#fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 6.4rem;
    z-index: 100;
}
.navbar-content{
    display: flex;
    flex-direction: row;
    width: 96%;
    height: 6.4rem;
    align-items: center;
    position: relative;
}
.out{
    position: absolute;
    right: 0;
    line-height: 6.4rem;
    padding:0;
}
.logoimg{
    width: 20rem;
}
</style>