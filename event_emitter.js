// // Event Emitter
// // create a custom EventEmitter that triggers "great" or "exit"
// const EventEmitter = require("events")
// const event = new EventEmitter();
// event.on("greet",()=>{
//     console.log("This is a Event emitter")
// })


// event.emit("greet")


// class MyEmitter extends EventEmitter{}
// const event = new MyEmitter()
// event.on("greet",()=>{
//     console.log(`hello ${msg}`);
// })
// event.on("exit",()=>{
//     console.log("Exit myemitter application....");
// })
// event.emit("greet","CSE 21 this is fsd class")
// event.emit("Exit")


class Button extends EventEmitter{
    click(){
        console.log("/ncall button click event")
        this.emit("click");
    }

mouseover(){
    console.log("/n call button mouseover event")
    this.emit("mouseover");
    }
}
