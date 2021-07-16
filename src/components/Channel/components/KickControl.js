import React from 'react';
import Nexus from 'nexusui'
import './KickControl.css';

class KickControl extends React.PureComponent {

  constructor(props) {
    super(props)

    this.distortion = React.createRef()
    this.cutoff = React.createRef()
    this.resonance = React.createRef()
    this.fm = React.createRef()
    this.frequency = React.createRef()

    this.state = {
      fm: 2.9,
      frequency: 47,
    }
  }

  componentDidMount() {
    this.nxDistortion = new Nexus.Dial(this.distortion.current, {
      'size': [55,55], 'interaction': 'radial', 'mode': 'relative',
      'min': 0, 'max': 127, 'step': 1, 
      'value':  0.125 * 127
    });
    this.nxDistortion.on('change', v => {
      this.props.track.updateDistortion(v)
    });

    this.nxCutoff = new Nexus.Dial(this.cutoff.current, {
      'size': [40,40], 'interaction': 'radial', 'mode': 'relative',
      'min': 40, 'max': 80, 'step': 0,
      'value':  60
    });
    this.nxCutoff.on('change', v => {
      this.props.track.updateCutoff(v)
    })

    this.nxResonance = new Nexus.Dial(this.resonance.current, {
      'size': [40,40], 'interaction': 'radial', 'mode': 'relative',
      'min': 0, 'max': 25, 'step': 0,
      'value':  10
    });
    this.nxResonance.on('change', v => {
      this.props.track.updateResonance(v)
    })

    this.nxFM = new Nexus.Dial(this.fm.current, {
      'size': [40,40], 'interaction': 'radial', 'mode': 'relative',
      'min': 0.5, 'max': 9, 'step': 0,
      'value':  2.9
    });
    this.nxFM.on('change', v => {
      this.props.track.updateFM(v)
    })

    this.nxFrequency = new Nexus.Dial(this.frequency.current, {
      'size': [55,55], 'interaction': 'radial', 'mode': 'relative',
      'min': 40, 'max': 80, 'step': 0,
      'value':  47
    });
    this.nxFrequency.on('change', v => {
      this.props.track.updateFreq(v)
    })
  }

  render() {
    return (
      <div className="KickControl">
        <div className="knobWrap">
          <div ref={this.frequency} />
          <label>ƒreq</label>
        </div>
        <div className="knobWrap">
          <div ref={this.cutoff} />
          <label>subƒ</label>
        </div>
        <div className="knobWrap">
          <div ref={this.resonance} />
          <label>sub vol</label>
        </div>
        <div className="knobWrap">
          <div ref={this.fm} />
          <label>FM</label>
        </div>
        <div className="knobWrap">
          <div ref={this.distortion} />
          <label>dist</label>
        </div>
      </div>
    );
  }
}

export default KickControl;