import React from 'react';
import Nexus from 'nexusui'
import './Delay.css';

class Delay extends React.PureComponent {

  constructor(props) {
    super(props)
    this.delayTime = React.createRef()
    this.feedback = React.createRef()
    this.filterFreq = React.createRef()
    this.filterRes = React.createRef()
  }

  componentDidMount() {
    this.props.outputChain.updateDelayTime(1)
    this.nxDelayTime = new Nexus.Dial(this.delayTime.current, {
      'size': [50,50], 'interaction': 'radial', 'mode': 'relative',
      'min': 0, 'max': 4, 'step': 1, 
      'value':  1
    });
    this.nxDelayTime.on('change', v => {
      this.props.outputChain.updateDelayTime(v)
    });

    this.nxFeedback = new Nexus.Dial(this.feedback.current, {
      'size': [50,50], 'interaction': 'radial', 'mode': 'relative',
      'min': 0.1, 'max': 0.9, 'step': 0, 
      'value':  0.3
    });
    this.nxFeedback.on('change', v => {
      this.props.outputChain.updateDelayFeedback(v)
    });

    this.nxFilterFreq = new Nexus.Dial(this.filterFreq.current, {
      'size': [40,40], 'interaction': 'radial', 'mode': 'relative',
      'min': 100, 'max': 40000, 'step': 0, 
      'value':  20000
    });
    this.nxFilterFreq.on('change', v => {
      this.props.outputChain.updateDelayFilterCutoff(v)
    });

    this.nxFilterRes = new Nexus.Dial(this.filterRes.current, {
      'size': [40,40], 'interaction': 'radial', 'mode': 'relative',
      'min': 0.1, 'max': 20, 'step': 0, 
      'value':  10
    });
    this.nxFilterRes.on('change', v => {
      this.props.outputChain.updateDelayFilterResonance(v)
    });
  }

  render() {
    return (
      <div className="Delay">
        DELAY
        <div className="wrap">
          <div className="knobWrap">
            <div ref={this.delayTime} />
            <label>time</label>
          </div>
          <div className="knobWrap">
            <div ref={this.feedback} />
            <label>feedback</label>
          </div>
          <div className="knobWrap">
            <div ref={this.filterFreq} />
            <label>filter<br/>freq</label>
          </div>        
          <div className="knobWrap">
            <div ref={this.filterRes} />
            <label>filter<br/>res</label>
          </div>      
        </div>
      </div>

    );
  }
}

export default Delay;
