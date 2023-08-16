import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import {useNavigate} from "react-router-dom"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {ToastContainer,toast} from "react-toastify"
import './index.css'

const CreateRoom = ({setUser,socket}) => {
    const [id,setId]=useState(uuidv4())//room id
    const [name,setName]=useState("")

    function handleCodeGen(){
        let code = uuidv4()
        setId(code);
    }

    const navigate = useNavigate()

    function handleCreateRoom(e){
        e.preventDefault()//to prevent submit on click
        const userData={
            name,
            id,
            userId:uuidv4(),
            host:true,
            presenter:true
        }
        setUser(userData)
        navigate(`/${id}`)
        socket.emit('user-joined',userData)
        console.log(userData)
    }

    function handleCopyText(e){
        e.preventDefault()
        toast.success("Room Code copied");
    }

  return (
    <div className='bg-purple-800 w-[100%] h-[100vh] flex justify-center items-center'>
      
        <form className='bg-white rounded-lg w-[25%] h-[50%] flex flex-col p-4 justify-center'>
            <h1 className='font-bold text-center text-xl'>CREATE ROOM</h1>
            
            <div>
                <input className='my-2 rounded-md border-2 w-full p-2' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name"></input>
            </div>
            <div className='flex -mx-2'>
                <input className='m-2 bg-slate-200 p-2 w-[60%]' id="input" type="text" disabled value={id} placeholder="Generate Room Code"></input>
                
                <div className='flex mx-auto my-1'><button className="hover:bg-slate-200 p-1 rounded-md" type="button" onClick={handleCodeGen}>Generate</button>
                <CopyToClipboard text={id}><button onClick={handleCopyText} className='hover:bg-slate-200 p-1 rounded-md'>Copy</button></CopyToClipboard></div>
                <ToastContainer/>
            </div>
            <button className="submit text-center bg-purple-700 w-full mb-[10px] rounded-md mt-2 p-2 text-white" onClick={handleCreateRoom}>Create Room</button>
        </form>
    </div>
  )
}

export default CreateRoom