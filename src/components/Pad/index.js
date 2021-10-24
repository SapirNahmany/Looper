import React from 'react';
import './styles.css'

function Pad({id, isPlaying, image, setIsPlaying}) {

    const clickHandler = () =>{
        setIsPlaying(id, !isPlaying);
    };

    return(

        <div className={`pad ${isPlaying? 'pad-playing': ''}`}>
            <button onClick={clickHandler}>
                <span>{id}</span>
                <img src = {image} height="80px" width="80px"/>
                <span>{isPlaying ? 'Pause': 'Play'}</span>
            </button>
        </div>

    );
}

export default Pad;
