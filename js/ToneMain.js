// Set the NexusUI context to the ToneJS context
// (necessary for the oscilloscope to see our audio)
Nexus.context = Tone.context._context._nativeEventTarget

// Set the default colors for our UI elements
Nexus.colors.fill = "rgba(200,200,200,0.2)"
Nexus.colors.accent = "rgba(34, 127, 127)"

// Set the initial latency mode
Tone.context.latencyHint = 'interactive' // or 'playback' or 'balanced'



// notes array[0]-[3] will contain our four active sequences
// values will be 1.0 or 0.3 (accent or non-accented volume level)
let notes = [...Array(4)].map(() => [...Array(16)].map(() => 1.0));

// probArray will be filled with random numbers
// Based on the patten threshold values, each value will become either a note or rest
let probArray = [];   


// Initialize our dial values
// Thresh1 = pattern density
// Thresh2 = accent density
let kickThresh1 = 64, kickThresh2 = 95,
    hatsThresh1 = 41, hatsThresh2 = 84,
    snareThresh1 = 15, snareThresh2 = 111,
    percThresh1 = 95, percThresh2 = 111;


//////
// COMPRESSOR
//////
// Compressor (after gain) is the end of our audio chain, so route it toDestination.
// Compression reduces volume, so connect it to a Gain node, then use compressor.reduction value
// for makeup level. Sequence this param for smooth-ish auto-gain
let compressorMakeup = new Tone.Gain(1).toDestination();
let compressor = new Tone.Compressor(-30, 3).connect(compressorMakeup);
// Give an arbitrary array to sequence
let compArr = ["C4"];
// update the makeup gain every 32nd note
let compSeq = new Tone.Sequence(
  (time, note) => {
    if (compressor.reduction < -1) {
      compressorMakeup.gain.rampTo(compressor.reduction / -2, 0.01);
    }
  }, compArr, "32n"
);
compSeq.start();



//////
// REVERB
//////
// Runs through EQ then goes to compressor
const verbEQ = new Tone.EQ3().connect(compressor)
const verb = new Tone.Reverb().connect(verbEQ);
verb.wet.value = 1;



//////
// KICK (channel 1)
//////
// Send is a gain node, controls level sent to reverb
const kickSend = new Tone.Gain(0).connect(verb);

// Highpass filter for resonance bass-boost -- connect to main and reverb send
const kickFilter = new Tone.Filter(60, "highpass").connect(compressor).connect(kickSend);
    // Set up a signal for controlling the filter frequency
    let kickFilterFreq = new Tone.Signal({
      value: "60",
      units: "frequency"
    }).connect(kickFilter.frequency);
    // Set up a signal for controlling the filter resonance
    let kickFilterRes = new Tone.Signal({
      value: "10",
      units: "frequency"
    }).connect(kickFilter.Q);

// Our distortion node -- connect to filter
const kickDist = new Tone.Distortion(.25).connect(kickFilter);

// Our volume node -- connects to distortion
const kickGain = new Tone.Gain(0.5).connect(kickDist);

// Our kick synth -- connect to gain/volume node
const kick = new Tone.MembraneSynth().connect(kickGain);
    // initial frequency
    let kickFreq = "60"
    // Set up a signal for controlling the kick detune
    let kickTune = new Tone.Signal({
      value: "C4",
      units: "frequency"
    }).connect(kick.detune);
    // initial FM value
    kick.octaves = 4
    // Kick envelope settings (built into MembraneSynth)
    kick.envelope.attack = 0.01;
    kick.envelope.decay = 0.3;
    kick.envelope.sustain = 0;
    kick.envelope.release = 0;

// Kick sequence
let kickPart = new Tone.Sequence(
  (time, note) => {
    kick.triggerAttackRelease(kickFreq, "+0.1", time, note);
  }, notes[0], "16n"
);
kickPart.start();



//////
// HATS (channel 2)
//////
// Send is a gain node, controls level sent to reverb
const hatsSend = new Tone.Gain(0).connect(verb);

// Delay connects to main output and reverb send
const hatsDelay = new Tone.PingPongDelay("0.98, 0.2").connect(compressor).connect(hatsSend)
hatsDelay.wet.value = 0;

// Our volume node -- connects to filter
const hatsGain = new Tone.Gain(0.5).connect(hatsDelay);

// Our hats synth -- connect to gain/volume node
const hats = new Tone.MetalSynth().connect(hatsGain);
    // Set the harmonicity
    hats.harmonicity = 7.85
    // Set up a signal for controlling the hats freq
    let hatsFreq = new Tone.Signal({
      value: "279",
      units: "frequency"
    }).connect(hats.frequency);
    // Set up a signal for controlling the hats detune
    let hatsTune = new Tone.Signal({
      value: "926",
      units: "frequency"
    }).connect(hats.detune);
    // Hats envelope settings 
    hats.envelope.attack = 0.01;
    hats.envelope.decay = 0.128;
    hats.envelope.sustain = 0;
    hats.envelope.release = 0;

// Hats sequence
let hatsPart = new Tone.Sequence(
  (time, note) => {
    hats.triggerAttackRelease("A4", "+0.2", time, note);
  }, notes[1], "16n"
);
hatsPart.start();



//////
// SNARE (channel 3)
//////
// Send is a gain node, controls level sent to reverb
const snareSend = new Tone.Gain(0).connect(verb)

// Filter connects to main output and reverb send
const snareFilter = new Tone.Filter(7556, "lowpass").connect(compressor).connect(snareSend);
    // Set up a signal for controlling the filter cutoff
    let snareFilterFreq = new Tone.Signal({
      value: "10000",
      units: "frequency"
    }).connect(snareFilter.frequency);
    // Set up a signal for controlling the filter resonance
    let snareFilterRes = new Tone.Signal({
      value: "10",
      units: "frequency"
    }).connect(snareFilter.Q);

// Our volume node -- connects to filter
const snareGain = new Tone.Gain(0.5).connect(snareFilter);

// Our snare synth -- connect to gain/volume node
const snare = new Tone.NoiseSynth().connect(snareGain);
  // Snare envelope settings 
  snare.envelope.attack = 0.01;
  snare.envelope.decay = 0.1;
  snare.envelope.sustain = 0;
  snare.envelope.release = 0;

// Snare sequence
let snarePart = new Tone.Sequence(
  (time, note) => {
    snare.triggerAttackRelease("+0.3", time, note);
  }, notes[2], "16n"
);
snarePart.start();



//////
// PERC (channel 4)
//////
// Send is a gain node, controls level sent to reverb
const percSend = new Tone.Gain(0).connect(verb)

// Distortion connects to main output and reverb send
const percDist = new Tone.Chebyshev(45).connect(compressor).connect(percSend);

// Our volume node -- connects to distortion
const percGain = new Tone.Gain(0.17322).connect(percDist);

// Our perc synth -- connect to gain/volume node
const perc = new Tone.MembraneSynth({
    attackNoise : 1,
    dampening : 3000,
    resonance : 0.85,
    octaves: 0.5
  }).connect(percGain);
    // Initial perc freqency
    let percFreq = "281.6"
    // Set up a signal for controlling the perc detune
    let percTune = new Tone.Signal({
      value: "440",
      units: "frequency"
    }).connect(perc.detune);
    // Initial perc envelope
    perc.envelope.attack = 0.13;
    perc.envelope.decay = 0.12;
    perc.envelope.release = 0.2;

// Perc sequence
let percPart = new Tone.Sequence(
  (time, note) => {
    perc.triggerAttackRelease(percFreq, "16n", time, note);
  }, notes[3], "16n"
);
percPart.start();



// updateProb is called upon any pattern change
// takes values from probArray, compares them to the threshold settings
// and updates the target notes array with an
function updateProb(index) {
  let track = probArray[index]
  let i = 0;
  track.forEach(step => {
    if (step >= getState(index).thresh1) {
      if (step >= getState(index).thresh2) {
        notes[index][i] = 1.0
      } else {
        notes[index][i] = 0.3
      }
    } else {
        notes[index][i] = null
    }
    getPart(index).events = notes[index];
    i++
  })
}


// call this the first time before multisliders are rendered by NexusUI
randomInit = () => {
  // Get four arrays of 16 random values (one per track)
  probArray = [...Array(4)].map(() => [...Array(16)].map(() => Math.floor(Math.random() * 127)));
  updateProb(0);
  updateProb(1);
  updateProb(2);
  updateProb(3);
}
randomInit();


// randomize a pattern and update the multislider
function randomizePattern(index) {
  // Get four arrays of 16 random values (one per track)
  probArray[index] = [...Array(16)].map(() => Math.floor(Math.random() * 127));
  // Set the multislider
  getMultislider(index).setAllSliders(probArray[index])
  // Convert to sequences
  updateProb(index);
}


// called by "randomize all" button
function randomizeAll() {
  randomizePattern(0);
  randomizePattern(1);
  randomizePattern(2);
  randomizePattern(3);
}


// returns sequence object
function getPart(index) {
  if (index === 0) {
    return kickPart;
  } else if (index === 1) {
    return hatsPart;
  } else if (index === 2) {
    return snarePart;
  } else if (index === 3) {
    return percPart;
  }
}

// returns pattern display object
function getMultislider(index) {
  if (index === 0) {
    return kick_mult;
  } else if (index === 1) {
    return hats_mult;
  } else if (index === 2) {
    return snare_mult;
  } else if (index === 3) {
    return perc_mult;
  } else {
    return [kick_mult, hats_mult, snare_mult, perc_mult];
  }
}

// returns threshold and accent values
function getState(index) {
  if (index === 0) {
    return {"thresh1": kickThresh1, "thresh2": kickThresh2}
  } else if (index === 1) {
    return {"thresh1": hatsThresh1, "thresh2": hatsThresh2}
  } else if (index === 2) {
    return {"thresh1": snareThresh1, "thresh2": snareThresh2}
  } else if (index === 3) {
    return {"thresh1": percThresh1, "thresh2": percThresh2}
  }
}