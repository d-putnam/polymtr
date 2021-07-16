import React from 'react';
import Nexus from 'nexusui'
import './Volume.css';

class Volume extends React.PureComponent {

  constructor(props) {
    super(props);
    this.volumeSlider = React.createRef()
    this.verbSlider = React.createRef()
    this.delaySlider = React.createRef()
  }

  componentDidMount() {
    let size = window.innerWidth <= 415 
      ? [125,30]
      : [30,125]
    this.nxVolumeSlider = new Nexus.Slider(this.volumeSlider.current, {
      'size': size,
      'mode': 'absolute',
      'min': 0, 'max': 127, 'step': 1,
      'value':  63
    });
    this.nxVolumeSlider.on('change', v => {
      this.props.track.updateVolume(v)
    });

    this.nxVerbSlider = new Nexus.Slider(this.verbSlider.current, {
      'size': [25,90],
      'mode': 'absolute',
      'min': 0, 'max': 127, 'step': 1,
      'value': 0
    });
    this.nxVerbSlider.on('change', v => {
      this.props.track.updateVerbSend(v)
    });

    this.nxDelaySlider = new Nexus.Slider(this.delaySlider.current, {
      'size': [25,90],
      'mode': 'absolute',
      'min': 0, 'max': 127, 'step': 1,
      'value':  0
    });
    this.nxDelaySlider.on('change', v => {
      this.props.track.updateDelaySend(v)
    });
  }

  render() {
    return (
      <div className="Volume">
        <div className="sliderWrap">
          <div ref={this.volumeSlider} />
          <label>Volume</label>
        </div>
        <div className="sliderWrap hideMobile">
          <div ref={this.verbSlider} />
          <label className="fxLabel">Reverb</label>
        </div>
        <div className="sliderWrap hideMobile">
          <div ref={this.delaySlider} />
          <label className="fxLabel">Delay</label>
        </div>
      </div>
    );
  }
}

export default Volume;