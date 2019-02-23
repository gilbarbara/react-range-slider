# react-range-slider

[![npm version](https://badge.fury.io/js/%40gilbarbara%2Freact-range-slider.svg)](https://badge.fury.io/js/%40gilbarbara%2Freact-range-slider) [![build status](https://travis-ci.org/gilbarbara/react-range-slider.svg)](https://travis-ci.org/gilbarbara/react-range-slider) [![Maintainability](https://api.codeclimate.com/v1/badges/cc1a3d9dd8e9731beeaf/maintainability)](https://codeclimate.com/github/gilbarbara/react-range-slider/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/cc1a3d9dd8e9731beeaf/test_coverage)](https://codeclimate.com/github/gilbarbara/react-range-slider/test_coverage)

A range slider component for React

View the [demo](https://qxxop6x4w4.codesandbox.io/)

## Installation

```sh
npm i @gilbarbara/react-range-slider
```

## Usage

```jsx
import React, { Component } from 'react';
import RangeSlider from '@gilbarbara/react-range-slider';

import '@gilbarbara/react-range-slider/lib/styles.css';

export default class App extends Component {
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

## Customization

If you are using SCSS you can change the variables and import the .scss directly.

```scss
$rrs-color: #007bff;
$rrs-handle-space: 6px;
$rrs-handle-border-color: #000;
$rrs-handle-color: #fff;
$rrs-handle-size: 10px;
$rrs-handle-size-xy: 20px;
$rrs-height: 20px;
$rrs-padding: 6px;
$rrs-track-color: #ccc;
$rrs-width: 20px;

@import '~@gilbarbara/react-range-slider/lib/styles';
```

## License

MIT
