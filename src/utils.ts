import { PlainObject, RangeSliderPosition, RangeSliderProps } from './types';

type BaseProps = Required<
  Pick<RangeSliderProps, 'axis' | 'xMax' | 'xMin' | 'xStep' | 'yMax' | 'yMin' | 'yStep'>
>;

export function getBaseProps(props?: RangeSliderProps): BaseProps {
  return {
    axis: props?.axis ?? 'x',
    xMax: props?.xMax ?? 100,
    xMin: props?.xMin ?? 0,
    xStep: props?.xStep ?? 1,
    yMax: props?.yMax ?? 100,
    yMin: props?.yMin ?? 0,
    yStep: props?.yStep ?? 1,
  };
}

export function getCoordinates(
  e: MouseEvent | TouchEvent,
  lastPosition: RangeSliderPosition,
): RangeSliderPosition {
  if ('touches' in e) {
    const [touch] = e.touches;

    return {
      x: touch ? touch.clientX : lastPosition.x,
      y: touch ? touch.clientY : lastPosition.y,
    };
  }

  return {
    x: e.clientX,
    y: e.clientY,
  };
}

export function getPosition(
  position: RangeSliderPosition,
  props: RangeSliderProps,
  el: HTMLDivElement | null,
): RangeSliderPosition {
  const { axis, xMax, xMin, xStep, yMax, yMin, yStep } = getBaseProps(props);
  const { height = xMax, width = yMax } = el?.getBoundingClientRect() || {};
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
    dx = Math.round((x / width) * (xMax - xMin));
  }

  if (axis === 'y' || axis === 'xy') {
    dy = Math.round((y / height) * (yMax - yMin));
  }

  return {
    x: round(dx, xStep),
    y: round(dy, yStep),
  };
}

/**
 * Get a normalized value
 */
export function getNormalizedValue(name: 'x' | 'y', props: RangeSliderProps): number {
  const value = props[name] || 0;
  const min = name === 'x' ? props.xMin : props.yMin;
  const max = name === 'x' ? props.xMax : props.yMax;

  if (isNumber(min) && value < min) {
    return min;
  }

  if (isNumber(max) && value > max) {
    return max;
  }

  return value;
}

/**
 * Check if the value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

/**
 * Check if the value is undefined
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

/**
 * Parse a string into a number or return it if it's already a number
 */
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
