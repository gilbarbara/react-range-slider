import React, { ChangeEvent, useState } from 'react';
import RangeSlider, { RangeSliderPosition, RangeSliderProps } from '@gilbarbara/react-range-slider';

import { CurrentValue, Header, Prop, Props, Title } from './components';

export default function AxisX() {
  const [x, setX] = useState(20);

  const handleChange = (position: RangeSliderPosition, props: RangeSliderProps) => {
    console.log('> handleChange', position, props);

    setX(position.x);
  };

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setX(parseInt(value, 10));
  };

  const min = 0;
  const max = 200;
  const step = 5;

  return (
    <div>
      <Header>
        <Title>axis: x (controlled)</Title>
        <Props>
          with <Prop>onChange</Prop>
        </Props>
      </Header>
      <p>{`min: ${min} | max: ${max} | step: ${step}`}</p>
      <RangeSlider axis="x" onChange={handleChange} x={x} xMax={max} xMin={min} xStep={step} />
      <CurrentValue>{`x: ${x}`}</CurrentValue>

      <input max={max} min={min} onChange={handleRangeChange} step={step} type="range" value={x} />
    </div>
  );
}
