export default{
    IsMobile:Phone=>{
        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        var flag = reg.test(Phone);
        return flag;
    },
    IsMobileBrowser(){
        if(/android/i.test(navigator.userAgent)){
                return true;
        }
        if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
                return true;
        }
        if(/Linux/i.test(navigator.userAgent)){
                return true;
        }
        if(/Linux/i.test(navigator.platform)){
                return true;
        }
        if(/MicroMessenger/i.test(navigator.userAgent)){
                return true;
        }
        
        return false;
    }
}