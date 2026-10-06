// To understand the concept of fetch in console
async function test(){
    console.log("This is a synchoronous function and we want use fetch() function");
    const response = await fetch("./student.json");
    console.log(response.status);
    const std = (await response).json();
    console.log("Finally data fetch");
    return std;
    
}
test().then((res)=>{

    console.log(err);
}).catch(()=>{})