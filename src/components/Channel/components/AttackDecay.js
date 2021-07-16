import React from 'react';
import Nexus from 'nexusui'
import './AttackDecay.css';

class AttackDecay extends React.PureComponent {

  constructor(props) {
    super(props);
    this.envelopeGraph = React.createRef()
    this.attackSlider = React.createRef()
    this.decaySlider = React.createRef()
    this.state = {
      attack: props.track.envelope.attack,
      decay: props.track.envelope.decay
    }
  }

  componentDidMount() {
    this.nxEnvelopeGraph = new Nexus.Envelope(this.envelopeGraph.current, {
      'size': [55,55],
      'noNewPoints': true,
      'points': [
        {
          x: 0.1,
          y: 0.0
        },
        {
          x: 0.1 +  this.state.attack * 1.5,
          y: 0.825
        },
        {
          x: 0.1 + this.state.decay * 1.3,
          y: 0.0
        },
      ]
    });
    
    this.nxAttackSlider = new Nexus.Slider(this.attackSlider.current, {
      'size': [20,55],
      'mode': 'absolute',
      'min': .01, 'max': .15, 'step': 0,
      'value':  this.state.attack
    });
    this.nxAttackSlider.on('change', v => {
      this.props.track.updateAttack(this.state.attack)
      this.setState({attack: v})
      this.nxEnvelopeGraph.movePoint(1, 0.1 + v*1.5, 0.825)
      this.nxEnvelopeGraph.movePoint(2, 0.1 + this.state.decay*1.3 + v, 0.)
    });

    this.nxDecaySlider = new Nexus.Slider(this.decaySlider.current, {
      'size': [20,55],
      'mode': 'absolute',
      'min': 0, 'max': .5, 'step': 0,
      'value':  this.state.decay
    });
    this.nxDecaySlider.on('change', v => {
      this.props.track.updateDecay(this.state.decay)
      this.setState({decay: v})
      this.nxEnvelopeGraph.movePoint(2,  0.1 + this.state.attack + v*1.3, 0.)
    });
  }

  render() {
    return (
      <div className="AttackDecay">
        <label>┌ENVELOPE┐</label>
        <div className="controlWrap">
          <div ref={this.attackSlider} />
          <div ref={this.envelopeGraph} className="noClick" />
          <div ref={this.decaySlider} />
        </div>
      </div>
    );
  }
}

export default AttackDecay;