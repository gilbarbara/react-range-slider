import React, { ChangeEvent, useState } from 'react';
import RangeSlider, { RangeSliderPosition } from '@gilbarbara/react-range-slider';

import { CurrentValue, Header, Prop, Props, Title } from './components';

export default function AxisX() {
  const [x, setX] = useState(20);

  const handleChange = ({ x }: RangeSliderPosition) => {
    console.log('> handleChange', x);
    setX(x);
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
      <RangeSlider axis="x" x={x} xMin={min} xMax={max} xStep={step} onChange={handleChange} />
      <CurrentValue>{`x: ${x}`}</CurrentValue>

      <input type="range" min={min} max={max} step={step} value={x} onChange={handleRangeChange} />
    </div>
  );
}
