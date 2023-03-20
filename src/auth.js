export default {
    isAuth:false,   //标志用户是否登录
    autoLogin(cb){
        this.isAuth = true;
        setTimeout(cb,500);
    },
    logOut(cb){
        this.isAuth = false;
        setTimeout(cb,500)
    }
}
