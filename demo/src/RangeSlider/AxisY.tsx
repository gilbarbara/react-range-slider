import React, { useState } from 'react';
import RangeSlider, { RangeSliderPosition, RangeSliderProps } from '@gilbarbara/react-range-slider';

import { CurrentValue, Header, Prop, Props, RangeWrapperY, Title } from './components';

export default function AxisY() {
  const [y, setY] = useState(0);

  const handleAfterEnd = (position: RangeSliderPosition, props: RangeSliderProps) => {
    console.log('> handleAfterEnd', position, props);

    setY(position.y);
  };

  const min = 0;
  const max = 200;
  const step = 1;

  return (
    <div>
      <Header>
        <Title>axis: y (uncontrolled)</Title>
        <Props>
          with <Prop>onAfterEnd</Prop>
        </Props>
      </Header>
      <p>{`min: ${min} | max: ${max} | step: ${step}`}</p>
      <RangeWrapperY>
        <RangeSlider
          axis="y"
          onAfterEnd={handleAfterEnd}
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
          yMax={max}
          yMin={min}
          yStep={step}
        />
      </RangeWrapperY>
      <CurrentValue>{`y: ${y}`}</CurrentValue>

      <input max={max} min={min} step={step} type="range" value={y} />
    </div>
  );
}
