/* // */
// Global UI
/* // */


// Oscilloscope
let oscilloscope = new Nexus.Oscilloscope('#oscilloscope', {
  'size': [window.innerWidth, window.innerHeight]
})
// connect it to our audio node
oscilloscope.connect(compressor._compressor._nativeAudioNode);
// set the colors
oscilloscope.colorize("fill","rgb(40,40,40)");
oscilloscope.colorize("accent","rgba(255, 255, 255, 0.2)");
// watch for screen resize
window.onresize = () => {
  oscilloscope.resize(window.innerWidth, window.innerHeight);
}


// Power switch
let powerSwitch = new Nexus.Toggle('#power', {
  'size': [50,30],
  'state': false
})
// start/stop the audio context
powerSwitch.on('change', v => {
  if (v === true) {
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }
    Tone.Transport.start("+0.1");
  } else {
    Tone.Transport.stop();
  }
})


// Latency settings
let latencySettings = new Nexus.Select('#latency', {
  'size': [100,30],
  'options': ['interactive','balanced','playback']
})
latencySettings.on('change', v => {
  Tone.context.latencyHint = v.value
})
// Set colors
latencySettings.colorize("fill","rgb(190,190,190)")


// Tempo
let bpm = new Nexus.Number('#bpm', {
  'size': [40,30],
  'value': 116,
  'min': 60,
  'max': 160,
  'step': 1
})
bpm.on('change', v => {
  Tone.Transport.bpm.value = v
})
// Set colors
bpm.colorize("fill","rgb(190,190,190)")


// Randomize all button
let globalRandom = new Nexus.Button('#global-random', {
  'size': [40,40],
})
globalRandom.on('click', v => {
  randomizeAll();
})
// Set colors
globalRandom.colorize("mediumLight","rgb(150,150,150,0.9)")




/* // */
// Effects Rack
/* // */


// Compressor threshold (decibels)
let compThresh = new Nexus.Dial('#comp-thresh', {
  'size': [60,60],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': 0,
  'max': 100,
  'step': 0,
  'value': 40
})
compThresh.on('change', v => {
  compressor.threshold.value = v * -1;
})


// Compressor ratio (positive)
let compRatio = new Nexus.Dial('#comp-ratio', {
  'size': [60,60],
  'interaction': 'radial',
  'mode': 'relative', 
  'min': 1,
  'max': 20,
  'step': 0,
  'value': 3
})
compRatio.on('change', v => {
  compressor.ratio.value = v;
})


// Compressor attack (time)
let compAttack = new Nexus.Dial('#comp-attack', {
  'size': [40,40],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0.003
})
compAttack.on('change', v => {
  compressor.attack.value = v;
})


// Compressor release (time)
let compRelease = new Nexus.Dial('#comp-release', {
  'size': [40,40],
  'interaction': 'radial', 
  'mode': 'relative',
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0.25
})
compRelease.on('change', v => {
  compressor.release.value = v;
})


// Compressor knee (decibels)
let compKnee = new Nexus.Dial('#comp-knee', {
  'size': [40,40],
  'interaction': 'radial', 
  'mode': 'relative',
  'min': 0,
  'max': 40,
  'step': 0,
  'value': 30
})
compKnee.on('change', v => {
  compressor.knee.value = v;
})


// Reverb Decay (time)
let roomSizeSlider = new Nexus.Dial('#roomSize', {
  'size': [60,60],
  'interaction': 'radial',
  'mode': 'relative', 
  'min': 0.1,
  'max': 10,
  'step': 0,
  'value': 4.5
})
roomSizeSlider.on('change', v => {
  verb.decay = v;
})


// Reverb EQ Low (decibels)
let verb_low = new Nexus.Dial('#verb-low', {
  'size': [40,40],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': -10,
  'max': 10,
  'step': 0,
  'value': 0
})
verb_low.on('change', v => {
  verbEQ.low.value = v;
})


// Reverb EQ Mid (decibels)
let verb_mid = new Nexus.Dial('#verb-mid', {
  'size': [40,40],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': -10,
  'max': 10,
  'step': 0,
  'value': 0
})
verb_mid.on('change', v => {
  verbEQ.mid.value = v;
})    


// Reverb EQ High (decibels)
let verb_high = new Nexus.Dial('#verb-high', {
  'size': [40,40],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': -10,
  'max': 10,
  'step': 0,
  'value': 0
})
verb_high.on('change', v => {
  verbEQ.high.value = v;
})


// Kick reverb send
let kick_send = new Nexus.Dial('#kick-send', {
  'size': [30,30],
  'interaction': 'radial',
  'mode': 'relative',
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 0
})
kick_send.on('change', v => {
  let amp = v / 127;
  kickSend.gain.rampTo(amp, 0.05);
})


// Hats reverb send
let hats_send = new Nexus.Dial('#hats-send', {
  'size': [30,30],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 0
})
hats_send.on('change', v => {
  let amp = v / 127;
  hatsSend.gain.rampTo(amp, 0.05);
})


// Snare reverb send
let snare_send = new Nexus.Dial('#snare-send', {
  'size': [30,30],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 20
})
snare_send.on('change', v => {
  let amp = v / 127;
  snareSend.gain.rampTo(amp, 0.05);
})


// Perc reverb send
let perc_send = new Nexus.Dial('#perc-send', {
  'size': [30,30],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 63
})
perc_send.on('change', v => {
  let amp = v / 127;
  percSend.gain.rampTo(amp, 0.05);
})




/* // */
// Kick (channel 1)
/* // */

// Kick envelope
// // no pointer events, but updates according to attack + decay sliders
let kick_env = new Nexus.Envelope('#kick-env', {
  'size': [75,55],
  'noNewPoints': true,
  'points': [
    {
      x: 0.04,
      y: 0.0
    },
    {
      x: 0.05,
      y: 0.825
    },
    {
      x: 0.3,
      y: 0.0
    },
  ]
})
kick_env.colorize("accent","rgba(34, 150, 150)")


// Store attack and decay for calculating point locations
let ka = 0.01;
let kr = 0.3


// Kick attack (seconds)
let kick_atk = new Nexus.Slider('#kick-attack', {
  'size': [20,75],
  'mode': 'absolute', 
  'min': 0,
  'max': .25,
  'step': 0,
  'value': .01
})
kick_atk.on('change', v => {
  // Re-draw the envelope
  kick_env.movePoint(1, v + 0.04, 0.825);
  kick_env.movePoint(2, kr + v, 0.);
  // Set and store the value
  kick.envelope.attack = v;
  ka = v
})


// Kick release (seconds)
let kick_release = new Nexus.Slider('#kick-release', {
  'size': [20,75],
  'mode': 'absolute',  
  'min': 0.01,
  'max': 1.0,
  'step': 0,
  'value': .3
})
kick_release.on('change', v => {
  // Re-draw the envelope
  kick_env.movePoint(2, ka + v, 0.)
  // Set and store the value
  kick.envelope.decay = v;
  kr = v;
})


// Kick frequency (expects string)
let kick_freq = new Nexus.Dial('#kick-freq', {
  'size': [55,55],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': 60,
  'max': 120,
  'step': 0,
  'value': 60
})
kick_freq.on('change', v => {
  kickFreq = v.toString();
})


// Kick detune
let kick_tune = new Nexus.Dial('#kick-detune', {
  'size': [40,40],
  'interaction': 'radial',
  'mode': 'relative', 
  'min': 0.,
  'max': 1000.,
  'step': 0,
  'value': 5
})
kick_tune.on('change', v => {
  kickTune.value = v
})


// Kick Distortion
let kick_dist = new Nexus.Dial('#kick-dist', {
  'size': [55,55],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 20
})
kick_dist.on('change', v => {
  kickDist.distortion = v / 127;
})


// Kick filter cutoff (sub frequency)
let kick_cutoff = new Nexus.Dial('#kick-cutoff', {
  'size': [40,40],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': 40,
  'max': 200,
  'step': 0,
  'value': 60,
})
kick_cutoff.on('change', v => {
  kickFilterFreq.value = v
})


// Kick filter resonance (sub volume)
let kick_res = new Nexus.Dial('#kick-res', {
  'size': [40,40],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': 0,
  'max': 25,
  'step': 0,
  'value': 10
})
kick_res.on('change', v => {
  kickFilterRes.value = v
})


// Kick octave ramp (FM)
let kick_ramp = new Nexus.Dial('#kick-oct', {
  'size': [40,40],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': 0.5,
  'max': 9.,
  'step': 0,
  'value': 2.9
})
kick_ramp.on('change', v => {
  kick.octaves = v
})



// Get our SVG lines to be manipulated by pattern sliders
let kickline = document.querySelector('#kick-line');
let kickline2 = document.querySelector('#kick-line2');
let kickline3 = document.querySelector('#kick-line3');


// Kick pattern density slider
let kick_thresh1 = new Nexus.Slider('#kick-thresh', {
  'size': [20,100],
  'mode': 'absolute', 
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 64
})
kick_thresh1.on('change', v => {
  // Update the rhythm based on new threshold
  kickThresh1 = 127 - v;
  updateProb(0);

  // Update the SVG graphics
  let val = Nexus.scale(v, 0, 127, 0, 100)
  kickline.height.baseVal.value = val;
  kickline3.height.baseVal.value = 100 - val;
  kickline3.y.baseVal.value = val;
})


// Kick accent threshold
let kick_thresh2 = new Nexus.Slider('#kick-accent', {
  'size': [20,100],
  'mode': 'absolute',
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 32
})
kick_thresh2.on('change', v => {
  // Update the rhythm based on new threshold
  kickThresh2 = 127 - v;
  updateProb(0);

  // Update the SVG graphics
  let val = Nexus.scale(v, 0, 127, 0, 100)
  kickline2.height.baseVal.value = val;
})


// Kick pattern multislider
let kick_mult = new Nexus.Multislider('#kick-patt', {
  'size': [130,100],
  'numberOfSliders': 16,
  'min': 0,
  'max': 127,
  'step': 1,
  'candycane': 4,
  'values': probArray[0].slice(0, kickLength),
  'smoothing': 0,
  'mode': 'bar' 
})
kick_mult.on('change', v => {
  probArray[0] = v;
  updateProb(0);
})
// Set the colors
kick_mult.colorize("fill","rgba(238,238,238,0.55)")


// Kick pattern length
let kick_len = document.querySelector('#kick-length')

kick_len.oninput = () => {
  if (kick_len.value < 3) {
    kick_len.value = 3;
  } else if (kick_len.value > 32) {
    kick_len.value = 32;
  }
  kickLength = kick_len.value;

  kick_mult.destroy();

  kick_mult = new Nexus.Multislider('#kick-patt', {
    'size': [130,100],
    'numberOfSliders': kick_len.value,
    'min': 0,
    'max': 127,
    'step': 1,
    'candycane': 3,
    'values': probArray[0].slice(0, kickLength),
    'smoothing': 0,
    'mode': 'bar'  
  })
  kick_mult.on('change', v => {
    probArray[0] = v;
    updateProb(0);
  })
  kick_mult.colorize("fill","rgba(238,238,238,0.55)");

  updateProb(0);
}



// Kick randomize button
let kick_rand = new Nexus.Button('#kick-rand', {
  'size': [30,30],
})
kick_rand.on('click', v => {
    randomizePattern(0);
})
kick_rand.colorize("mediumLight","rgb(150,150,150,0.9)")


// Kick volume slider
let kick_volume = new Nexus.Slider('#kick-vol', {
  'size': [150,30],
  'mode': 'absolute',  // 'relative' or 'absolute'
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 64
})
kick_volume.on('change', v => {
  let amp = v / 127;
  kickGain.gain.rampTo(amp, 0.05);
})




/* // */
// Hats (channel 2)
/* // */

// Hats envelope
let hats_env = new Nexus.Envelope('#hats-env', {
  'size': [75,55],
  'noNewPoints': true,
  'points': [
    {
      x: 0.04,
      y: 0.0
    },
    {
      x: 0.05,
      y: 0.825
    },
    {
      x: 0.128,
      y: 0.0
    },
  ]
})
hats_env.colorize("accent","rgba(34, 150, 150)")


// Store attack and decay for calculating point locations
let ha = 0.01;
let hr = 0.128;


// Hats attack (seconds)
let hats_atk = new Nexus.Slider('#hats-attack', {
  'size': [20,75],
  'mode': 'absolute', 
  'min': 0.,
  'max': .25,
  'step': 0,
  'value': .01
})
hats_atk.on('change', v => {
  hats_env.movePoint(1, v + 0.04, 0.825);
  hats_env.movePoint(2, hr + v, 0.);
  hats.envelope.attack = v;
  ha = v
})


// Hats release (seconds)
let hats_release = new Nexus.Slider('#hats-release', {
  'size': [20,75],
  'mode': 'absolute',  
  'min': 0.01,
  'max': 1.0,
  'step': 0,
  'value': .128
})
hats_release.on('change', v => {
  hats_env.movePoint(2, ha + v, 0.)
  hats.envelope.decay = v;
  hr = v;
})


// Hats frequency
let hats_freq = new Nexus.Dial('#hats-freq', {
  'size': [55,55],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': 5,
  'max': 1050,
  'step': 0,
  'value': 279
})
hats_freq.on('change', v => {
  hatsFreq.value = v
})


// Hats detune
let hats_detune = new Nexus.Dial('#hats-detune', {
  'size': [40,40],
  'interaction': 'radial', 
  'mode': 'relative',
  'min': 0.1,
  'max': 5000,
  'step': 0,
  'value': 926
})
hats_detune.on('change', v => {
  hatsTune.value = v
})


// Hats hamon
let hats_harm = new Nexus.Dial('#hats-harm', {
  'size': [55,55],
  'interaction': 'radial', 
  'mode': 'relative',
  'min': 0.1,
  'max': 10,
  'step': 0,
  'value': 7.85
})
hats_harm.on('change', v => {
  hats.harmonicity = v
})


// Hats delay time (expects string)
let hats_delaytime = new Nexus.Dial('#hats-delaytime', {
  'size': [40,40],
  'interaction': 'radial', 
  'mode': 'absolute',
  'min': 0,
  'max': 2,
  'step': 0,
  'value': 1.356,
})
hats_delaytime.on('change', v => {
  hatsDelay.delayTime.value = v.toString();
})


// Hats delay wet balance
let hats_wet = new Nexus.Dial('#hats-delaywet', {
  'size': [40,40],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0
})
hats_wet.on('change', v => {
  hatsDelay.wet.value = v;
})


// Get our SVG lines to be manipulated by pattern sliders
hatsline = document.querySelector('#hats-line');
hatsline2 = document.querySelector('#hats-line2')
hatsline3 = document.querySelector('#hats-line3')


// Hats pattern density slider
let hats_thresh1 = new Nexus.Slider('#hats-thresh', {
  'size': [20,100],
  'mode': 'absolute',
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 86
})
hats_thresh1.on('change', v => {
  hatsThresh1 = 127 - v;
  updateProb(1);

  let val = Nexus.scale(v, 0, 127, 0, 100)
  hatsline.height.baseVal.value = val;
  hatsline3.height.baseVal.value = 100 - val;
  hatsline3.y.baseVal.value = val;
})

// Hats accent threshold
let hats_thresh2 = new Nexus.Slider('#hats-accent', {
  'size': [20,100],
  'mode': 'absolute', 
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 43
})
hats_thresh2.on('change', v => {
  hatsThresh2 = 127 - v;
  updateProb(1);

  let val = Nexus.scale(v, 0, 127, 0, 100)
  hatsline2.height.baseVal.value = val;
})


// Hats pattern multislider
let hats_mult = new Nexus.Multislider('#hats-patt', {
  'size': [130,100],
  'numberOfSliders': 16,
  'min': 0,
  'max': 127,
  'step': 1,
  'candycane': 4,
  'values': probArray[1].slice(0, hatsLength),
  'smoothing': 0,
  'mode': 'bar'  
})
hats_mult.on('change', v => {
  probArray[1] = v;
  updateProb(1);
})
hats_mult.colorize("fill","rgba(238,238,238,0.55)")


// Hats pattern length
let hats_len = document.querySelector('#hats-length')

hats_len.onchange = (e) => {
  hatsLength = hats_len.value;

  hats_mult.destroy();

  hats_mult = new Nexus.Multislider('#hats-patt', {
    'size': [130,100],
    'numberOfSliders': hats_len.value,
    'min': 0,
    'max': 127,
    'step': 1,
    'candycane': 3,
    'values': probArray[1].slice(0, hatsLength),
    'smoothing': 0,
    'mode': 'bar'  
  })
  hats_mult.on('change', v => {
    probArray[1] = v;
    updateProb(1);
  })
  hats_mult.colorize("fill","rgba(238,238,238,0.55)");

  updateProb(1);
}


// hats volume slider
let hats_volume = new Nexus.Slider('#hats-vol', {
  'size': [150,30],
  'mode': 'absolute',  
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 64
})
hats_volume.on('change', v => {
  let amp = v / 127;
  hatsGain.gain.rampTo(amp, 0.05);
})


// hats randomize button
let hats_rand = new Nexus.Button('#hats-rand', {
  'size': [30,30],
})
hats_rand.on('click', v => {
    randomizePattern(1);
})
hats_rand.colorize("mediumLight","rgb(150,150,150,0.9)")




/* // */
// Snare (channel 3)
/* // */

// Hats envelope
let snare_env = new Nexus.Envelope('#snare-env', {
  'size': [75,55],
  'noNewPoints': true,
  'points': [
    {
      x: 0.04,
      y: 0.0
    },
    {
      x: 0.05,
      y: 0.825
    },
    {
      x: 0.251,
      y: 0.0
    },
  ]
})
snare_env.colorize("accent","rgba(34, 150, 150)")


// Store attack and decay for calculating point locations
let sa = 0.01;
let sr = 0.1;


// Snare attack
let snare_atk = new Nexus.Slider('#snare-attack', {
  'size': [20,75],
  'mode': 'absolute',  // 'relative' or 'absolute'
  'min': 0.,
  'max': .25,
  'step': 0,
  'value': .01
})
snare_atk.on('change', v => {
  snare_env.movePoint(1, v + 0.04, 0.825);
  snare_env.movePoint(2, sr + v, 0.);
  snare.envelope.attack = v;
  sa = v
})


// Snare release
let snare_release = new Nexus.Slider('#snare-release', {
  'size': [20,75],
  'mode': 'absolute',  // 'relative' or 'absolute'
  'min': 0.01,
  'max': 1.0,
  'step': 0,
  'value': .247
})
snare_release.on('change', v => {
  snare_env.movePoint(2, sa + v, 0.)
  snare.envelope.decay = v;
  sr = v;
})


// Snare noise type
let snare_noise = new Nexus.RadioButton('#snare-noise', {
  'size': [120,20],
  'numberOfButtons': 3,
  'active': 1
})
snare_noise.on('change', v => {
  if (v === 0) {
    snare.noise.type = "white"
  } else if (v === 1) {
    snare.noise.type = "pink"
  } else {
    snare.noise.type = "brown"
  }
})
snare_noise.colorize("mediumLight","rgb(150,150,150,0.9)")


// Snare filter cutoff
let snare_cutoff = new Nexus.Dial('#snare-cutoff', {
  'size': [55,55],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': 60,
  'max': 10000,
  'step': 0,
  'value': 7561,
})
snare_cutoff.on('change', v => {
  snareFilterFreq.value = v
})


// Snare filter resonance
let snare_res = new Nexus.Dial('#snare-res', {
  'size': [55,55],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': 0,
  'max': 25,
  'step': 0,
  'value': 9.5
})
snare_res.on('change', v => {
  snareFilterRes.value = v
})


// Get our SVG lines to be manipulated by pattern sliders
snareline = document.querySelector('#snare-line');
snareline2 = document.querySelector('#snare-line2')
snareline3 = document.querySelector('#snare-line3')


// Hats pattern density slider
let snare_thresh1 = new Nexus.Slider('#snare-thresh', {
  'size': [20,100],
  'mode': 'absolute', 
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 112
})
snare_thresh1.on('change', v => {
  snareThresh1 = 127 - v;
  updateProb(2);

  let val = Nexus.scale(v, 0, 127, 0, 100)
  snareline.height.baseVal.value = val;
  snareline3.height.baseVal.value = 100 - val;
  snareline3.y.baseVal.value = val;
})


// Snare accent threshold
let snare_thresh2 = new Nexus.Slider('#snare-accent', {
  'size': [20,100],
  'mode': 'absolute', 
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 16
})
snare_thresh2.on('change', v => {
  snareThresh2 = 127 - v;
  updateProb(2);

  let val = Nexus.scale(v, 0, 127, 0, 100)
  snareline2.height.baseVal.value = val;
})


// Snare pattern multislider
let snare_mult = new Nexus.Multislider('#snare-patt', {
  'size': [130,100],
  'numberOfSliders': 16,
  'min': 0,
  'max': 127,
  'step': 1,
  'candycane': 4,
  'values': probArray[2].slice(0, snareLength),
  'smoothing': 0,
  'mode': 'bar'  
})
snare_mult.on('change', v => {
  probArray[2] = v;
  updateProb(2);
})
snare_mult.colorize("fill","rgba(238,238,238,0.55)")


// snare pattern length
let snare_len = document.querySelector('#snare-length')

snare_len.onchange = () => {
  snareLength = snare_len.value;

  snare_mult.destroy();

  snare_mult = new Nexus.Multislider('#snare-patt', {
    'size': [130,100],
    'numberOfSliders': snare_len.value,
    'min': 0,
    'max': 127,
    'step': 1,
    'candycane': 3,
    'values': probArray[2].slice(0, snareLength),
    'smoothing': 0,
    'mode': 'bar'  
  })
  snare_mult.on('change', v => {
    probArray[2] = v;
    updateProb(2);
  })
  snare_mult.colorize("fill","rgba(238,238,238,0.55)");

  updateProb(2);
}


// Snare randomize button
let snare_rand = new Nexus.Button('#snare-rand', {
  'size': [30,30],
})
snare_rand.on('click', v => {
    randomizePattern(2);
})
snare_rand.colorize("mediumLight","rgb(150,150,150,0.9)")


// Snare volume slider
let snare_volume = new Nexus.Slider('#snare-vol', {
  'size': [150,30],
  'mode': 'absolute',  // 'relative' or 'absolute'
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 64
})
snare_volume.on('change', v => {
  let amp = v / 127;
  snareGain.gain.rampTo(amp, 0.05);
})




/* // */
// Perc (channel 4)
/* // */

// Perc envelope
let perc_env = new Nexus.Envelope('#perc-env', {
  'size': [75,55],
  'noNewPoints': true,
  'points': [
    {
      x: 0.04,
      y: 0.0
    },
    {
      x: 0.13,
      y: 0.825
    },
    {
      x: 0.3,
      y: 0.0
    },
  ]
})
perc_env.colorize("accent","rgba(34, 150, 150)")


// Store attack and decay for calculating point locations
let pa = 0.13;
let pr = 0.3


// Perc attack (seconds)
let perc_atk = new Nexus.Slider('#perc-attack', {
  'size': [20,75],
  'mode': 'absolute',  // 'relative' or 'absolute'
  'min': 0.,
  'max': .25,
  'step': 0,
  'value': .13
})
perc_atk.on('change', v => {
  perc_env.movePoint(1, v + 0.04, 0.825);
  perc_env.movePoint(2, pr + v, 0.);
  perc.envelope.attack = v;
  pa = v
})


// Perc release (seconds)
let perc_release = new Nexus.Slider('#perc-release', {
  'size': [20,75],
  'mode': 'absolute',  // 'relative' or 'absolute'
  'min': 0.01,
  'max': 1.0,
  'step': 0,
  'value': .3
})
perc_release.on('change', v => {
  perc_env.movePoint(2, pa + v, 0.)
  perc.envelope.decay = v;
  pr = v;
})


// perc frequency (expects string)
let perc_freq = new Nexus.Dial('#perc-freq', {
  'size': [55,55],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': 100,
  'max': 2000,
  'step': 0,
  'value': 281.6
})
perc_freq.on('change', v => {
  percFreq = v.toString();
})


// Perc detune
let perc_tune = new Nexus.Dial('#perc-detune', {
  'size': [55,55],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': 0.,
  'max': 1000.,
  'step': 0,
  'value': 174.3
})
perc_tune.on('change', v => {
  percTune.value = v
})


// Perc wavefolding distortion
let perc_dist = new Nexus.Dial('#perc-dist', {
  'size': [40,40],
  'interaction': 'radial', 
  'mode': 'absolute', 
  'min': 1,
  'max': 100.,
  'step': 1,
  'value': 45
})
perc_dist.on('change', v => {
  if (v % 2 === 0) {
    percDist.order = v - 1;
  } else {
    percDist.order = v
  }
})


// perc FM octave ramp
let perc_ramp = new Nexus.Dial('#perc-oct', {
  'size': [40,40],
  'interaction': 'radial', 
  'mode': 'relative', 
  'min': 0.5,
  'max': 9.,
  'step': 0,
  'value': 0.5
})
perc_ramp.on('change', v => {
  perc.octaves = v
})


// Get our SVG lines to be manipulated by pattern sliders
percline = document.querySelector('#perc-line');
percline2 = document.querySelector('#perc-line2')
percline3 = document.querySelector('#perc-line3')


// Perc pattern density slider
let perc_thresh1 = new Nexus.Slider('#perc-thresh', {
  'size': [20,100],
  'mode': 'absolute',
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 32
})
perc_thresh1.on('change', v => {
  percThresh1 = 127 - v;
  updateProb(3);

  let val = Nexus.scale(v, 0, 127, 0, 100)
  percline.height.baseVal.value = val;
  percline3.height.baseVal.value = 100 - val;
  percline3.y.baseVal.value = val;
})


// Perc accent threshold
let perc_thresh2 = new Nexus.Slider('#perc-accent', {
  'size': [20,100],
  'mode': 'absolute', 
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 16
})
perc_thresh2.on('change', v => {
  percThresh2 = 127 - v;
  updateProb(3);

  let val = Nexus.scale(v, 0, 127, 0, 100)
  percline2.height.baseVal.value = val;
})


// Perc pattern multislider
let perc_mult = new Nexus.Multislider('#perc-patt', {
  'size': [130,100],
  'numberOfSliders': 16,
  'min': 0,
  'max': 127,
  'step': 1,
  'candycane': 4,
  'values': probArray[3].slice(0, percLength),
  'smoothing': 0,
  'mode': 'bar'  
})
perc_mult.on('change', v => {
  probArray[3] = v;
  updateProb(3);
})    
perc_mult.colorize("fill","rgba(238,238,238,0.55)")


// perc pattern length
let perc_len = document.querySelector('#perc-length')

perc_len.onchange = () => {
  percLength = perc_len.value;

  perc_mult.destroy();

  perc_mult = new Nexus.Multislider('#perc-patt', {
    'size': [130,100],
    'numberOfSliders': perc_len.value,
    'min': 0,
    'max': 127,
    'step': 1,
    'candycane': 3,
    'values': probArray[3].slice(0, percLength),
    'smoothing': 0,
    'mode': 'bar'  
  })
  perc_mult.on('change', v => {
    probArray[3] = v;
    updateProb(3);
  })
  perc_mult.colorize("fill","rgba(238,238,238,0.55)");

  updateProb(3);
}


// Perc randomize button
let perc_rand = new Nexus.Button('#perc-rand', {
  'size': [30,30],
})
perc_rand.on('click', v => {
    randomizePattern(3);
})
perc_rand.colorize("mediumLight","rgb(150,150,150,0.9)")


// Perc volume slider
let perc_volume = new Nexus.Slider('#perc-vol', {
  'size': [150,30],
  'mode': 'absolute',  
  'min': 0,
  'max': 127,
  'step': 1,
  'value': 22
})
perc_volume.on('change', v => {
  let amp = v / 127;
  percGain.gain.rampTo(amp, 0.05);
})