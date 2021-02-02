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

export function setEnvelope(attack, decay, sustain, release) {  
  
  return {
    type: 'SET_ENVELOPE', 
    payload: {attack: Number(attack), decay: Number(decay), sustain: Number(sustain), release: Number(release) }
    } 
}