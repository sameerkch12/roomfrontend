import React from 'react'
import Navbar from '../components/Navbar'
import HotelList from '../components/HotelList'
import Map from '../components/Map'
const Home = () => {
  return (
    <div className='bg-slate-100 flex flex-col' >
      <div >
        <Navbar/>
      </div>
      <div className=' flex flex-row'>
        <div className=' h-full w-2/3'>
        <HotelList/>
        </div>
        <div className='m-10 border border-black rounded-lg w-1/3 h-full'>
        <Map className="rounded-lg"/>
        </div>
      </div>
    </div>
  )
}

export default Home