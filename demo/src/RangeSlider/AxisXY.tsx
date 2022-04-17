import React, { ChangeEvent, useState } from 'react';
import RangeSlider, { RangeSliderPosition, RangeSliderProps } from '@gilbarbara/react-range-slider';

import { CurrentValue, Header, Prop, Props, RangeWrapperXY, Title } from './components';

export default function AxisXY() {
  const [{ x, y }, setPosition] = useState({ x: 20, y: 20 });

  const handleDragEnd = (position: RangeSliderPosition, props: RangeSliderProps) => {
    console.log('> handleDragEnd', position, props);
  };

  const handleChange = ({ x, y }: RangeSliderPosition) => {
    console.log('handleChange', { x, y });
    setPosition({ x, y });
  };

  const handleRangeChangeY = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setPosition(s => ({
      ...s,
      y: parseInt(value, 10),
    }));
  };

  const handleRangeChangeX = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setPosition(s => ({
      ...s,
      x: parseInt(value, 10),
    }));
  };

  const min = 0;
  const max = 200;
  const step = 2;

  return (
    <div>
      <Header>
        <Title>axis: xy</Title>
        <Props>
          with <Prop>onChange</Prop> and <Prop>onDragEnd</Prop>
        </Props>
      </Header>
      <p>{`min: ${min} | max: ${max} | step: ${step}`}</p>
      <RangeWrapperXY>
        <RangeSlider
          axis="xy"
          onChange={handleChange}
          onDragEnd={handleDragEnd}
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
          xMax={max}
          xMin={min}
          xStep={step}
          y={y}
          yMax={max}
          yMin={min}
          yStep={step}
        />
      </RangeWrapperXY>
      <CurrentValue>{`x: ${x} | y: ${y}`}</CurrentValue>

      <input max={max} min={min} onChange={handleRangeChangeX} step={step} type="range" value={x} />
      <br />
      <input max={max} min={min} onChange={handleRangeChangeY} step={step} type="range" value={y} />
    </div>
  );
}
