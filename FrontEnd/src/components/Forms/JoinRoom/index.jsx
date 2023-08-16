import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import {useNavigate} from "react-router-dom"
import './index.css'

const JoinRoom = ({setUser,socket}) => {
    const [id,setId]=useState("")//room id
    const [name,setName]=useState("")

    const navigate = useNavigate()

    function handleJoinRoom(e){
        e.preventDefault()
        const userData={
            name,
            id,
            userId:uuidv4(),
            host:false,
            presenter:false
        }
        setUser(userData)
        navigate(`/${id}`)
        socket.emit('user-joined',userData)
        console.log(userData)
    }
    
function handleClick(){
    console.log("hi")
}
  return (
    <div className='bg-purple-800 w-[100%] h-[100vh] flex justify-center items-center'>
         <form className='bg-white rounded-lg w-[25%] h-[50%] flex flex-col p-4 justify-center'> 
            <h1 className='font-bold text-center text-xl'>JOIN ROOM</h1>
             <div> 
                 <input type="text" className='my-2 rounded-md border-2 w-full p-2' value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name"></input>
                <input id="input" className='my-2 rounded-md border-2 w-full p-2' value={id} onChange={(e)=>setId(e.target.value)} type="text" placeholder="Enter Room Code"></input>
            </div>
        <button className="submit text-center bg-purple-700 w-full mb-[10px] rounded-md mt-2 p-2 text-white" onClick={handleJoinRoom}>Join Room</button>
        </form>
    </div>
  )
}

export default JoinRoom