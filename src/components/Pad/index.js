import React, {useState} from 'react';
import { loopSamples } from '../../LooperManager';
import './styles.css'

function Pad({id, title, isPlaying, setIsPlaying}) {

    const clickHandler = () =>{
        setIsPlaying(id, !isPlaying);
    };

    return(

        <div className={`pad${isPlaying? '-change': ''}`}>
            <button onClick={clickHandler}>
            <h2>{id}</h2>
            <h4>{title}</h4>
            <h3>{isPlaying ? 'Pause': 'Play'}</h3>
               </button>
        </div>

    );
}

export default Pad;
