// create one promise that will display user name and password
// using resolve and if data will be rejected its display error

const promiseone= new Promise ((resolve, reject) => {
    setTimeout(()=> {
        let err= true;
        if(!err){
            resolve("User:CSE21, password:1234");
        }else{
            reject("ERROR...DATA FAIL");
        }
    },2000)

}).then((result)=>{
console.log(result);
}).catch((error)=>{
    console.log(error);
})