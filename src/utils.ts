/* eslint-disable @typescript-eslint/no-use-before-define */
import { PlainObject, RangeSliderPosition, RangeSliderProps } from './types';

export function getCoordinates(e: MouseEvent | TouchEvent) {
  if (window.TouchEvent && e instanceof TouchEvent) {
    const touch = e.touches[0];

    return {
      x: touch.clientX,
      y: touch.clientY,
    };
  }

  return {
    // @ts-ignore clientX only exists on MouseEvent
    x: e.clientX,
    // @ts-ignore clientY only exists on MouseEvent
    y: e.clientY,
  };
}

export function getPosition(
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

export function getNormalizedValue(name: 'x' | 'y', props: RangeSliderProps) {
  const value = props[name] || 0;

  if (value < props[`${name}Min`]) {
    return props[`${name}Min`];
  }

  if (value > props[`${name}Max`]) {
    return props[`${name}Max`];
  }

  return value;
}

export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

export function num(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }

  return parseInt(value, 10);
}

/**
 *  Remove properties from an object
 */
export function removeProperties<T extends PlainObject, K extends keyof T>(
  input: T,
  ...filter: K[]
): Omit<T, K> {
  const output: any = {};

  for (const key in input) {
    /* istanbul ignore else */
    if ({}.hasOwnProperty.call(input, key)) {
      if (!filter.includes((key as unknown) as K)) {
        output[key] = input[key];
      }
    }
  }

  return output;
}

export function round(value: number, increment: number): number {
  return Math.ceil(value / increment) * increment;
}
