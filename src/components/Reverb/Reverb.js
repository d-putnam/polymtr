import React from 'react';
import Nexus from 'nexusui'
import Equalizer from '../Channel/components/Equalizer'
import './Reverb.css';

class Reverb extends React.PureComponent {

  constructor(props) {
    super(props)
    this.decay = React.createRef()
  }

  componentDidMount() {
    this.nxDecay = new Nexus.Dial(this.decay.current, {
      'size': [50,50], 'interaction': 'radial', 'mode': 'relative',
      'min': 0.1, 'max': 4, 'step': 0, 
      'value':  2.5
    });
    this.nxDecay.on('change', v => {
      this.props.outputChain.updateVerbDecay(v)
    });
  }

  render() {
    return (
      <div className="Reverb">
        REVERB
        <div className="wrap">
          <div className="knobWrap">
            <div ref={this.decay} />
            <label>decay</label>
          </div>
          <Equalizer track={this.props.outputChain} />
        </div>
      </div>

    );
  }
}

export default Reverb;
