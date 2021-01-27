export function setWaveform(waveform) {
    
  return {
    type: 'SET_WAVEFORM', 
    payload: waveform
    } 
}

export function setCutoff(cutoff) {  

  return {
    type: 'SET_CUTOFF', 
    payload: cutoff
    } 
}

export function setCanvas(canvas) {  
  
  return {
    type: 'SET_CANVAS', 
    payload: canvas
    } 
}