const auth = {
    loggedIn(){
        var token = window.sessionStorage.token;
        var user_status = window.sessionStorage.user_status;

        // console.info(window.sessionStorage);
        if(!token || token === 'undefined'){
            return false;
        }

        if(user_status === 'outlogin'){
            return false;
        }

        
        return true;
    },
    setLogged(token){
        window.sessionStorage.token = 'token';
        window.sessionStorage.user_status = 'login';
    },
    outLogged(){
        window.sessionStorage.clear();
    },
    setMainData(data){
        // console.info(data);
        window.sessionStorage.mainData = JSON.stringify(data);
    },
    getMainData(){
        if(window.sessionStorage.mainData)
            return JSON.parse(window.sessionStorage.mainData);

        return false;
    }
}

export default auth;