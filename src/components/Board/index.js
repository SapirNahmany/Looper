import React, { useState, useRef } from 'react';
import * as LooperManager from '../../LooperManager';
import * as LooperLocalStorage from '../../LooperLocalStorage';
import Pad from '../Pad';
import ControlButton from '../ControlButton';
import './styles.css'

const SAMPLE_LENGHT_MS = 8*1000 + 100;

function Board() {

    const loopSamplesDataRef = useRef();
    const intervalIdRef = useRef();
    const [loopSamplesData, setLoopSamplesData] = useState(()=>LooperManager.getLoopSamples());
    
    const setIsPlaying = function(id, isPlaying) {   
        setLoopSamplesData((currentLoopSamplesData)=> {
            let updatedLoopSamplesData = LooperManager.setIsPlaying(currentLoopSamplesData, id, isPlaying); //update loopSamples hash map
            if(isPlaying){
                // a pad was clicked to play
                if(!intervalIdRef.current){
                    //this sample is the first one to play. 
                    LooperManager.startSample(updatedLoopSamplesData);
                    
                    intervalIdRef.current = setInterval(()=> {   // intervalIdRef.current will get the id of the interval
                        LooperManager.startSample(loopSamplesDataRef.current);                    
                    }, SAMPLE_LENGHT_MS);
                }
            }
            else // a pad was clicked to pause
            {
                LooperManager.stopAudio(updatedLoopSamplesData[id].audio);
                const isOtherSamplePlaying = LooperManager.isSomeSamplePlaying(updatedLoopSamplesData);

                if(!isOtherSamplePlaying){
                    // no one is playing. cancel interval
                    clearInterval(intervalIdRef.current);
                    clearInterval(intervalIdRef.current-1);
                    intervalIdRef.current=undefined;
                }
            }
            loopSamplesDataRef.current = updatedLoopSamplesData;
            LooperLocalStorage.setPlayingSamplesIds(updatedLoopSamplesData);
            return updatedLoopSamplesData;
        });
    }
    const onClickStopHandler = function(){
        LooperManager.stopAllAudio(loopSamplesData);
        if(intervalIdRef.current){
            clearInterval(intervalIdRef.current);
            intervalIdRef.current=undefined;
        }
    }
 
    const onClickPlayHandler = function(){
        const isSomeSamplePlaying = LooperManager.isSomeSamplePlaying(loopSamplesData);
        if(!isSomeSamplePlaying) return;

        LooperManager.startSample(loopSamplesData);
        intervalIdRef.current = setInterval(()=> {
            LooperManager.startSample(loopSamplesDataRef.current);                    
        }, SAMPLE_LENGHT_MS);
    }
    
    return(

        <div className = "board">
            <div className="pads">  
                {   
                    Object.entries(loopSamplesData).map(([id, sample]) => <Pad id={id} {...sample} setIsPlaying={setIsPlaying}/>)
                }
            </div> 

            <div className = "controls-panel">
                <ControlButton label = "Play" onClickHandler={onClickPlayHandler}/>
                <ControlButton label = "Stop" onClickHandler={onClickStopHandler}/> 
            </div>
        </div>

    );
}

export default Board;
