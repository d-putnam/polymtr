import React from 'react';
import Nexus from 'nexusui'
import './HatsControl.css';

class HatsControl extends React.PureComponent {

  constructor(props) {
    super(props)

    this.frequency = React.createRef()
    this.detune = React.createRef()
    this.harmonicity = React.createRef()
  }

  componentDidMount() {
    this.nxFrequency = new Nexus.Dial(this.frequency.current, {
      'size': [55,55], 'interaction': 'radial', 'mode': 'relative', 
      'min': 5, 'max': 1050, 'step': 0, 
      'value': 279
    })
    this.nxFrequency.on('change', v => {
      this.props.track.updateFreq(v)
    })

    this.nxDetune = new Nexus.Dial(this.detune.current, {
      'size': [40,40], 'interaction': 'radial', 'mode': 'relative',
      'min': 0.1, 'max': 5000, 'step': 0, 
      'value': 926
    })
    this.nxDetune.on('change', v => {
      this.props.track.updateDetune(v)
    })

    this.nxHarmonicity = new Nexus.Dial(this.harmonicity.current, {
      'size': [55,55], 'interaction': 'radial', 'mode': 'relative',
      'min': 0.1, 'max': 10, 'step': 0, 
      'value': 7.85
    })
    this.nxHarmonicity.on('change', v => {
      this.props.track.updateHarmonicity(v)
    })
  }

  render() {
    return (
      <div className="HatsControl">
        <div className="knobWrap">
          <div ref={this.frequency} />
          <label>freq</label>
        </div>
        <div className="knobWrap">
          <div ref={this.detune} />
          <label>detune</label>
        </div>
        <div className="knobWrap">
          <div ref={this.harmonicity} />
          <label>harmon</label>
        </div>
      </div>
    );
  }
}

export default HatsControl;