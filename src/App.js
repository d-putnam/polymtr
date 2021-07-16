import React, { Component } from 'react';
import Nexus from 'nexusui'
import Channel from './components/Channel/Channel'
import Reverb from './components/Reverb/Reverb'
import Delay from './components/Delay/Delay'
import Compressor from './components/Compressor/Compressor'
import Power from './components/Power/Power'
import { OutputChain } from './ToneRack'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    Nexus.colors.fill = "rgba(225,225,225,0.2)"
    Nexus.colors.accent = "rgba(34, 147, 147)"
    this.outputChain = new OutputChain() 
    this.state = {
      isPlaying: false
    }
  }

  isPlaying = (state) => {
    this.setState({isPlaying: state})
  }

  render() {
    return (
      <div className="App">
        <div className="appWrap">
          <div className="channelWrap">
            <Power outputChain={this.outputChain} stateHandler={this.isPlaying}/>
            <Compressor outputChain={this.outputChain}/>
            <Reverb outputChain={this.outputChain}/>
            <Delay outputChain={this.outputChain}/>
            <Channel part={'kick'} outputChain={this.outputChain} isPlaying={this.state.isPlaying}/>
            <Channel part={'hats'} outputChain={this.outputChain} isPlaying={this.state.isPlaying}/>
            <Channel part={'snare'} outputChain={this.outputChain} isPlaying={this.state.isPlaying}/>
            <Channel part={'perc'} outputChain={this.outputChain} isPlaying={this.state.isPlaying}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
