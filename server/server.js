const express = require("express");
const http = require('http')
const cors = require('cors')
const {Server}=require('socket.io')
const app = express();
app.use(cors())
const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
})

io.on('connection',(socket)=>{
    console.log(`User Connected ${socket.id}`)
    socket.on('join_room',(data)=>{
        if(data)
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on('send_msg',(data)=>{
        if(data.room)
        socket.to(data.room).emit('receive_msg',data)
    })

    socket.on('disconnect',()=>{
        console.log(`disconnected ${socket.id}`)
    }) 
})

const PORT = 3001 || process.env.PORT;
server.listen(PORT, () => console.log(`Server on ${PORT}`));
