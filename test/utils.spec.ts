import {
  getCoordinates,
  getNormalizedValue,
  getPosition,
  isNumber,
  isUndefined,
  parseNumber,
  removeProperties,
  round,
} from '../src/utils';

describe('utils', () => {
  describe('getCoordinates', () => {
    it('should return the event coordinates with click', () => {
      const event = new MouseEvent('click');

      expect(getCoordinates(event, { x: 10, y: 10 })).toEqual({ x: 0, y: 0 });
    });

    it('should return the event coordinates with touchstart', () => {
      const event = new TouchEvent('touchstart', {
        touches: [{ clientX: 10, clientY: 100 } as Touch],
      });

      expect(getCoordinates(event, { x: 10, y: 10 })).toEqual({ x: 10, y: 100 });
    });

    it('should return the event coordinates with touchend', () => {
      const event = new TouchEvent('touchstart', {
        touches: [],
      });

      expect(getCoordinates(event, { x: 10, y: 10 })).toEqual({ x: 10, y: 10 });
    });
  });

  describe('getNormalizedValue', () => {
    it('should return properly', () => {
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
  });

  describe('getPosition', () => {
    beforeAll(() => {
      // @ts-ignore
      Element.prototype.getBoundingClientRect = () => ({
        bottom: 0,
        height: 100,
        left: 0,
        right: 0,
        top: 0,
        width: 20,
      });
    });

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

    it('should return x,y values', () => {
      const element = document.createElement('div');

      expect(getPosition({ x: 10, y: 10 }, props, element)).toEqual({
        x: 50,
        y: 0,
      });
      expect(getPosition({ x: -10, y: -10 }, { ...props, axis: 'y' }, element)).toEqual({
        x: 0,
        y: 0,
      });
      expect(getPosition({ x: 110, y: 110 }, { ...props, axis: 'xy' }, null)).toEqual({
        x: 100,
        y: 100,
      });
    });
  });

  describe('isNumber', () => {
    it('should return properly', () => {
      expect(isNumber(10)).toBe(true);
      expect(isNumber('10')).toBe(false);
    });
  });

  describe('isUndefined', () => {
    it('should return properly', () => {
      expect(isUndefined(undefined)).toBe(true);
      expect(isUndefined('string')).toBe(false);
    });
  });

  describe('num', () => {
    it('should return a number', () => {
      expect(parseNumber(5)).toBe(5);
      expect(parseNumber('5')).toBe(5);
    });
  });

  describe('removeProperties', () => {
    it('should return properly', () => {
      const object = { a: 1, b: 2 };

      expect(removeProperties(object, 'b')).toEqual({ a: 1 });
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
