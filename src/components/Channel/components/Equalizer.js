import React from 'react';
import Nexus from 'nexusui'
import './Equalizer.css';

class Equalizer extends React.PureComponent {

  constructor(props) {
    super(props)
    this.low = React.createRef()
    this.mid = React.createRef()
    this.high = React.createRef()
  }

  componentDidMount() {
    this.nxLow = new Nexus.Dial(this.low.current, {
      'size': [35,35], 'interaction': 'radial', 'mode': 'relative',
      'min': -20, 'max': 20, 'step': 0, 
      'value':  0
    });
    this.nxLow.on('change', v => {
      this.props.track.updateEQLow(v)
    });

    this.nxMid = new Nexus.Dial(this.mid.current, {
      'size': [35,35], 'interaction': 'radial', 'mode': 'relative',
      'min': -20, 'max': 20, 'step': 0, 
      'value':  0
    });
    this.nxMid.on('change', v => {
      this.props.track.updateEQMid(v)
    });

    this.nxHigh = new Nexus.Dial(this.high.current, {
      'size': [35,35], 'interaction': 'radial', 'mode': 'relative',
      'min': -20, 'max': 20, 'step': 0, 
      'value':  0
    });
    this.nxHigh.on('change', v => {
      this.props.track.updateEQHigh(v)
    });
  }

  render() {
    return (
      <div className="Equalizer">
        <label>┌EQUALIZER┐</label>
        <div className="eqControlWrap">
          <div className="knobWrap">
            <div ref={this.low} />
            <label>low</label>
          </div>
          <div className="knobWrap">
            <div ref={this.mid} />
            <label>mid</label>
          </div>
          <div className="knobWrap">
            <div ref={this.high} />
            <label>high</label>
          </div>
          </div>
      </div>
    );
  }
}

export default Equalizer;