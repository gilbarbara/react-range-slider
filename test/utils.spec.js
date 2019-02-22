import { getCoordinates, getValues, round } from '../src/utils';

describe('utils', () => {
  describe('getCoordinates', () => {
    it('should return the event coordinates with MouseEvent', () => {
      const event = new MouseEvent('click');

      expect(getCoordinates(event)).toEqual({ x: 0, y: 0 });
    });

    it('should return the event coordinates with TouchEvent', () => {
      const event = new TouchEvent('touchstart', { touches: [{ clientX: 10, clientY: 100 }] });

      expect(getCoordinates(event)).toEqual({ x: 10, y: 100 });
    });
  });

  describe('getValues', () => {
    const props = {
      axis: 'x',
      x: 10,
      xMin: 0,
      xMax: 100,
      xStep: 10,
      y: 10,
      yMin: 0,
      yMax: 100,
      yStep: 10,
    };

    it('should return x,y values', () => {
      expect(getValues({ x: 10, y: 10 }, props, { height: 100, width: 20 })).toEqual({
        x: 50,
        y: 0,
      });
      expect(
        getValues({ x: -10, y: -10 }, { ...props, axis: 'y' }, { height: 100, width: 20 }),
      ).toEqual({
        x: 0,
        y: 0,
      });
      expect(
        getValues({ x: 110, y: 110 }, { ...props, axis: 'xy' }, { height: 100, width: 20 }),
      ).toEqual({
        x: 100,
        y: 100,
      });
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
