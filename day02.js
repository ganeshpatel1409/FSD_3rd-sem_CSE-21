// call back function

function call(callback){
    welcome();
    learning();    
}

function welcome(){
    console.log("Welcome to ABES Engineering college");
}
function learning(){
    console.log("Learning fsd as a CSE student ");
}

call();
// another example
function sum(a,b){
    console.log(a+b);

}
function addition(a,b,callback){
    sum(a,b);
}
addition(5,10);