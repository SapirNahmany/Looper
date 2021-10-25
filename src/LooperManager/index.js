import * as LooperLocalStorage from '../LooperLocalStorage';

import futureFunkBeats25 from '../media/audio/120_future_funk_beats_25.mp3';
import stutterBreakBeats_16 from '../media/audio/120_stutter_breakbeats_16.mp3';
import bassWarwick from '../media/audio/Bass Warwick heavy funk groove on E 120 BPM.mp3';
import electricGuitar from '../media/audio/electric guitar coutry slide 120bpm - B.mp3';
import fud120StompySlosh from '../media/audio/FUD_120_StompySlosh.mp3';
import grooveB120bpmTanggu from '../media/audio/GrooveB_120bpm_Tanggu.mp3';
import mazePolitics120Perc from '../media/audio/MazePolitics_120_Perc.mp3';
import pas3Groove1 from '../media/audio/PAS3GROOVE1.03B.mp3'; 
import silentStar120EmOrganSynth from '../media/audio/SilentStar_120_Em_OrganSynth.mp3';

import icon1 from '../media/images/icon1.jpg'
import icon2 from '../media/images/icon2.png'
import bass from '../media/images/bass.jpg'
import guitar from '../media/images/guitar.jpg'
import icon3 from '../media/images/icon3.png'
import tarbuka from '../media/images/tarbuka.png'
import icon4 from '../media/images/icon4.png'
import drums from '../media/images/drums.png'
import organ from '../media/images/organ.jpg'

export const loopSamples = {
    1: {
        title: '120_future_funk_beats_25',
        audio: new Audio(futureFunkBeats25),  // HTML Audio Element
        isPlaying: false,
        image: icon1
    },
    2:{
        title: '120_stutter_breakbeats_16',
        audio: new Audio(stutterBreakBeats_16),
        isPlaying: false,
        image: icon2
    },
    3:{
    
        title: 'Bass Warwick heavy funk groove on E 120 BPM',
        audio: new Audio(bassWarwick),
        isPlaying: false,
        image: bass
    },
    4:{
        title: 'electric guitar coutry slide 120bpm - B',
        audio: new Audio(electricGuitar),
        isPlaying: false,
        image: guitar
    },
    5:{
        title: 'FUD_120_StompySlosh',
        audio: new Audio(fud120StompySlosh),
        isPlaying: false,
        image: drums
    },
    6:{
        title: 'GrooveB_120bpm_Tanggu',
        audio: new Audio(grooveB120bpmTanggu),
        isPlaying: false,
        image: tarbuka
    },
    7:{
        title: 'MazePolitics_120_Perc',
        audio: new Audio(mazePolitics120Perc),
        isPlaying: false,
        image: icon4
    },
    8:{
        title: 'PAS3GROOVE1.03B',
        audio: new Audio(pas3Groove1),
        isPlaying: false,
        image: icon3
    },
    9:{
        title: 'SilentStar_120_Em_OrganSynth',
        audio: new Audio(silentStar120EmOrganSynth),
        isPlaying: false,
        image: organ
    }
};
    
export function setIsPlaying(loopSamples, id, isPlaying){
    return Object.entries(loopSamples).reduce((result, [sampleId, sample])=> {
        if(id === sampleId){
            return {
                ...result,       // aggregated result
                [sampleId] : {
                    ...sample, 
                    isPlaying   //updating property isPlaying
                }
            };
        };

        return {
            ...result, 
            [sampleId] : sample
        };
    }, {});
}

export function isSomeSamplePlaying(samplesData) {
    return Object.values(samplesData).some(({isPlaying}) =>  isPlaying);
}

export function startSample(samplesData){
    Object.values(samplesData).forEach(({isPlaying, audio})=>{
        if(isPlaying){
                audio.currentTime = 0;
                audio.play();
        }
    });
}

export function stopAudio(audio){
    audio.pause()
    audio.currentTime = 0;
}

export function stopAllAudio(samplesData){
    Object.values(samplesData).forEach(({isPlaying, audio})=>{
        if(isPlaying){
            stopAudio(audio);
        }
    });
}

export function getLoopSamples(){
    return LooperLocalStorage.enrichPlayingSamples(loopSamples);
}