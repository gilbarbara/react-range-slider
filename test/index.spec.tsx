import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import RangeSlider, { RangeSliderProps } from '../src';

const mockOnAfterEnd = jest.fn();
const mockOnChange = jest.fn();
const mockOnDragEnd = jest.fn();

function setup(axis = 'x') {
  return render(
    <RangeSlider
      axis={axis as RangeSliderProps['axis']}
      className="test"
      onAfterEnd={mockOnAfterEnd}
      onChange={mockOnChange}
      onDragEnd={mockOnDragEnd}
    />,
  );
}

describe('RangeSlider', () => {
  beforeAll(() => {
    // @ts-ignore
    Element.prototype.getBoundingClientRect = () => ({
      bottom: 0,
      height: 20,
      left: 50,
      right: 0,
      top: 50,
      width: 200,
    });
  });

  afterEach(() => {
    mockOnAfterEnd.mockClear();
    mockOnChange.mockClear();
    mockOnDragEnd.mockClear();
  });

  describe('with `x` axis', () => {
    it('should render properly', () => {
      const { container } = setup();

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should handle mouse events', () => {
      setup();

      fireEvent.mouseDown(screen.getByRole('slider'), {
        clientX: 100,
        clientY: 0,
        currentTarget: {},
      });

      fireEvent.mouseMove(document, {
        clientX: 230,
        clientY: 0,
        currentTarget: {},
      });

      fireEvent.mouseUp(document, {
        clientX: 230,
        clientY: 0,
        currentTarget: {},
      });

      expect(mockOnAfterEnd).toHaveBeenLastCalledWith({ x: 65, y: 0 }, expect.any(Object));
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 65, y: 0 }, expect.any(Object));
      expect(mockOnDragEnd).toHaveBeenLastCalledWith({ x: 65, y: 0 }, expect.any(Object));
      expect(screen.getByRole('slider')).toMatchSnapshot();
    });

    it('should handle touch events', () => {
      setup();

      fireEvent.touchStart(screen.getByRole('slider'), {
        touches: [
          {
            clientX: 100,
            clientY: 0,
          },
        ],
        currentTarget: {},
      });

      fireEvent.touchMove(document, {
        touches: [
          {
            clientX: 150,
            clientY: 0,
          },
        ],
        currentTarget: {},
      });

      fireEvent.touchEnd(document, {
        touches: [],
        currentTarget: {},
      });

      expect(mockOnAfterEnd).toHaveBeenLastCalledWith({ x: 25, y: 0 }, expect.any(Object));
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 25, y: 0 }, expect.any(Object));
      expect(mockOnDragEnd).toHaveBeenLastCalledWith({ x: 25, y: 0 }, expect.any(Object));
      expect(screen.getByRole('slider')).toMatchSnapshot();
    });

    it('should handle clicks on the track', () => {
      setup();
      const [track] = screen.getAllByRole('presentation');

      fireEvent.click(track, {
        clientX: 80,
        clientY: 0,
        currentTarget: {},
      });

      expect(mockOnAfterEnd).toHaveBeenLastCalledWith({ x: 15, y: 0 }, expect.any(Object));
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 15, y: 0 }, expect.any(Object));
      expect(screen.getByRole('slider')).toMatchSnapshot();
    });

    it('should handle focus, keydown and blur', () => {
      setup();

      fireEvent.focus(screen.getByRole('slider'));

      fireEvent.keyDown(screen.getByRole('slider'), { code: 'ArrowRight' });
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 1, y: 0 }, expect.any(Object));

      fireEvent.keyDown(screen.getByRole('slider'), { code: 'ArrowUp' });
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 2, y: 0 }, expect.any(Object));

      fireEvent.keyDown(screen.getByRole('slider'), { code: 'ArrowLeft' });
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 1, y: 0 }, expect.any(Object));

      fireEvent.keyDown(screen.getByRole('slider'), { code: 'ArrowDown' });
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 0, y: 0 }, expect.any(Object));

      fireEvent.blur(screen.getByRole('slider'));

      fireEvent.keyDown(screen.getByRole('slider'), { code: 'ArrowUp' });
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 0, y: 0 }, expect.any(Object));
    });
  });

  describe('with `xy` axis', () => {
    it('should render properly', () => {
      const { container } = setup('xy');

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should handle focus, keydown and blur', () => {
      setup('xy');

      fireEvent.focus(screen.getByRole('slider'));

      fireEvent.keyDown(screen.getByRole('slider'), { code: 'ArrowRight' });
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 1, y: 0 }, expect.any(Object));

      fireEvent.keyDown(screen.getByRole('slider'), { code: 'ArrowUp' });
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 1, y: 1 }, expect.any(Object));

      fireEvent.keyDown(screen.getByRole('slider'), { code: 'ArrowLeft' });
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 0, y: 1 }, expect.any(Object));

      fireEvent.keyDown(screen.getByRole('slider'), { code: 'ArrowDown' });
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 0, y: 0 }, expect.any(Object));

      fireEvent.blur(screen.getByRole('slider'));

      fireEvent.keyDown(screen.getByRole('slider'), { code: 'ArrowUp' });
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 0, y: 0 }, expect.any(Object));
    });
  });

  describe('with `y` axis', () => {
    it('should render properly', () => {
      const { container } = setup('y');

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should handle focus, keydown and blur', () => {
      setup('y');

      fireEvent.focus(screen.getByRole('slider'));

      fireEvent.keyDown(screen.getByRole('slider'), { code: 'ArrowRight' });
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 0, y: 1 }, expect.any(Object));

      fireEvent.keyDown(screen.getByRole('slider'), { code: 'ArrowUp' });
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 0, y: 2 }, expect.any(Object));

      fireEvent.keyDown(screen.getByRole('slider'), { code: 'ArrowLeft' });
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 0, y: 1 }, expect.any(Object));

      fireEvent.keyDown(screen.getByRole('slider'), { code: 'ArrowDown' });
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 0, y: 0 }, expect.any(Object));

      fireEvent.blur(screen.getByRole('slider'));

      fireEvent.keyDown(screen.getByRole('slider'), { code: 'ArrowUp' });
      expect(mockOnChange).toHaveBeenLastCalledWith({ x: 0, y: 0 }, expect.any(Object));
    });
  });
});
