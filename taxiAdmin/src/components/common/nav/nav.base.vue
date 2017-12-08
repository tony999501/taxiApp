<template>
    <nav class="navbar" v-bind:class="position">
        <div class="navbar-content" >
            <img src="../../../icon/logo.png" alt="logo" />
        </div>
    </nav>
</template>
<script>
    export default{
        props: ['position']
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
}
.navbar-content>img{
    width: 20rem;
}
</style>