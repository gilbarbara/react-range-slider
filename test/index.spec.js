import React from 'react';
import RangeSlider from '../src';

const mockOnChange = jest.fn();
const mockOnDragEnd = jest.fn();

describe('RangeSlider', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<RangeSlider onChange={mockOnChange} onDragEnd={mockOnDragEnd} />);
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle mousedown on the handle', () => {
    Element.prototype.getBoundingClientRect = () => ({
      width: 200,
      height: 20,
      top: 50,
      left: 50,
      right: 0,
      bottom: 0,
    });

    wrapper.find('.rrs-handle').simulate('mousedown', {
      clientX: 100,
      clientY: 0,
      currentTarget: {},
    });

    expect(wrapper.instance().offset).toEqual({ x: 100, y: 0 });
  });

  it('should handle mousemove', () => {
    Element.prototype.getBoundingClientRect = () => ({
      width: 200,
      height: 20,
      top: 50,
      left: 50,
      right: 0,
      bottom: 0,
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
    Element.prototype.getBoundingClientRect = () => ({
      width: 200,
      height: 20,
      top: 50,
      left: 50,
      right: 0,
      bottom: 0,
    });

    wrapper.find('.rrs-handle').simulate('touchstart', {
      clientX: 50,
      clientY: 0,
      currentTarget: {},
    });

    expect(wrapper.instance().offset).toEqual({ x: 50, y: 0 });
  });

  it('should handle clicks on the track', () => {
    Element.prototype.getBoundingClientRect = () => ({
      width: 200,
      height: 20,
      top: 50,
      left: 50,
      right: 0,
      bottom: 0,
    });

    wrapper.find('.rrs-track').simulate('click', {
      clientX: 100,
      clientY: 0,
      currentTarget: {},
    });

    expect(mockOnChange).toHaveBeenLastCalledWith(
      { x: 25, y: 0 },
      {
        axis: 'x',
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
