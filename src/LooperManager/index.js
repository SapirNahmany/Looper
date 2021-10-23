import futureFunkBeats25 from '../loopSamples/120_future_funk_beats_25.mp3';

export const loopSamples = {
    1: {
        title: '120_future_funk_beats_25',
        audio: new Audio(futureFunkBeats25),
        isPlaying: false
    },
    2:{
        title: '120_stutter_breakbeats_16',
        audio: new Audio('\\loopSamples\\120_stutter_breakbeats_16.mp3'),
        isPlaying: false
    },
    3:{
    
        title: 'Bass Warwick heavy funk groove on E 120 BPM',
        audio: new Audio('\\loopSamples\\Bass Warwick heavy funk groove on E 120 BPM.mp3'),
        isPlaying: false
    },
    4:{
        title: 'electric guitar coutry slide 120bpm - B',
        audio: new Audio('\\loopSamples\\electric guitar coutry slide 120bpm - B.mp3'),
        isPlaying: false
    },
    5:{
        title: 'FUD_120_StompySlosh',
        audio: new Audio('\\loopSamples\\FUD_120_StompySlosh.mp3'),
        isPlaying: false
    },
    6:{
        title: 'GrooveB_120bpm_Tanggu',
        audio: new Audio('\\loopSamples\\GrooveB_120bpm_Tanggu.mp3'),
        isPlaying: false
    },
    7:{
        title: 'MazePolitics_120_Perc',
        audio: new Audio('\\loopSamples\\MazePolitics_120_Perc.mp3'),
        isPlaying: false
    },
    8:{
        title: 'PAS3GROOVE1.03B',
        audio: new Audio('\\loopSamples\\PAS3GROOVE1.03B.mp3'),
        isPlaying: false
    },
    9:{
        title: 'SilentStar_120_Em_OrganSynth',
        audio: new Audio('\\loopSamples\\SilentStar_120_Em_OrganSynth.mp3'),
        isPlaying: false
    }
};
window.x  = loopSamples;
    
export function setIsPlaying(loopSamples, id, isPlaying){
    return Object.entries(loopSamples).reduce((result, [sampleId, sample])=> {
        if(id === sampleId){
            return {
                ...result, 
                [sampleId] : {
                    ...sample, 
                    isPlaying
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
            stopAudio(audio);
        // //             audio.currentTime = 0;

            audio.play();

            // if (audio.paused) {
            //     audio.play();
            // }else{
            //     audio.currentTime = 0
            // }
        }
    });
}

export function stopAudio(audio){
    audio.pause();
    audio.currentTime = 0;
}

