const cutoffReducer = (state, action) => { 
    if (state === undefined) {
        return []; 
    }
    switch (action.type) { 
        case 'SET_CUTOFF':
            return action.payload; 
        default:
          return state;
    }
};
export default cutoffReducer;