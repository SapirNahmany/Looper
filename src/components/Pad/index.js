import React, {useState} from 'react';
import { loopSamples } from '../../LooperManager';
import './styles.css'

function Pad({id, title, isPlaying, image, setIsPlaying}) {

    const clickHandler = () =>{
        setIsPlaying(id, !isPlaying);
    };

    return(

        <div className={`pad ${isPlaying? 'pad-playing': ''}`}>
            <button onClick={clickHandler}>
                <h2>{id}</h2>
                <img src = {image} height="80px" width="80px"/>
                <h3>{isPlaying ? 'Pause': 'Play'}</h3>
            </button>
        </div>

    );
}

export default Pad;
