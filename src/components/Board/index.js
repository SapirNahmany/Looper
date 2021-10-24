import React, { useState, useRef } from 'react';
import * as LooperManager from '../../LooperManager';
import * as LooperLocalStorage from '../../LooperLocalStorage';
import Pad from '../Pad';
import ControlButton from '../ControlButton';
import './styles.css'

const SAMPLE_LENGHT_MS = 8*1000 + 100;
let lastId;
function Board() {

    //const [isAllStopped, setIsAllStopped] = useState(false);
    const loopSamplesDataRef = useRef();
    const intervalIdRef = useRef();
    const [loopSamplesData, setLoopSamplesData] = useState(()=>LooperManager.getLoopSamples());
    console.log('board render')
    
    const setIsPlaying = function(id, isPlaying) {   
        console.log('in Board: pad ',id, 'was cliked. value of isPlaying: ', isPlaying)
        setLoopSamplesData((currentLoopSamplesData)=> {
            let updatedLoopSamplesData = LooperManager.setIsPlaying(currentLoopSamplesData, id, isPlaying); //update loopSamples hash map
            if(isPlaying){
                //const isSomeSamplePlaying = LooperManager.isSomeSamplePlaying(currentLoopSamplesData);
                if(!intervalIdRef.current){
                    //sample[id] is the first one to play. 
                    LooperManager.startSample(updatedLoopSamplesData);
                    
                    const x = setInterval(()=> {   // intervalIdRef.current will get the id of the interval
                        LooperManager.startSample(loopSamplesDataRef.current);                    
                    }, SAMPLE_LENGHT_MS);
                    console.log('last id set to ', x);
                    lastId = x
                    console.log('set interval ',intervalIdRef.current, x, lastId)
                    intervalIdRef.current = x;

                }
            }
            else // a pad was cliked to pause
            {
                LooperManager.stopAudio(updatedLoopSamplesData[id].audio);
                const isOtherSamplePlaying = LooperManager.isSomeSamplePlaying(updatedLoopSamplesData);

                if(!isOtherSamplePlaying){
                    // no one is playing. cancel interval
                    console.log('clear interval ',intervalIdRef.current, lastId)
                    clearInterval(intervalIdRef.current);
                    clearInterval(intervalIdRef.current-1);
                    intervalIdRef.current=undefined;
                }
            }
            loopSamplesDataRef.current = updatedLoopSamplesData;
            LooperLocalStorage.setPlayingSamplesIds(updatedLoopSamplesData);
            return updatedLoopSamplesData;
        });
        console.log(loopSamplesData)
    }
    const onClickStopHandler = function(){
        console.log("Stop button was cliked");
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
        intervalIdRef.current = setInterval(()=> {   // intervalIdRef.current will get the id of the interval
            console.log(loopSamplesData)
            LooperManager.startSample(loopSamplesDataRef.current);                    
        }, SAMPLE_LENGHT_MS);
    }
    
    // useEffect(() => {
    //     return () => intervalIdRef.current && clearInterval(intervalIdRef.current)
    // }, [])

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
