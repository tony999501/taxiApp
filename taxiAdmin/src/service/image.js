export default{
    ToBase64(file){
        return new Promise((resolve,reject)=>{
            var reader = new FileReader();   
            reader.readAsDataURL(file);   
            reader.onload = function(e){   
                resolve(this.result);
            }
        });
    }
}