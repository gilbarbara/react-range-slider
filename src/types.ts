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
  height: string | number;
  padding: string | number;
  rangeColor: string;
  thumbBorder: string | number;
  thumbBorderRadius: string | number;
  thumbBorderRadiusXY: string | number;
  thumbColor: string;
  thumbSize: string | number;
  thumbSizeXY: string | number;
  thumbSpace: string | number;
  trackBorderRadius: string | number;
  trackColor: string;
  width: string | number;
}

export interface RangeSliderStyles {
  rail: React.CSSProperties;
  rangeX: React.CSSProperties;
  rangeXY: React.CSSProperties;
  rangeY: React.CSSProperties;
  sliderX: React.CSSProperties;
  sliderXY: React.CSSProperties;
  sliderY: React.CSSProperties;
  thumbX: React.CSSProperties;
  thumbXY: React.CSSProperties;
  thumbY: React.CSSProperties;
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
