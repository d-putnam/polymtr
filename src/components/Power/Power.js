import React from 'react';
import * as Tone from 'tone'
import Nexus from 'nexusui'
import './Power.css';

class Power extends React.PureComponent {

  constructor(props) {
    super(props)
    this.powerSwitch = React.createRef()
    this.bpmNumber = React.createRef()
    Tone.Transport.bpm.value = 112
  }

  componentDidMount() {
    this.nxPowerSwitch = new Nexus.Toggle(this.powerSwitch.current, {
      'size': [60,30],
      'state': false
    })
    this.nxPowerSwitch.on('change', v => {
      Tone.start()
      this.props.stateHandler(v)
      if (v === true) {
        if (Tone.context.state !== 'running') {
          Tone.context.resume();
        }
        Tone.Transport.start("+0.1");
      } else {
        Tone.Transport.stop();
      }
    })

    this.nxTempoNumber = new Nexus.Number(this.bpmNumber.current, {
      'size': [41,30],
      'value': 112,
      'min': 30,
      'max': 150,
      'step': 1
    })
    this.nxTempoNumber.on('change', v => {
      Tone.Transport.bpm.value = v
      this.props.outputChain.refreshDelayTime() 
    });  
    this.nxTempoNumber.colorize("fill", "rgba(255,255,255,0.66)");
  }

  render() {
    return (
      <div className="Power">
        <div className="wrap">
          <div className="knobWrap">
            <label>
              <div ref={this.powerSwitch} />
              power
            </label>
          </div>
          <div className="knobWrap">
            <label>
              <div ref={this.bpmNumber} />
              bpm
            </label>
          </div>
        </div>
      </div>

    );
  }
}

export default Power;
