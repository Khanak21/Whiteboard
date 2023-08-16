import LandingPage from "./pages/LandingPage/"
import './App.css'
import CreateRoom from "./components/Forms/CreateRoom"
import JoinRoom from "./components/Forms/JoinRoom"
import RoomPage from "./pages/RoomPage"
import {Routes,Route} from "react-router-dom"
import io from "socket.io-client"
import { useState,useEffect } from "react"
import {ToastContainer,toast} from "react-toastify"
import { Container } from "./components/Container"

//start both nodemon server.js and yarn run dev on diff terminals to start this

const server = "http://localhost:5000";
const connectionOptions={
  "force new connection":true,
  reconnectionAttempts:"Infinity",
  timeout:10000,
  transports:["websocket"]
}

const socket = io(server,connectionOptions)

function App() {

 const [user,setUser]=useState(null)
 const [users,setUsers] = useState([])

useEffect(()=>{
  socket.on("room-joined",(data)=>{
    if(data.success){
      console.log("userJoined sucessfully:",data.users)
      setUsers(data.users)
    }
    else{
      console.log("something went wrong")
    }
  })
  socket.on("allUsers",data=>{
    setUsers(data);
  })

  socket.on("userJoinedMessageBroadcasted",(data)=>{
    console.log(`${data} joined the room`)  
    toast.info(`${data} joined the room`)
  })

  socket.on("userLeftMessageBroadcasted",(data)=>{
    console.log(`${data.name} left the room`);
    toast.info(`${data.name} left the room`)
  })
},[])

  return (
    <>
    {/* <Container/> */}
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/create-room" element={<CreateRoom socket={socket} setUser={setUser}/>} />
        <Route path="/join-room" element={<JoinRoom socket={socket} setUser={setUser}/>} />
        <Route path="/:roomid" element={<RoomPage user={user} socket={socket} users={users}/>}/>
      </Routes>
    </>
  )
}

export default App
