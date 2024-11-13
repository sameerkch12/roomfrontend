import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './index.css';
import  Home  from "./pages/Home";
import HotelRegister from './pages/HotelRegister';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/add-rent' element={<HotelRegister/>} />
        {/* <Route path="/map" element={<Map />} /> */}
      </Routes>
    </div>
  );
};

export default App;
