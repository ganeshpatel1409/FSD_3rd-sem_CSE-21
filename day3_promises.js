// promise : object
// promise way 1

const promiseone= new Promise ((resolve, reject) => {
    console.log("promise done!");
resolve("operation successful");    

})

promisesone.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})