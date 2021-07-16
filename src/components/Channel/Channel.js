import React, { Component } from 'react';
import { Kick, Hats, Snare, Perc } from '../../ToneRack'
import AttackDecay from './components/AttackDecay'
import Pattern from './components/Pattern';
import Equalizer from './components/Equalizer';
import Volume from './components/Volume';
import KickControl from './components/KickControl'
import HatsControl from './components/HatsControl'
import SnareControl from './components/SnareControl'
import PercControl from './components/PercControl'
import './Channel.css';

class Channel extends Component {

  constructor(props) {
    super(props)
    if (props.part === 'kick') {
      this.track = new Kick()
    } else if (props.part === 'hats') {
      this.track = new Hats()
    } else if (props.part === 'snare') {
      this.track = new Snare()
    } else if (props.part === 'perc') {
      this.track = new Perc()
    }
    if (window.innerWidth >= 450) {
      this.track.connectNode(props.outputChain.compressor)
      this.track.connectVerb(props.outputChain.verb)
      this.track.connectDelay(props.outputChain.delay)
    } else {
      this.track.connectNode(props.outputChain.output)
    }
  }

  render() {
    return (
      <div className="Channel">
        <div className="titleWrap">
        <span className="channelName">
          {this.props.part.toUpperCase()}
        </span>
          <div className="channelWrap">
            <div className="channelStrip">
              <AttackDecay track={this.track} />
              <div className="controls">
                {
                  this.props.part === 'kick' &&
                  <KickControl track={this.track} />
                }
                {
                  this.props.part === 'hats' &&
                  <HatsControl track={this.track} />
                }
                {
                  this.props.part === 'snare' &&
                  <SnareControl track={this.track} />
                }
                {
                  this.props.part === 'perc' &&
                  <PercControl track={this.track} />
                }
              </div>
              <Equalizer track={this.track} />
            </div>
            <Pattern track={this.track} isPlaying={this.props.isPlaying} />
          </div>
          <Volume track={this.track} fxChain={this.props.outputChain} />
        </div>
      </div>

    );
  }
}

export default Channel;
