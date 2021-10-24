const PLAYING_IDS_STORAGE_KEY = 'PLAYING_IDS';

export function setPlayingSamplesIds(loopSamples){
    if(!localStorage) return;

    const playingIds = Object.entries(loopSamples).filter(([sampleId, sample])=>{
        return sample.isPlaying;
    }).reduce((result, [sampleId])=> {
        return {
            ...result, 
            [sampleId]: true
        };
    },{});

    localStorage.setItem(PLAYING_IDS_STORAGE_KEY, JSON.stringify(playingIds));
}

export function enrichPlayingSamples(loopSamples){
    if(!localStorage) return loopSamples;

    const playingIds = JSON.parse(localStorage.getItem(PLAYING_IDS_STORAGE_KEY));
    if(!playingIds) return loopSamples;

    return Object.entries(loopSamples).reduce((result, [sampleId, sample])=> {
        if(playingIds[sampleId]){
            return {
                ...result, 
                [sampleId] : {
                    ...sample, 
                    isPlaying: true
                }
            };
        };

        return {
            ...result, 
            [sampleId] : sample
        };
    }, {});
}