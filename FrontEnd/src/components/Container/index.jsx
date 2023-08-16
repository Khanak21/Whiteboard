import React from 'react'
import { Board } from '../../Board'

export const Container = () => {
  return (
    <div className='h-[100vh] w-100 bg-black flex flex-col justify-center items-center'>
        <div>
            <input type="color"></input>
        </div>
        <div>
            <Board/>
        </div>
    </div>
  )
}
