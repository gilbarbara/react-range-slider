import { RangeSliderPosition, RangeSliderProps } from './types';

export function getCoordinates(e: MouseEvent | TouchEvent) {
  if (e instanceof TouchEvent) {
    const [touch] = e.touches;

    return {
      x: touch.clientX,
      y: touch.clientY,
    };
  }

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

export function round(value: number, increment: number): number {
  return Math.ceil(value / increment) * increment;
}
