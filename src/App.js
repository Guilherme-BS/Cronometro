import React, {useEffect, useState } from 'react';
import './App.css';

export default function App(){
  const [contador , setContador] = useState(0)
  const [start, setStart] = useState(false)
  let contInterval = null
  const handleClick = ()=>{
    setStart(!start)
  }
  useEffect(()=>{
    if(contInterval != null && start == false){
      clearInterval(contInterval)
    }
    else if(contInterval == null && start == true){
      contInterval = setInterval(()=>{console.log(contador),setContador((contador)=>contador+0.1)},100)
    }
  },[start])
  return(
    <div className='container'>
      <div className='imgCronometro'>
        <img src={require("./img/Cronometro.png")} className='img'></img>
        <a className="timer"> {contador.toFixed(1)} </a>
      </div>
      <div className='buttons'>
        <button className='btn' onClick={handleClick}>{start ? 'stop':'start'}</button>
        <button className='btn'>Clear</button>
      </div>
    </div>
  );
};
