import React from 'react';
import Nexus from 'nexusui'
import './Compressor.css';

class Compressor extends React.PureComponent {

  constructor(props) {
    super(props)
    this.threshold = React.createRef()
    this.ratio = React.createRef()
  }

  componentDidMount() {
    this.nxThreshold = new Nexus.Dial(this.threshold.current, {
      'size': [50,50], 'interaction': 'radial', 'mode': 'relative',
      'min': 1, 'max': 30, 'step': 0, 
      'value':  10
    });
    this.nxThreshold.on('change', v => {
      this.setState({threshold: v})
      this.props.outputChain.updateCompressorThreshold(v * -1)
    });

    this.nxRatio = new Nexus.Dial(this.ratio.current, {
      'size': [50,50], 'interaction': 'radial', 'mode': 'relative',
      'min': 1, 'max': 10, 'step': 0, 
      'value':  2
    });
    this.nxRatio.on('change', v => {
      this.setState({ratio: v})
      this.props.outputChain.updateCompressorRatio(v)
    });
  }

  render() {
    return (
      <div className="Compressor">
        COMPRESSOR
        <div className="wrap">
          <div className="knobWrap">
            <div ref={this.threshold} />
            <label>threshold</label>
          </div>
          <div className="knobWrap">
            <div ref={this.ratio} />
            <label>ratio</label>
          </div>
        </div>
      </div>

    );
  }
}

export default Compressor;
