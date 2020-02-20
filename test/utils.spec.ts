import { getCoordinates, getNormalizedValue, getPosition, num, round } from '../src/utils';

describe('utils', () => {
  describe('getCoordinates', () => {
    it('should return the event coordinates with MouseEvent', () => {
      const event = new MouseEvent('click');

      expect(getCoordinates(event)).toEqual({ x: 0, y: 0 });
    });

    it('should return the event coordinates with TouchEvent', () => {
      const event = new TouchEvent('touchstart', {
        touches: [{ clientX: 10, clientY: 100 } as Touch],
      });

      expect(getCoordinates(event)).toEqual({ x: 10, y: 100 });
    });
  });

  describe('getNormalizedValue', () => {
    const props = {
      x: 10,
      xMax: 100,
      xMin: 0,
      y: 10,
      yMax: 20,
      yMin: -5,
    };

    expect(
      getNormalizedValue('x', {
        ...props,
        x: 120,
      }),
    ).toBe(100);

    expect(
      getNormalizedValue('y', {
        ...props,
        y: -10,
      }),
    ).toBe(-5);
  });

  describe('getPosition', () => {
    const props = {
      axis: 'x' as const,
      onChange: () => undefined,
      x: 10,
      xMax: 100,
      xMin: 0,
      xStep: 10,
      y: 10,
      yMax: 100,
      yMin: 0,
      yStep: 10,
    };

    const rect = {
      bottom: 0,
      height: 100,
      left: 0,
      right: 0,
      top: 0,
      width: 20,
    };

    it('should return x,y values', () => {
      expect(getPosition({ x: 10, y: 10 }, props, rect)).toEqual({
        x: 50,
        y: 0,
      });
      expect(getPosition({ x: -10, y: -10 }, { ...props, axis: 'y' }, rect)).toEqual({
        x: 0,
        y: 0,
      });
      expect(getPosition({ x: 110, y: 110 }, { ...props, axis: 'xy' }, rect)).toEqual({
        x: 100,
        y: 100,
      });
    });
  });

  describe('num', () => {
    it('should return a number', () => {
      expect(num(5)).toBe(5);
      expect(num('5')).toBe(5);
    });
  });

  describe('round', () => {
    it('should return the rounded value', () => {
      expect(round(62, 10)).toBe(70);
      expect(round(99, 10)).toBe(100);
      expect(round(11, 10)).toBe(20);
    });
  });
});
