import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import RangeSlider from '../src';

const mockOnChange = jest.fn();
const mockOnDragEnd = jest.fn();

function setup(axis: 'x' | 'y' | 'xy' = 'x'): ReactWrapper {
  return mount(
    <RangeSlider
      axis={axis}
      classNamePrefix="rrs"
      onChange={mockOnChange}
      onDragEnd={mockOnDragEnd}
    />,
  );
}

describe('RangeSlider', () => {
  describe('with axis `x`', () => {
    const wrapper = setup('x' as const);

    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should handle mousedown on the handle', () => {
      // @ts-ignore
      Element.prototype.getBoundingClientRect = () => ({
        bottom: 0,
        height: 20,
        left: 50,
        right: 0,
        top: 50,
        width: 200,
      });

      wrapper.find('.rrs__handle').simulate('mousedown', {
        clientX: 100,
        clientY: 0,
        currentTarget: {},
      });

      // @ts-ignore
      expect(wrapper.instance().offset).toEqual({ x: 100, y: 0 });
    });

    it('should handle mousemove', () => {
      // @ts-ignore
      Element.prototype.getBoundingClientRect = () => ({
        bottom: 0,
        height: 20,
        left: 50,
        right: 0,
        top: 50,
        width: 200,
      });

      document.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 230,
          clientY: 0,
        }),
      );

      expect(mockOnChange).toHaveBeenLastCalledWith(
        { x: 65, y: 0 },
        {
          axis: 'x',
          classNamePrefix: 'rrs',
          onChange: expect.any(Function),
          onDragEnd: expect.any(Function),
          x: 0,
          xMax: 100,
          xMin: 0,
          xStep: 1,
          y: 0,
          yMax: 100,
          yMin: 0,
          yStep: 1,
        },
      );
    });

    it('should handle mouseup', () => {
      document.dispatchEvent(
        new MouseEvent('mouseup', {
          clientX: 230,
          clientY: 0,
        }),
      );

      expect(mockOnDragEnd).toHaveBeenLastCalledWith(
        { x: 65, y: 0 },
        {
          axis: 'x',
          classNamePrefix: 'rrs',
          onChange: expect.any(Function),
          onDragEnd: expect.any(Function),
          x: 0,
          xMax: 100,
          xMin: 0,
          xStep: 1,
          y: 0,
          yMax: 100,
          yMin: 0,
          yStep: 1,
        },
      );
    });

    it('should handle touchstart on the handle', () => {
      // @ts-ignore
      Element.prototype.getBoundingClientRect = () => ({
        bottom: 0,
        height: 20,
        left: 50,
        right: 0,
        top: 50,
        width: 200,
      });

      wrapper.find('.rrs__handle').simulate('touchstart', {
        clientX: 50,
        clientY: 0,
        currentTarget: {},
      });

      // @ts-ignore
      expect(wrapper.instance().offset).toEqual({ x: 50, y: 0 });
    });

    it('should handle clicks on the track', () => {
      // @ts-ignore
      Element.prototype.getBoundingClientRect = () => ({
        bottom: 0,
        height: 20,
        left: 50,
        right: 0,
        top: 50,
        width: 200,
      });

      wrapper.find('.rrs__track').simulate('click', {
        clientX: 100,
        clientY: 0,
        currentTarget: {},
      });

      expect(mockOnChange).toHaveBeenLastCalledWith(
        { x: 25, y: 0 },
        {
          axis: 'x',
          classNamePrefix: 'rrs',
          onChange: expect.any(Function),
          onDragEnd: expect.any(Function),
          x: 0,
          xMax: 100,
          xMin: 0,
          xStep: 1,
          y: 0,
          yMax: 100,
          yMin: 0,
          yStep: 1,
        },
      );
    });
  });

  describe('with axis `xy`', () => {
    const wrapper = setup('xy');

    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('with axis `y`', () => {
    const wrapper = setup('y');

    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
