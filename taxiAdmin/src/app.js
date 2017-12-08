import 'babel-polyfill'
import Vue from 'vue'
import VueRoute from 'vue-router'
import Routers from './routers.js'
import auth from './service/auth.js'
import Vuex from 'vuex'
import './css/step.css'
import './css/reset.css'
import './css/common.css'
import './css/footer.css'
import NavBase from './components/common/nav/nav.base.vue'
import NavMain from './components/common/nav/nav.main.vue'
import Footer from './components/common/footer.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'


Vue.use(VueRoute);
Vue.use(Vuex);
Vue.use(ElementUI);

Vue.component('nav-base',NavBase);
Vue.component('nav-main',NavMain);
Vue.component('v-footer',Footer);
const Router = new VueRoute({
    mode: 'hash',
    routes : Routers
});

Router.beforeEach((to,from,next)=>{
    //如果没登录，则只允许跳转到login和register
    var RouterName = to.name;
    if(RouterName !== 'login'){
        if(!auth.loggedIn()){
            alert('请先登录后操作');
            next({
                path : '/login',
                query : {redirect : to.fullPath}
            });
            return;
        }
    }
    
    //如果登录了则不允许跳转到login和register
    if(RouterName === 'login'){
        if(auth.loggedIn()){
            next({
                path : '/'
            });
            return;
        }
    }
    next();
});

const Store = new Vuex.Store({
    state:{
        userInfo:{
            value:''
        },
        companyid:''
    },
    mutations:{
        setUserInfo(state,value){
            state.userInfo = value;
        },
        setcompanyid(state,value){
            state.companyid = value;
        }
    }
});



const App = new Vue({
    router:Router,
    store:Store,
    el:"#app"
});

export default App;