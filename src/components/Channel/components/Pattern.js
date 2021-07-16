import React, { Component } from 'react';
import Nexus from 'nexusui'
import './Pattern.css';


class Pattern extends Component {

  constructor(props) {
    super(props);

    let length = props.track.pattern.length
        //Math.floor(Math.random() * 11) + 5
    let density = props.track.pattern.density
        //Math.floor(Math.random() * length / 1.5)
        //if (density === 0) {density = 1}
    let dV = density / length
    let notes = euclid(length, density)

    this.patternGraph = React.createRef()
    this.lengthSlider = React.createRef()
    this.lengthNumber = React.createRef()
    this.densitySlider = React.createRef()
    this.densityNumber = React.createRef()

    this.state = {
      notes: notes,
      patternLength: length,
      noteDensity: density,
      densityValue: dV,

      isDrawing: false,
      mouseDown: 0, 
      mouseUp: 0
    }
  }

  componentDidMount() {
    this.props.track.initSequence(this.state.notes);
    this.props.track.sequenceCallback(() => {
      this.nxPatternGraph.stepper.value = Math.floor(this.props.track.sequence.progress * this.state.patternLength) - 1;
      this.nxPatternGraph.next()
    });

    this.nxPatternGraph = new Nexus.Sequencer(this.patternGraph.current, {
      'size': [270,25],
      'mode': 'toggle',
      'rows': 1,
      'columns': this.state.patternLength,
      'paddingRow': 0,
      'paddingColumn': 5
    });
    this.borderColor = "#ff0000"
    this.nxPatternGraph.colorize("mediumLight", this.borderColor);
    this.nxPatternGraph.matrix.set.row(0, this.state.notes)
    let blocks = this.patternGraph.current.querySelectorAll('rect');
    blocks.forEach(block => {
      block.style.strokeWidth = 5
    })

    this.nxLengthSlider = new Nexus.Slider(this.lengthSlider.current, {
      'size': [270,20],
      'mode': 'absolute',
      'min': 2, 'max': 16,
      'step': 1, 'value': this.state.patternLength
    });
    this.nxLengthSlider.on('change', v => {
      this.changePatternLength(v)
    });
    this.nxLengthNumber = new Nexus.Number(this.lengthNumber.current, {
      'size': [35,30],
      'value': this.state.patternLength,
      'min': 2,
      'max': 16,
      'step': 1
    })
    this.nxLengthNumber.link(this.nxLengthSlider)
    this.nxLengthNumber.colorize("fill", "#ffffffa8");
    this.lengthNumber.current.classList.add('box','left')

    this.nxDensitySlider = new Nexus.Slider(this.densitySlider.current, {
      'size': [270,20],
      'mode': 'absolute',
      'min': 1, 'max': 100,
      'step': 1, 'value': Math.round(this.state.densityValue * 100)
    });
    this.nxDensitySlider.on('change', v => {
      this.changeDensityPercentage(v)
    });

    this.nxDensityNumber = new Nexus.Number(this.densityNumber.current, {
      'size': [35,30],
      'value': this.state.noteDensity,
      'min': 1,
      'max': this.state.patternLength,
      'step': 1
    })
    this.nxDensityNumber.on('change', v => {
      this.changePatternDensity(v)
    });  
    this.nxDensityNumber.colorize("fill", "#ffffffa8");
    this.densityNumber.current.classList.add('box','right')
  }


  componentDidUpdate(prevProps, prevState) {

    if (prevProps.isPlaying !== this.props.isPlaying) {
      if (this.props.isPlaying === false) {
        this.nxPatternGraph.colorize("mediumLight", "#ff000000");
        this.nxPatternGraph.next()
      } else {
        this.nxPatternGraph.colorize("mediumLight", this.borderColor);
      }
    }

    if (prevState.notes !== this.state.notes) {
      this.props.track.updatePattern(this.state.notes)
      this.nxPatternGraph.matrix.set.row(0, this.state.notes)
      let blocks = this.patternGraph.current.querySelectorAll('rect');
      blocks.forEach(block => {
        block.style.strokeWidth = 5
      })
    } 

    if (prevState.mouseUp !== this.state.mouseUp) {
      this.props.track.updatePattern(this.state.notes)
      this.nxPatternGraph.matrix.set.row(0, this.state.notes)
      let blocks = this.patternGraph.current.querySelectorAll('rect');
      blocks.forEach(block => {
        block.style.strokeWidth = 5
      })    
    }

    if (prevState.patternLength !== this.state.patternLength) {
      this.nxPatternGraph.columns = this.state.patternLength
      this.props.track.sequenceCallback(() => {
        this.nxPatternGraph.stepper.value = Math.floor(this.props.track.sequence.progress * this.state.patternLength) - 1;
        this.nxPatternGraph.next()
      });
      this.nxDensityNumber.max = this.state.patternLength
      this.nxLengthNumber.value = this.state.patternLength
    }

    
    if (prevState.noteDensity !== this.state.noteDensity) {
      this.nxDensityNumber.value = this.state.noteDensity
    }

    if (prevState.densityValue !== this.state.densityValue) {
      this.nxDensitySlider.value = this.state.densityValue * 100
    }
  }

  changePatternLength(v) {
    this.setState({patternLength: v})
    this.setState({noteDensity: 
      this.state.noteDensity > v 
        ? v
        : this.state.noteDensity
    })
    this.setState({densityValue: this.state.noteDensity / this.state.patternLength})
    let pattern = euclid(this.state.patternLength, this.state.noteDensity)
    this.setState({notes: pattern})
  }

  changePatternDensity(v) {
    this.setState({densityValue: v/this.state.patternLength})
    this.setState({noteDensity: v})
    let pattern = euclid(this.state.patternLength, this.state.noteDensity)
    this.setState({notes: pattern})
  }

  changeDensityPercentage(v) {
    this.setState({densityValue: v/100})
    this.setState({noteDensity: Math.round((v/100) * this.state.patternLength)})
    let pattern = euclid(this.state.patternLength, this.state.noteDensity)
    this.setState({notes: pattern})
  }

  dragStart(e) {
    this.setState({isDrawing: true})
    let rect = e.target.getBoundingClientRect();
    let rectSize = rect.right - rect.left
    let xPos = e.clientX - rect.left; 
    let xPer = xPos / rectSize
    this.setState({mouseDown: xPer})
  }

  dragEnd(e) {
    if (this.state.isDrawing) {
      let rect = e.target.getBoundingClientRect();
      let rectSize = rect.right - rect.left
      let xPos = e.clientX - rect.left; 
      let xPer = xPos / rectSize
      this.setState({mouseUp: xPer})
      let change = Math.floor((xPer - this.state.mouseDown) * this.state.patternLength)
      console.log('CHANGE: ', change)
      this.setState({notes: this.rotateArray(change)})
    }
    this.setState({isDrawing: false})
  }

  rotateArray(amount) {
    let array = this.state.notes
    if (amount > 0) {
      for (let i=0; i<amount; i++) {
        array.unshift(array.pop())
      }
    } else {
      amount = Math.abs(amount)
      for (let i=0; i<amount; i++) {
        array.push(array.shift())
      }
    }
    return array
  }

  render() {
    return (
      <div className="Pattern">

        <div className="infoWrap left hideSmall">
          <div ref={this.graphOverlay} className="labelWrap left">
            <label>
              Pattern Length
            </label>
            <div ref={this.lengthNumber} />
          </div>
          <label>
            ⟶
          </label>
        </div>

        <div className="patternWrap">
          <div ref={this.lengthSlider} />
          <div onMouseDown={this.dragStart.bind(this)} onMouseUp={this.dragEnd.bind(this)} >
            <div ref={this.patternGraph} className="noClick" />
          </div>
          <div ref={this.densitySlider} />
        </div>

        <div className="infoWrap right hideSmall">
          <label>
            ⟵
          </label>
          <div className="labelWrap right">
            <div ref={this.densityNumber} className="box right" />
            <label>
              Pattern Density
            </label>
          </div>
        </div>

      </div>
    );
  }
}


// thanks Jeff Holtzkener for the inspo
// https://medium.com/code-music-noise/euclidean-rhythms-391d879494df
const euclid = (length, density,) => {
  let slope = density / length
  let result = []
  let previous = null
  for (let i=0; i<length; i++) {
      let current = Math.floor(i * slope)
      result.push(current !== previous ? 1 : 0)
      previous = current
  }
  return result
}

export default Pattern;

