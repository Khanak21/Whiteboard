import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import {useNavigate} from "react-router-dom"

const JoinRoom = ({setUser,socket}) => {
    const [id,setId]=useState("")//room id
    const [name,setName]=useState("")

    const navigate = useNavigate()

    // function handleJoinRoom(e){
    //     e.preventDefault()
    //     console.log("im clicked")
    //     // const userData={
    //     //     name,
    //     //     id,
    //     //     userId:uuidv4(),
    //     //     host:false,
    //     //     presenter:false
    //     // }
    //     // setUser(userData)
        // navigate(`/${id}`)
    //     // socket.emit('user-joined',userData)
    //     // console.log(userData)
    // }
    
function handleClick(){
    console.log("hi")
}
  return (
    <div>
        {/* <form> */}
            {/* <div> */}
                {/* <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name"></input>
                <input id="input" value={id} onChange={(e)=>setId(e.target.value)} type="text" placeholder="Enter Room Code"></input>
            </div> */}
        <button onClick={handleClick}>Join Room</button>
        {/* </form> */}
    </div>
  )
}

export default JoinRoom