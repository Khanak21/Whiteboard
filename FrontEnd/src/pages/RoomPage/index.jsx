import {useState,useRef,useEffect} from 'react'
import Whiteboard from '../../components/Whiteboard'
import Chat from '../../components/ChatBar'
import './index.css'

const RoomPage = ({user,socket,users}) => {
    const [tool,setTool] = useState("pencil")
    const [color,setColor] = useState("color")
    const [elements,setElements] = useState([])
    const [history,setHistory] = useState([])
    const [openedUserBar,setOpenedUserBar] = useState(false)
    const [openedChatBar,setOpenedChatBar] = useState(false)

    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    function handleClear(){
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        // context.fillRect("white")

        context.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);

        setElements([])
    }

    function handleUndo(){ 
        console.log("undo")
        setHistory(prevHistory=>[
            ...prevHistory,elements[elements.length-1]
        ])
        //important to return the elements
        setElements(prevElements=>{
           return prevElements.slice(0,prevElements.length-1)
        })

        if(elements.length===1){
            handleClear()
        }
        
    }
   
    function handleRedo(){
        setHistory(prevHistory=>{
            return prevHistory.slice(0,prevHistory.length-1)
        })
        
        setElements(prevElements=>[
            ...prevElements,history[history.length-1]
        ])

    }


  return (
    <div className='bg-purple-800 w-[100%] h-[100vh] flex flex-col justify-center items-center'>
      <div className='flex justify-start my-8'>  <button onClick={()=>setOpenedUserBar(true)} className=' mx-2 bg-white shadow-lg rounded-md px-2 py-1'>Users</button>
        <button onClick={()=>setOpenedChatBar(true)} className=' mx-2 bg-white shadow-lg rounded-md px-2 py-1'>Chat</button>
        <div className='tracking-wide text-2xl text-white'>Welcome to whiteboard sharing app<span>[users online:{users.length}]</span></div>
        </div>
        {openedUserBar && (
            <div style={{
                  height: "100vh",
                  width: "250px",
                  position: "fixed",
                  top: "0",
                  left: "0",
                  backgroundColor: "white",
                  color: "white",
              }}
              className='shadow-lg'>
                  <button onClick={()=>setOpenedUserBar(false)} className='p-2 w-[2em] h-[2em] text-center items-center flex text-black absolute'>✖</button>
                  <div style={{color:"black"}}>
                    {users.map((usr,index)=>(
                        <p key={index*999}>{usr.name}{user && user.userId===usr.userId && "(You)"}</p>

                    ))}
                    </div></div>
        )}
        {
            openedChatBar && (
                <Chat setOpenedChatBar={setOpenedChatBar} socket={socket}/>

            )
        }

                <div className='flex p-2'>
                <div className='flex'>
                    <div className='mx-2 text-white'>
                        <input
                        type="radio"
                        id="pencil"
                        name="tool"
                        checked={tool==="pencil"}
                        value="pencil"
                        onChange={(e)=>setTool(e.target.value)}/>
                        <label htmlFor="pencil">Pencil</label>
                    </div>
                    <div className='mx-2 text-white'>
                        <input
                        type="radio"
                        id="line"
                        name="tool"
                        value="line"
                        checked={tool==="line"}
                        onChange={(e)=>setTool(e.target.value)}/>
                        <label htmlFor="line">Line</label>
                    </div>
                    <div className='mx-2 text-white'>
                        <input
                        type="radio"
                        id="rectangle"
                        name="tool"
                        checked={tool==="rect"}
                        value="rect"
                        onChange={(e)=>setTool(e.target.value)}/>
                        <label htmlFor="rectangle">Rectangle</label>
                    </div>
                </div>
                <div className='mx-2'>
                    <input
                    type="color"
                    name="color"
                    value={color}
                    onChange={(e)=>setColor(e.target.value)}/>
                </div>
                <div>
                    <button className="undo mx-2 bg-white shadow-lg rounded-md px-2 py-1" 
                    onClick={handleUndo}
                    disabled={elements.length===0}>Undo</button>
                    <button className=" mx-2 bg-white shadow-lg rounded-md px-2 py-1 redo"  
                    onClick={handleRedo}
                    disabled={history.length ===0}>Redo</button>
                </div>
                <div>
                    <button className="mx-2 bg-red-500 shadow-lg rounded-md px-2 py-1 clear"  onClick={handleClear}>Clear Canvas</button>
                </div>
            </div>

            
         
        <Whiteboard 
        canvasRef={canvasRef} 
        ctxRef={ctxRef}
        elements={elements}
        setElements={setElements}
        tool={tool}
        color={color}
        setColor={setColor}
        socket={socket}
        user={user}/>

    </div>
  )
}

export default RoomPage