import * as Tone from 'tone'

class OutputChain {
  constructor() {
    this.output = new Tone.Volume(0).toDestination()
    this.compressor = new Tone.Compressor(-10, 2).connect(this.output)
    
    this.verbEQ = new Tone.EQ3().connect(this.compressor)
      this.verb = new Tone.Reverb().connect(this.verbEQ)
      this.verb.decay = 2.5;
      this.verb.wet.value = 1;

    this.delayFilter = new Tone.Filter(20000, "lowpass").connect(this.compressor)
      this.delayFilterFreq = new Tone.Signal({
        value: "20000",
        units: "frequency"
      }).connect(this.delayFilter.frequency);
      this.delayFilterRes = new Tone.Signal({
        value: "10",
        units: "frequency"
      }).connect(this.delayFilter.Q);
    this.delay = new Tone.PingPongDelay("4n", 0.3).connect(this.delayFilter);
      this.subdivisions = ['2n', '4n', '8n', '16n', '16t']
      this.delayTime = '4n'
      this.delayFeedback = new Tone.Signal({
        value: "0.3",
        units: "normalRange"
      }).connect(this.delay.feedback);
  }

  updateEQLow(v) {
    this.verbEQ.low.value = v
  }

  updateEQMid(v) {
    this.verbEQ.mid.value = v
  }

  updateEQHigh(v) {
    this.verbEQ.high.value = v
  }

  updateVerbDecay(v) {
    this.verb.decay = v
  }

  updateDelayTime(v) {
    this.delay.delayTime.value = this.subdivisions[v]
    this.delayTime = this.subdivisions[v]
  }

  refreshDelayTime() {
    this.delay.delayTime.value = this.delayTime
  }

  updateDelayFeedback(v) {
    this.delayFeedback.value = v
  }

  updateDelayFilterCutoff(v) {
    this.delayFilterFreq.value = v
  }

  updateDelayFilterResonance(v) {
    this.delayFilterRes.value = v
  }
  
  updateCompressorThreshold(v) {
    this.compressor.threshold.value = v
    // adjust makeup gain
    this.output.volume.value = v*-0.5
  }

  updateCompressorRatio(v) {
    this.compressor.ratio.value = v
  }
}


class Track {
  constructor() {
    this.partSend = new Tone.Gain(1)
    this.partVerbSend = new Tone.Gain(0)
    this.partDelaySend = new Tone.Gain(0)
    this.partEQ = new Tone.EQ3()
      .connect(this.partSend)
      .connect(this.partVerbSend)
      .connect(this.partDelaySend)
  }

  connectNode(node) {
    this.partSend.connect(node)
  }

  connectVerb(node) {
    this.partVerbSend.connect(node)
  }

  connectDelay(node) {
    this.partDelaySend.connect(node)
  }

  updatePattern(events) {
    this.sequence.events = events
  }

  updateAttack(v) {
    this.part.envelope.attack = v;
  }

  updateDecay(v) {
    this.part.envelope.decay = v;
  }

  updateVolume(v) {
    let amp = v / 127
    this.partGain.gain.rampTo(amp, 0.05)
  }

  updateVerbSend(v) {
    let amp = v / 127
    this.partVerbSend.gain.rampTo(amp, 0.05)
  }

  updateDelaySend(v) {
    let amp = v / 127
    this.partDelaySend.gain.rampTo(amp, 0.05)
  }

  updateEQLow(v) {
    this.partEQ.low.value = v
  }

  updateEQMid(v) {
    this.partEQ.mid.value = v
  }

  updateEQHigh(v) {
    this.partEQ.high.value = v
  }
}


class Kick extends Track {
  constructor() {
    super()
    this.partFilter = new Tone.Filter(60, "highpass").connect(this.partEQ);
    this.partFilterFreq = new Tone.Signal({
      value: "60",
      units: "frequency"
    }).connect(this.partFilter.frequency);
    // Set up a signal for controlling the filter resonance
    this.partFilterRes = new Tone.Signal({
      value: "10",
      units: "frequency"
    }).connect(this.partFilter.Q);

    this.partDist = new Tone.Distortion(.157).connect(this.partFilter);
    this.partGain = new Tone.Gain(0.5).connect(this.partDist);

    this.part = new Tone.MembraneSynth().connect(this.partGain)
      this.frequency = '47'
      this.partDetune = new Tone.Signal({
        value: "C4",
        units: "frequency"
      }).connect(this.part.detune);
      this.part.octaves = 2.9
      this.part.envelope.attack = 0.01
      this.part.envelope.decay = 0.3
      this.part.envelope.sustain = 0;
      this.part.envelope.release = 0;
  }

  get envelope() {
    return {
      attack: 0.01, decay: 0.3
    }
  }

  get pattern() {
    return {
      length: 4,
      density: 1,
    }
  }

  initSequence(notes) {
    this.sequence = new Tone.Sequence((time, note) => {
    }, notes, '16n').start();
  }
  
  sequenceCallback(callback) {
    this.sequence.callback = (time, note) => {
      this.part.triggerAttackRelease(this.frequency, '+0.1', time, note);
      callback()
    }
  }

  updateDistortion(v) {
    this.partDist.distortion = v / 127
  }

  updateCutoff(v) {
    this.partFilterFreq.value = v
  }

  updateResonance(v) {
    this.partFilterRes.value = v
  }

  updateFM(v) {
    this.part.octaves = v
  }

  updateFreq(v) {
    this.frequency = v
  }
}


class Hats extends Track {
  constructor() {
    super()
    this.partGain = new Tone.Gain(0.5).connect(this.partEQ);
    this.part = new Tone.MetalSynth().connect(this.partGain);
    this.part.harmonicity = 7.85
    this.partFreq = new Tone.Signal({
      value: "279",
      units: "frequency"
    }).connect(this.part.frequency);
    this.partTune = new Tone.Signal({
      value: "926",
      units: "frequency"
    }).connect(this.part.detune);
    this.part.envelope.attack = 0.01;
    this.part.envelope.decay = 0.128;
    this.part.envelope.sustain = 0;
    this.part.envelope.release = 0;
  }

  get envelope() {
    return {
      attack: 0.01, decay: 0.128
    }
  }

  get pattern() {
    return {
      length: 10,
      density: 3,
    }
  }

  initSequence(notes) {
    this.sequence = new Tone.Sequence((time, note) => {
    }, notes, '16n').start();
  }

  sequenceCallback(callback) {
    this.sequence.callback = (time, note) => {
      this.part.triggerAttackRelease("A4", '+0.1', time, note);
      callback()
    }
  }

  updateFreq(v) {
    this.partFreq.value = v
  }

  updateDetune(v) {
    this.partTune.value = v
  }

  updateHarmonicity(v) {
    this.part.harmonicity = v
  }
}



class Snare extends Track {
  constructor() {
    super()
    this.partFilter = new Tone.Filter(7556, "lowpass").connect(this.partEQ);
    this.partFilterFreq = new Tone.Signal({
      value: "7561",
      units: "frequency"
    }).connect(this.partFilter.frequency);
    this.partFilterRes = new Tone.Signal({
      value: "9.5",
      units: "frequency"
    }).connect(this.partFilter.Q);
    this.partGain = new Tone.Gain(0.5).connect(this.partFilter);
    this.part = new Tone.NoiseSynth().connect(this.partGain)
    this.part.noise.type = "pink"
    this.part.envelope.attack = 0.01
    this.part.envelope.decay = 0.247
    this.part.envelope.sustain = 0;
    this.part.envelope.release = 0;
  }

  get envelope() {
    return {
      attack: 0.01, decay: 0.247
    }
  }

  get pattern() {
    return {
      length: 7,
      density: 3,
    }
  }

  initSequence(notes) {
    this.sequence = new Tone.Sequence((time, note) => {
    }, notes, '16n').start();
  }

  sequenceCallback(callback) {
    this.sequence.callback = (time, note) => {
      this.part.triggerAttackRelease("+0.3", time, note);
      callback()
    }
  }

  updateCutoff(v) {
    this.partFilterFreq.value = v
  }

  updateResonance(v) {
    this.partFilterRes.value = v
  }

  updateNoiseType(v) {
    this.part.noise.type = v
  }
}


class Perc extends Track {
  constructor() {
    super()
    this.partDist = new Tone.Chebyshev(45).connect(this.partEQ);
    this.partGain = new Tone.Gain(0.5).connect(this.partDist);
    this.frequency = 281.6
    this.part = new Tone.MembraneSynth({
      attackNoise: 1,
      dampening: 3000,
      resonance: 0.85,
      octaves: 0.5
    }).connect(this.partGain)
    this.partDetune = new Tone.Signal({
      value: "440",
      units: "frequency"
    }).connect(this.part.detune);
    this.part.envelope.attack = 0.02
    this.part.envelope.decay = 0.12
    this.part.envelope.sustain = 0;
    this.part.envelope.release = 0;  
  }

  get envelope() {
    return {
      attack: 0.02, decay: 0.12
    }
  }

  get pattern() {
    return {
      length: 11,
      density: 2,
    }
  }

  initSequence(notes) {
    this.sequence = new Tone.Sequence((time, note) => {
    }, notes, '16n').start();
  }

  sequenceCallback(callback) {
    this.sequence.callback = (time, note) => {
      this.part.triggerAttackRelease(this.frequency, "16n", time, note);
      callback()
    }
  }

  updateFrequency(v) {
    this.frequency = v
  }

  updateDetune(v) {
    this.partDetune.value = v
  }

  updateDistortion(v) {
    if (v % 2 === 0) {
      this.partDist.order = v - 1;
    } else {
      this.partDist.order = v
    }
  }

  updateFM(v) {
    this.part.octaves = v
  }
}

export { OutputChain, Kick, Hats, Snare, Perc };
