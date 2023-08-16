import React from 'react'
import { Link } from 'react-router-dom'
const LandingPage = () => {
  return (
    <div className="text-center">

       <Link to='/create-room'><button className="mt-[20%] mx-2 w-1/2 bg-purple-700 mx-auto rounded-lg hover:bg-purple-600 p-2 text-white">Create Room</button></Link>
        <Link to='/join-room'><button className="my-[5px] mx-2 w-1/2 bg-purple-700 rounded-lg hover:bg-purple-600 p-2 text-white">Join Room</button></Link>
    </div>
  )
}

export default LandingPage