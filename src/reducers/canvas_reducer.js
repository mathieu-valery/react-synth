const canvasReducer = (state, action) => { 
    if (state === undefined) {
        return []; 
    }
    switch (action.type) { 
        case 'SET_CANVAS':
            return action.payload; 
        default:
          return state;
    }
};
export default canvasReducer;