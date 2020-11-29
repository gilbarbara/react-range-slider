import React, { ChangeEvent } from 'react';
import RangeSlider, { RangeSliderPosition, RangeSliderProps } from '@gilbarbara/react-range-slider';

export default class AxisY extends React.Component {
  state = {
    y: 20,
  };

  handleDragEnd = (position: RangeSliderPosition, props: RangeSliderProps) => {
    console.log('> handleDragEnd', position, props);
  };

  handleChange = ({ y }: RangeSliderPosition) => {
    console.log('handleChange', { y });
    this.setState({ y });
  };

  handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    this.setState({
      y: parseInt(value, 10),
    });
  };

  render() {
    const { y } = this.state;
    const min = 0;
    const max = 200;
    const step = 1;

    return (
      <div>
        <h3>axis: y</h3>
        <p>{`min: ${min} | max: ${max} | step: ${step}`}</p>
        <div style={{ height: 200 }}>
          <RangeSlider
            axis="y"
            styles={{
              options: {
                thumbBorderRadius: 16,
                thumbSize: 16,
                thumbSpace: 6,
                rangeColor: '#f04',
                trackBorderRadius: 0,
                width: 10,
              },
            }}
            y={y}
            yMin={min}
            yMax={max}
            yStep={step}
            onDragEnd={this.handleDragEnd}
            onChange={this.handleChange}
          />
        </div>
        <div>{`y: ${y}`}</div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={y}
          onChange={this.handleRangeChange}
        />
      </div>
    );
  }
}
