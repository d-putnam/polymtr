// Request MIDI access
navigator.requestMIDIAccess()
  .then(onMIDISuccess, onMIDIFailure);
// Note failure
function onMIDIFailure() {
  console.log('Could not access your MIDI devices.');
}
// On success, set up listeners
function onMIDISuccess(midiAccess) {
  for (var input of midiAccess.inputs.values()) {
    input.onmidimessage = getMIDIMessage;
  }
}

    // When MIDI message received => update UI, update uniforms    
getMIDIMessage = (midiMessage) => {
  console.log(midiMessage.data)
  // midiMessage.data = [msg-type (control=176), target (cc#), value (0-127)]
  let data = midiMessage.data;
  
  // Look for CC messages specifically (data[0] == 176)
  // Program change on (data[0] == 192)
  if (data[0] == 176 || data[0] == 192) {
    // SLIDER CHANGE MESSAGES
    if (data[1] <= 15) {
      // Get the CC number
      let element = getTarget(data[1]);
      // Scale the value
      let val = Nexus.scale(data[2], 0, 127, element.min, element.max)

      console.log(element)
      // Set the new slider value
      element.value = val;
    } 
  }
}

function getTarget(index) {
  if (index == 0) {
    return kick_atk;
  } else if (index == 1) {
    return kick_release;
  } else if (index == 2) {
    return hats_atk;
  } else if (index == 3) {
    return hats_release;
  } else if (index == 4) {
    return snare_atk;
  } else if (index == 5) {
    return snare_release;
  } else if (index == 6) {
    return perc_atk;
  } else if (index == 7) {
    return perc_release;
  } 
  else if (index == 8) {
    return kick_cutoff
  } else if (index == 9) {
    return kick_dist
  } else if (index == 10) {
    return hats_detune;
  } else if (index == 11) {
    return hats_harm;
  } else if (index == 12) {
    return snare_cutoff;
  } else if (index == 13) {
    return snare_res;
  } else if (index == 14) {
    return perc_tune;
  } else if (index == 15) {
    return perc_dist;
  }
}