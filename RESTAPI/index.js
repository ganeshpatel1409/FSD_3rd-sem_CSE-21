import express from 'express';
const app = express()
app.use(express.json);
let users =[
    {id:1, name :'A' , email:'A@example.com'},
    {id:2, name :'B' , email:'B@example.com'}
];
// GeT :fetch all users data
app.get('/users',(req,res)=>{
    res.json(users);
});
// post createa new user
app.post('/users',(req,res)=>{
    let user= {
        id:users.length+1,
        name:req.body.name,
        email:req.body.email
    };
    users.push(user);
    res.json(user);
});
app.listen(3001,()=>{
    console.log('Server is running on https://localhost:3001');
});