import Axios from 'axios'
import Config from '../config/axios.config.js'
import App from '../app.js'
import { Loading } from 'element-ui';
import { Notification } from 'element-ui';
var loading = {};
Axios.interceptors.request.use((config)=>{
    loading = Loading.service({fullscreen:true,text:'正在玩命加载中'});
    return config;
    }, (error) => {
    return Promise.reject(error);
});

Axios.interceptors.response.use(function (response) {
    loading.close();
    return response;
  }, function (error) {
    loading.close();
    return Promise.reject(error);
});

class Ajax{
    static ResponseHandle(F,res){
        switch(res.data.status){
            case 0:
                Notification({
                    title : '错误提示',
                    message : res.data.message,
                    type : 'error'
                });
            break;
            default:
                F.resolve(res.data.data);
            break;
        }
    }

    static Post(url,data){
        var F = new Future();
        Axios.post(url,data,Config)
        .then((res)=>{
            console.log(res)
            Ajax.ResponseHandle(F,res);
        })
        .catch((e)=>{
            // console.info(e);
            F.reject(e);
        });
        return F;
    }

    static Posts(url,data){
        var F = new Future();
        Axios.post(url,data,Config)
        .then((res)=>{
            console.log(res)
            Ajax.StringHandle(F,res);
        })
        .catch((e)=>{
            console.info(e);
            F.reject(e);
        });
        return F;
    }

    static Get(url){
        var F = new Future();
        // console.log(F)
        Axios.get(url,Config)
        .then((res)=>{
            Ajax.ResponseHandle(F,res);
        })
        .catch((e)=>{
            // console.log(e)
            F.reject(e);
        });
        return F;
    }

    //返回字符串 
    static GetS(url){
        var F = new Future();
        Axios.get(url,Config)
        .then((res)=>{
            Ajax.StringHandle(F,res);
        })
        .catch((e)=>{
            F.reject(e);
        });
        return F;
    }

    static StringHandle(F,res){
        switch(res.status){
            case 0:
                Notification({
                    title : '错误提示',
                    message : res.data.message,
                    type : 'error'
                });
            break;
            default:
                F.resolve(res.data);
            break;
        }
    }
}

export default Ajax;