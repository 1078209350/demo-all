//封装storage
var storage = {
    set(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    get(key){
        return JSON.parse(localStorage.getItem(key))
    },
    remove(key){
        if(localStorage.length===0){
            alert('无localStorage');
        }else{
            localStorage.removeItem(key);
        }
    }
}
export default storage;
