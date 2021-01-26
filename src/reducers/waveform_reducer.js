const waveformReducer = (state, action) => { 
    if (state === undefined) {
        return []; 
    }
    switch (action.type) { 
        case 'SET_WAVEFORM':
            return action.payload; 
        default:
          return state;
    }
};
export default waveformReducer;