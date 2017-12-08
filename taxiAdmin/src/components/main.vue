<template>
    <div class="container">
        <nav-main :position="'navbar-fixed'"></nav-main>
        <el-col :span="3" class='asidenav'>
            <el-menu default-active="1" :router="true" class="el-menu-vertical-demo asid" theme='dark'>
                <el-menu-item index="/taxi"><i class="el-icon-setting"></i>司機註冊</el-menu-item>
                <!-- <el-submenu index="/User">
                    <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
                    <el-menu-item index="/usermanager">公司用户列表</el-menu-item>
                    <el-menu-item index="/users">用户列表</el-menu-item>
                </el-submenu> -->
                <el-menu-item index="/taxiAdmin"><i class="el-icon-message"></i>司機列表</el-menu-item>
                <el-menu-item index="/statistics"><i class="el-icon-date"></i>統計</el-menu-item>
                <el-menu-item index="/water"><i class="el-icon-document"></i>司機流水查看</el-menu-item>
                <el-menu-item index="/duizhang"><i class="el-icon-menu"></i>司機流水對賬</el-menu-item>
                <el-menu-item index="/snen"><i class="el-icon-edit"></i>Sn號和En號</el-menu-item>
                <!-- <el-submenu index="/TaxiA">
                    <template slot="title"><i class="el-icon-menu"></i>司機管理</template>
                    <el-menu-item index="/taxiAdmin">司機司机列表</el-menu-item>
                    <el-menu-item index="/taxi">司機注册</el-menu-item>
                </el-submenu> -->
            </el-menu>
        </el-col>
        <el-col :span="21" style='overflow-y: scroll;height: 100%;padding-bottom: 6.4rem;'>
            <router-view></router-view>
        </el-col>
    </div>
</template>
<script>
export default{
    data () {
        return {

        }
    },
    async created () {

    },
    methods: {

    },
}
</script>
<style type="text/css">
.container{
    overflow: hidden;
}
.asidenav{
    height: 100%;
    background: #545C64;
}
.asid>.el-menu-item{
    background-color: #545C64;
    color: #fff;
}
.asid>.el-menu-item>i{
    color: #878D99;
}
.asid>.el-menu-item:hover{
    background-color: #434A50;
    color: #FFD04B;
}
.asid>.el-menu-item:hover i{
    color: #FFD04B;
}
/* .companyname{
    font-size:1.4rem;
    padding-left:20px;
    height: 50px;
    line-height:50px;
    border-bottom: 1px solid #c4c9d2;
    box-sizing: border-box;
    color: #BFC6D0;
} */
.fa-list{
    margin-right: 10px;
}
</style>