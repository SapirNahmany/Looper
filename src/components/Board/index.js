import React, { useState, useRef } from 'react';
import * as LooperManager from '../../LooperManager';
import Pad from '../Pad';
import ControlButton from '../ControlButton';
import './styles.css'

const SAMPLE_LENGHT_MS = 8*1000 + 100;

function Board() {

    //const [isAllStopped, setIsAllStopped] = useState(false);
    const loopSamplesDataRef = useRef();
    const intervalIdRef = useRef();
    const [loopSamplesData, setLoopSamplesData] = useState(LooperManager.loopSamples);
    console.log('board render')
    
    const setIsPlaying = function(id, isPlaying) {   
        console.log('in Board: pad ',id, 'was cliked. value of isPlaying: ', isPlaying)
        setLoopSamplesData((currentLoopSamplesData)=> {
            let updatedLoopSamplesData = LooperManager.setIsPlaying(currentLoopSamplesData, id, isPlaying); //update loopSamples hash map
            if(isPlaying){
                const isSomeSamplePlaying = LooperManager.isSomeSamplePlaying(currentLoopSamplesData);
                if(!isSomeSamplePlaying){
                    //sample[id] is the first one to play. 
                    LooperManager.startSample(updatedLoopSamplesData);
                    
                    intervalIdRef.current = setInterval(()=> {   // get id
                        LooperManager.startSample(loopSamplesDataRef.current);                    
                    }, SAMPLE_LENGHT_MS);
                }
            }
            else
            {
                LooperManager.stopAudio(updatedLoopSamplesData[id].audio);
                const isOtherSamplePlaying = LooperManager.isSomeSamplePlaying(updatedLoopSamplesData);

                if(!isOtherSamplePlaying){
                    // no one is playing. cancel interval
                    clearInterval(intervalIdRef.current);
                    intervalIdRef.current=undefined;
                }
            }
            loopSamplesDataRef.current = updatedLoopSamplesData;
            return updatedLoopSamplesData;
        });
        console.log(loopSamplesData)
    }
    const onClickStopHandler = function(){
        console.log("Stop button was cliked");
        LooperManager.stopAllAudio(loopSamplesData);
        if(intervalIdRef.current){
            clearInterval(intervalIdRef.current);
        }
    }
 
    const onClickPlayHandler = function(){
        LooperManager.startSample(loopSamplesData);
        
    }
    return(

        <div className = "board-style">
                <ControlButton label = "Play" onClickHandler={onClickPlayHandler}/>
                <ControlButton label = "Stop" onClickHandler={onClickStopHandler}/> 

                
            {   
                Object.entries(loopSamplesData).map(([id, sample]) => <Pad id={id} {...sample} setIsPlaying={setIsPlaying}/>)
            }
           
        </div>

    );
}

export default Board;
