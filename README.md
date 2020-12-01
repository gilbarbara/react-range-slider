# react-range-slider

[![npm version](https://badge.fury.io/js/%40gilbarbara%2Freact-range-slider.svg)](https://badge.fury.io/js/%40gilbarbara%2Freact-range-slider) [![build status](https://travis-ci.org/gilbarbara/react-range-slider.svg)](https://travis-ci.org/gilbarbara/react-range-slider) [![Maintainability](https://api.codeclimate.com/v1/badges/cc1a3d9dd8e9731beeaf/maintainability)](https://codeclimate.com/github/gilbarbara/react-range-slider/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/cc1a3d9dd8e9731beeaf/test_coverage)](https://codeclimate.com/github/gilbarbara/react-range-slider/test_coverage)

A range slider component for React

View the [demo](https://codesandbox.io/s/github/gilbarbara/react-range-slider/tree/master/demo)

## Installation

```sh
npm i @gilbarbara/react-range-slider
```

## Usage

```typescript
import React, { useState } from 'react';
import RangeSlider, { RangeSliderPosition, RangeSliderProps } from '@gilbarbara/react-range-slider';

export default function App() {
	const [x, setX] = useState(10);

	const handleChange = (position: RangeSliderPosition, props: RangeSliderProps) => {
		setX(position.x);
	};

	return <RangeSlider axis="x" x={x} onChange={handleChange} />;
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

**onAfterChange** {function}  
It is called after the slider changed (click or drag)

**onChange** {function}  
It is called for each step

**onDragEnd** {function}  
It is called after dragging the thumb

## Customization

You can customize the UI with a `styles` prop.
Check out [styles.ts](src/styles.ts) for more information.

```jsx
<RangeSlider
  ...
  styles={{
    height: '10px',
    trackBorderRadius: 0,
  }}
/>
```

## License

MIT
