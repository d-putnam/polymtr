import React from 'react';
import Nexus from 'nexusui'
import './PercControl.css';

class PercControl extends React.PureComponent {

  constructor(props) {
    super(props)

    this.frequency = React.createRef()
    this.detune = React.createRef()
    this.distortion = React.createRef()
    this.fm = React.createRef()
  }

  componentDidMount() {
    this.nxFrequency = new Nexus.Dial(this.frequency.current, {
      'size': [55,55], 'interaction': 'radial', 'mode': 'relative', 
      'min': 100, 'max': 2000, 'step': 0, 
      'value': 281.6
    })
    this.nxFrequency.on('change', v => {
      this.props.track.updateFrequency(v)
    })

    this.nxDetune = new Nexus.Dial(this.detune.current, {
      'size': [40,40], 'interaction': 'radial', 'mode': 'relative', 
      'min': 0, 'max': 1000, 'step': 0, 
      'value': 174.3
    })
    this.nxDetune.on('change', v => {
      this.props.track.updateDetune(v)
    })

    this.nxFM = new Nexus.Dial(this.fm.current, {
      'size': [40,40], 'interaction': 'radial', 'mode': 'relative', 
      'min': 0.5, 'max': 9, 'step': 0, 
      'value': 0.5
    })
    this.nxFM.on('change', v => {
      this.props.track.updateFM(v)
    })

    this.nxDistortion = new Nexus.Dial(this.distortion.current, {
      'size': [55,55], 'interaction': 'radial', 'mode': 'relative', 
      'min': 1, 'max': 100, 'step': 1, 
      'value': 45
    })
    this.nxDistortion.on('change', v => {
      this.props.track.updateDistortion(v)
    })
  }

  render() {
    return (
      <div className="PercControl">
        <div className="knobWrap">
          <div ref={this.frequency} />
          <label>ƒreq</label>
        </div>
        <div className="knobWrap">
          <div ref={this.detune} />
          <label>detune</label>
        </div>
        <div className="knobWrap">
          <div ref={this.fm} />
          <label>fm</label>
        </div>
        <div className="knobWrap">
          <div ref={this.distortion} />
          <label>fold</label>
        </div>
      </div>
    );
  }
}

export default PercControl;