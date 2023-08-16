const express=require("express")
const app=express()
const {addUser,getUser,removeUser} = require("./utils/user")

const http = require("http")
const {Server} = require("socket.io")

//creating http server for our app
const server=http.createServer(app)

//creating server instance for socket
const io = new Server(server)

let imgURLGlobal,roomIdGlobal;

io.on("connection",(socket)=>{
    console.log("user connected",socket.id)
    socket.on('user-joined',(userData)=>{
        const {name,id,userId,host,presenter} = userData
        roomIdGlobal = id
        socket.join(id)
        const users = addUser({name,id,userId,host,presenter,socketId:socket.id})
        socket.emit('room-joined',{success : true,users})
        socket.broadcast.to(id).emit("userJoinedMessageBroadcasted",name)
        socket.broadcast.to(id).emit("allUsers",users)
        socket.broadcast.to(id).emit("WhiteboardImageRes",{
            imgURL:imgURLGlobal,
        })
       })

    socket.on("WhiteboardImage",(data)=>{
        imgURLGlobal = data;
        socket.broadcast.to(roomIdGlobal).emit("WhiteboardImageRes",{
            imgURL:data,
        })

    })

    socket.on('message',(data)=>{
        const {message} = data
        const user = getUser(socket.id)
        if(user){
            socket.broadcast.to(roomIdGlobal).emit("messageResponse",{message,name:user.name})
        }
       
    })

    socket.on("disconnect",()=>{
        const user = getUser(socket.id);

        if(user){
            const users = removeUser(socket.id)
        }

        socket.broadcast.to(roomIdGlobal).emit("userLeftMessageBroadcasted",user)
    })
})




//Routes
app.get('/',(req,res)=>{
    res.send("this is the server for my whiteboard app")

})

const port= process.env.port || 5000
const host="localhost"

server.listen(port,host,()=>{
    console.log("server is listening")
})
