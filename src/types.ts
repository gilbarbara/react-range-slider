import * as React from 'react';

export interface PlainObject {
  [key: string]: any;
}

export interface RangeSliderPosition {
  x: number;
  y: number;
}

export interface RangeSliderSize {
  height?: string;
  width?: string;
}

export interface RangeSliderStylesOptions {
  handleBorder: string | number;
  handleBorderRadius: string | number;
  handleBorderRadiusXY: string | number;
  handleColor: string;
  handleSize: string | number;
  handleSizeXY: string | number;
  handleSpace: string | number;
  height: string | number;
  padding: string | number;
  rangeColor: string;
  trackBorderRadius: string | number;
  trackColor: string;
  width: string | number;
}

export interface RangeSliderStyles {
  handleWrapper: React.CSSProperties;
  handleX: React.CSSProperties;
  handleXY: React.CSSProperties;
  handleY: React.CSSProperties;
  rangeX: React.CSSProperties;
  rangeXY: React.CSSProperties;
  rangeY: React.CSSProperties;
  sliderX: React.CSSProperties;
  sliderXY: React.CSSProperties;
  sliderY: React.CSSProperties;
  trackX: React.CSSProperties;
  trackXY: React.CSSProperties;
  trackY: React.CSSProperties;
}

export interface RangeSliderStylesProp extends Partial<RangeSliderStyles> {
  options?: Partial<RangeSliderStylesOptions>;
}

export type RangeSliderState = RangeSliderPosition;

export interface RangeSliderProps {
  axis?: 'x' | 'y' | 'xy';
  classNamePrefix?: string;
  onChange?: (position: RangeSliderPosition, props: object) => void;
  onDragEnd?: (position: RangeSliderPosition, props: object) => void;
  styles?: RangeSliderStylesProp;
  x?: number;
  xMax?: number;
  xMin?: number;
  xStep?: number;
  y?: number;
  yMax?: number;
  yMin?: number;
  yStep?: number;

  [key: string]: any;
}
