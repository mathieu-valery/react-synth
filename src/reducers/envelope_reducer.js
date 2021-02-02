const envelopeReducer = (state, action) => { 
    if (state === undefined) {
        return []; 
    }
    switch (action.type) { 
        case 'SET_ENVELOPE':
            return action.payload; 
        default:
          return state;
    }
};
export default envelopeReducer;