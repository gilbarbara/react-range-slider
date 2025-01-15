# react-range-slider

[![npm version](https://badge.fury.io/js/%40gilbarbara%2Freact-range-slider.svg)](https://badge.fury.io/js/%40gilbarbara%2Freact-range-slider) [![CI](https://github.com/gilbarbara/react-range-slider/actions/workflows/main.yml/badge.svg)](https://github.com/gilbarbara/react-range-slider/actions/workflows/main.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=gilbarbara_react-range-slider&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=gilbarbara_react-range-slider) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=gilbarbara_react-range-slider&metric=coverage)](https://sonarcloud.io/summary/new_code?id=gilbarbara_react-range-slider)

A range slider component for React

View the [demo](https://codesandbox.io/s/github/gilbarbara/react-range-slider/tree/main/demo)

## Installation

```sh
npm i @gilbarbara/react-range-slider
```

## Usage

```tsx
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

**onAfterEnd** {function}  
It is called after the slider changed (click or drag)

**onChange** {function}  
It is called for each step

**onDragEnd** {function}  
It is called after dragging the thumb

## Customization

You can customize the UI with a `styles` prop.
Check out [styles.ts](src/styles.ts) for more information.

```tsx
<RangeSlider
  // ...
  styles={{
    height: '10px',
    trackBorderRadius: 0,
  }}
/>
```

## License

MIT
