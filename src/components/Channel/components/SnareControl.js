import React from 'react';
import Nexus from 'nexusui'
import './SnareControl.css';

class SnareControl extends React.PureComponent {

  constructor(props) {
    super(props)

    this.noiseType = React.createRef()
    this.cutoff = React.createRef()
    this.resonance = React.createRef()
  }

  componentDidMount() {
    this.nxNoiseType = new Nexus.RadioButton(this.noiseType.current, {
      'size': [120,20],
      'numberOfButtons': 3,
      'active': 1
    })
    this.nxNoiseType.on('change', v => {
      let res = ""
      if (v === 0) {
        res = "white"
      } else if (v === 1) {
        res = "pink"
      } else {
        res = "brown"
      }
      this.props.track.updateNoiseType(res)
    })

    this.nxCutoff = new Nexus.Dial(this.cutoff.current, {
      'size': [55,55], 'interaction': 'radial', 'mode': 'relative', 
      'min': 60, 'max': 10000, 'step': 0, 
      'value': 7561
    })
    this.nxCutoff.on('change', v => {
      this.props.track.updateCutoff(v)
    })

    this.nxResonance = new Nexus.Dial(this.resonance.current, {
      'size': [55,55], 'interaction': 'radial', 'mode': 'relative', 
      'min': 0, 'max': 25, 'step': 0, 
      'value': 9.5
    })
    this.nxResonance.on('change', v => {
      this.props.track.updateResonance(v)
    })
  }

  render() {
    return (
      <div className="SnareControl">
        <div className="knobWrap">
          <div ref={this.cutoff} />
          <label>cutoff</label>
        </div>
        <div className="knobWrap">
          <div ref={this.noiseType} />
          <label>noise type</label>
        </div>
        <div className="knobWrap">
          <div ref={this.resonance} />
          <label>resonance</label>
        </div>
      </div>
    );
  }
}

export default SnareControl;