import React, { ChangeEvent } from 'react';
import RangeSlider, { RangeSliderPosition, RangeSliderProps } from '@gilbarbara/react-range-slider';

export default class AxisX extends React.Component {
  state = {
    x: 20,
  };

  handleDragEnd = (position: RangeSliderPosition, props: RangeSliderProps) => {
    console.log('> handleDragEnd', position, props);
  };

  handleChange = ({ x }: RangeSliderPosition) => {
    console.log('> handleChange', x);
    this.setState({ x });
  };

  handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    this.setState({
      x: parseInt(value, 10),
    });
  };

  render() {
    const { x } = this.state;
    const min = 0;
    const max = 200;
    const step = 5;

    return (
      <div>
        <h3>axis: x</h3>
        <p>{`min: ${min} | max: ${max} | step: ${step}`}</p>
        <RangeSlider
          axis="x"
          x={x}
          xMin={min}
          xMax={max}
          xStep={step}
          onDragEnd={this.handleDragEnd}
          onChange={this.handleChange}
        />
        <div>{`x: ${x}`}</div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={x}
          onChange={this.handleRangeChange}
        />
      </div>
    );
  }
}
