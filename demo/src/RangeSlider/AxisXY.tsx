import React, { ChangeEvent } from 'react';
import RangeSlider, { RangeSliderPosition, RangeSliderProps } from '@gilbarbara/react-range-slider';

export default class AxisXY extends React.Component {
  state = {
    x: 20,
    y: 20,
  };

  handleDragEnd = (position: RangeSliderPosition, props: RangeSliderProps) => {
    console.log('> handleDragEnd', position, props);
  };

  handleChange = ({ x, y }: RangeSliderPosition) => {
    console.log('handleChange', { x, y });
    this.setState({ x, y });
  };

  handleRangeChangeY = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    this.setState({
      y: parseInt(value, 10),
    });
  };

  handleRangeChangeX = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    this.setState({
      x: parseInt(value, 10),
    });
  };

  render() {
    const { x, y } = this.state;
    const min = 0;
    const max = 200;
    const step = 2;

    return (
      <div>
        <h3>axis: xy</h3>
        <p>{`min: ${min} | max: ${max} | step: ${step}`}</p>
        <div style={{ margin: '0 auto', height: 200, width: 200 }}>
          <RangeSlider
            axis="xy"
            styles={{
              options: {
                rangeColor: '#31ff00',
                thumbBorderRadiusXY: 4,
                thumbSizeXY: 15,
                thumbSpace: 0,
                width: 10,
              },
            }}
            x={x}
            xMin={min}
            xMax={max}
            xStep={step}
            y={y}
            yMin={min}
            yMax={max}
            yStep={step}
            onDragEnd={this.handleDragEnd}
            onChange={this.handleChange}
          />
        </div>
        <div>{`x: ${x} | y: ${y}`}</div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={x}
          onChange={this.handleRangeChangeX}
        />
        <br />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={y}
          onChange={this.handleRangeChangeY}
        />
      </div>
    );
  }
}
