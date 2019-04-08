import deepmerge from 'deepmerge';

import { RangeSliderStyles, RangeSliderStylesProps, RangeSliderStylesOptions } from './types';

const defaultOptions = {
  handleBorder: '2px solid #000',
  handleBorderRadius: '4px',
  handleColor: '#fff',
  handleSize: '10px',
  handleSizeXY: '20px',
  handleSpace: '6px',
  height: '20px',
  padding: '6px',
  rangeColor: '#007bff',
  trackBorderRadius: '3px',
  trackColor: '#ccc',
  width: '20px',
};

function num(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }

  return parseInt(value, 10);
}

export default function getStyles(styles?: RangeSliderStylesProps): RangeSliderStyles {
  const mergedOptions: RangeSliderStylesOptions = deepmerge(
    defaultOptions,
    styles ? (styles.options as RangeSliderStylesOptions) : {},
  );

  const slider = {
    boxSizing: 'border-box',
    display: 'inline-block',
    padding: mergedOptions.padding,
  };

  const track = {
    backgroundColor: mergedOptions.trackColor,
    borderRadius: mergedOptions.trackBorderRadius,
    boxSizing: 'border-box',
    height: '100%',
    position: 'relative',
    width: '100%',
  };

  const range = {
    backgroundColor: mergedOptions.rangeColor,
    borderRadius: mergedOptions.trackBorderRadius,
    position: 'absolute',
  };

  const handleWrapper = {
    boxSizing: 'border-box',
    height: mergedOptions.height,
    position: 'absolute',
    width: mergedOptions.width,
  };

  const handle = {
    backgroundColor: mergedOptions.handleColor,
    border: mergedOptions.handleBorder,
    borderRadius: mergedOptions.handleBorderRadius,
    boxSizing: 'border-box',
    display: 'block',
    position: 'absolute',
  };

  const defaultStyles = {
    handleWrapper,
    handleX: {
      ...handle,
      height: num(mergedOptions.height) + num(mergedOptions.handleSpace),
      left: -(num(mergedOptions.handleSize) / 2),
      top: -(num(mergedOptions.handleSpace) / 2),
      width: mergedOptions.handleSize,
    },
    handleXY: {
      ...handle,
      backgroundColor: 'transparent',
      border: mergedOptions.handleBorder,
      borderRadius: '50%',
      bottom: -(num(mergedOptions.handleSizeXY) / 2),
      height: mergedOptions.handleSizeXY,
      left: -(num(mergedOptions.handleSizeXY) / 2),
      position: 'absolute',
      width: mergedOptions.handleSizeXY,
    },
    handleY: {
      ...handle,
      bottom: -(num(mergedOptions.handleSize) / 2),
      height: mergedOptions.handleSize,
      left: -(num(mergedOptions.handleSpace) / 2),
      width: num(mergedOptions.width) + num(mergedOptions.handleSpace),
    },
    rangeX: {
      ...range,
      height: '100%',
      top: 0,
    },
    rangeXY: {
      ...range,
      bottom: 0,
    },
    rangeY: {
      ...range,
      bottom: 0,
      left: 0,
      width: '100%',
    },
    sliderX: {
      ...slider,
      height: num(mergedOptions.height) + num(mergedOptions.padding) * 2,
      width: '100%',
    },
    sliderXY: {
      ...slider,
      height: '100%',
      width: '100%',
    },
    sliderY: {
      ...slider,
      height: '100%',
      width: num(mergedOptions.width) + num(mergedOptions.padding) * 2,
    },
    trackX: {
      ...track,
      height: mergedOptions.height,
    },
    trackXY: {
      ...track,
      height: '100%',
      minHeight: '50px',
      width: '100%',
    },
    trackY: {
      ...track,
      height: '100%',
      minHeight: '50px',
      width: mergedOptions.width,
    },
  };

  return deepmerge(defaultStyles, styles || {}) as RangeSliderStyles;
}
