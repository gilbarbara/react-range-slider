# react-range-slider

A range slider component for React

## Installation

```sh
npm i @gilbarbara/react-range-slider
```

## Usage

```jsx
import React, { Component } from 'react';
import RangeSlider from '@gilbarbara/react-range-slider';

class App extends Component {
  state = {
    x: 10,
    y: 10,
  };

  handleChange = (position, props) => {
    this.setState(position);
  };

  render() {
    const { x, y } = this.state;

    return (
      <RangeSlider
        axis="xy"
        x={x}
        y={y}
        onChange={this.handleChange}
      />
    );
  }
}
```

## Props

**axis** {'x' | 'y' | 'xy'} ▶︎`x`  
Type of slider

**x** {number}  
Use with axis `x` or `xy`

**xMin** {number} ▶︎`0`  
Min value of X

**xMax** {number} ▶︎`100`  
Max value of X

**xStep** {number} ▶︎`1`  
Step of X

**y** {number}  
Use with axis `y` or `xy`

**yMin** {number} ▶︎`0`  
Min value of Y

**yMax** {number} ▶︎`100`  
Max value of Y

**yStep** {number} ▶︎`1`  
Step of Y

**onChange** {function} - **required**  
Change callback

**onDragEnd** {function}  
DragEnd callback

## License

MIT
