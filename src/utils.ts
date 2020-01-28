/* eslint-disable @typescript-eslint/no-use-before-define */
import { PlainObject, RangeSliderPosition, RangeSliderProps } from './types';

/**
 * Remove properties from an object.
 */
export function blacklist(input: PlainObject, exclude: string | Array<string>): PlainObject {
  const output: PlainObject = {};
  const filter = Array.isArray(exclude) ? exclude : [exclude];

  for (const key in input) {
    if ({}.hasOwnProperty.call(input, key)) {
      if (!filter.includes(key)) {
        output[key] = input[key];
      }
    }
  }

  return output;
}

export function getCoordinates(e: MouseEvent | TouchEvent) {
  if (e instanceof TouchEvent) {
    const touch = e.touches[0];

    return {
      x: touch.clientX,
      y: touch.clientY,
    };
  }

  // @ts-ignore
  return {
    x: e.clientX,
    y: e.clientY,
  };
}

export function getValues(
  position: RangeSliderPosition,
  props: RangeSliderProps,
  rect: ClientRect,
) {
  const { axis, xMax, xMin, xStep, yMax, yMin, yStep } = props;
  const { height, width }: ClientRect = rect;
  let { x, y } = position;
  let dx = 0;
  let dy = 0;

  if (x < 0) {
    x = 0;
  }
  if (x > width) {
    x = width;
  }
  if (y < 0) {
    y = 0;
  }
  if (y > height) {
    y = height;
  }

  if (axis === 'x' || axis === 'xy') {
    dx = Math.round((x / width) * (xMax! - xMin!));
  }

  if (axis === 'y' || axis === 'xy') {
    dy = Math.round((y / height) * (yMax! - yMin!));
  }

  return {
    x: round(dx, xStep!),
    y: round(dy, yStep!),
  };
}

export function num(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }

  return parseInt(value, 10);
}

export function round(value: number, increment: number): number {
  return Math.ceil(value / increment) * increment;
}
