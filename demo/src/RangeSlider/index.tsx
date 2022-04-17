import React from 'react';
import styled from 'styled-components';

import AxisX from './AxisX';
import AxisXY from './AxisXY';
import AxisY from './AxisY';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Item = styled.div`
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin: 10px;
  min-width: 290px;
`;

function RangeSliderDemo() {
  return (
    <Wrapper>
      <Item>
        <AxisX />
      </Item>
      <Item>
        <AxisY />
      </Item>
      <Item>
        <AxisXY />
      </Item>
    </Wrapper>
  );
}

export default RangeSliderDemo;
