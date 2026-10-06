// practice routing using http module
import http from 'http';
const server= http.createServer((req, res)=>{
    res.writeHead(200,{"content-type":"text/html"});
    if(req.url =="/"){
        res.end("<h1>This is the home page</h1>");
    }else if(req.url== "/about"){
        res.end("<h1>this is about page</h1>");
    }else if(req.url== "/Contact us"){
        res.end("<h3>this is contact info: 3546813556</h3>");
    }
})
server.listen(3001,()=>{
    console.log("My server is working on 3001");
})