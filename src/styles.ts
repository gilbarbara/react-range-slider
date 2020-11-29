import * as deepmerge from 'deepmerge';
import { num } from './utils';

import { RangeSliderStyles, RangeSliderStylesProp, RangeSliderStylesOptions } from './types';

const defaultOptions = {
  height: '20px',
  padding: '6px',
  rangeColor: '#007bff',
  thumbBorder: '2px solid #000',
  thumbBorderRadius: '4px',
  thumbBorderRadiusXY: '50%',
  thumbColor: '#fff',
  thumbSize: '10px',
  thumbSizeXY: '20px',
  thumbSpace: '6px',
  trackBorderRadius: '3px',
  trackColor: '#ccc',
  width: '20px',
};

export default function getStyles(styles?: RangeSliderStylesProp): RangeSliderStyles {
  const options: RangeSliderStylesOptions = deepmerge(
    defaultOptions,
    styles ? (styles.options as RangeSliderStylesOptions) : {},
  );

  const slider = {
    boxSizing: 'border-box',
    display: 'inline-block',
    padding: options.padding,
    transition: 'height 0.4s, width 0.4s',
  };

  const track = {
    backgroundColor: options.trackColor,
    borderRadius: options.trackBorderRadius,
    boxSizing: 'border-box',
    height: '100%',
    position: 'relative',
    width: '100%',
  };

  const range = {
    backgroundColor: options.rangeColor,
    borderRadius: options.trackBorderRadius,
    position: 'absolute',
  };

  const rail = {
    boxSizing: 'border-box',
    height: options.height,
    position: 'absolute',
    transition: 'height 0.4s, width 0.4s',
    width: options.width,
  };

  const thumb = {
    backgroundColor: options.thumbColor,
    border: options.thumbBorder,
    borderRadius: options.thumbBorderRadius,
    boxSizing: 'border-box',
    display: 'block',
    position: 'absolute',
    transition: 'height 0.4s, width 0.4s',
  };

  const defaultStyles = {
    rail,
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
      height: num(options.height) + num(options.padding) * 2,
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
      width: num(options.width) + num(options.padding) * 2,
    },
    thumbX: {
      ...thumb,
      height: num(options.height) + num(options.thumbSpace),
      left: -(num(options.thumbSize) / 2),
      top: -(num(options.thumbSpace) / 2),
      width: options.thumbSize,
    },
    thumbXY: {
      ...thumb,
      backgroundColor: 'transparent',
      border: options.thumbBorder,
      borderRadius: options.thumbBorderRadiusXY,
      bottom: -(num(options.thumbSizeXY) / 2),
      height: options.thumbSizeXY,
      left: -(num(options.thumbSizeXY) / 2),
      position: 'absolute',
      width: options.thumbSizeXY,
    },
    thumbY: {
      ...thumb,
      bottom: -(num(options.thumbSize) / 2),
      height: options.thumbSize,
      left: -(num(options.thumbSpace) / 2),
      width: num(options.width) + num(options.thumbSpace),
    },
    trackX: {
      ...track,
      height: options.height,
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
      width: options.width,
    },
  };

  return deepmerge(defaultStyles, styles || {}) as RangeSliderStyles;
}
