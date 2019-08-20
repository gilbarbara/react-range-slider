import * as React from 'react';

export interface IRangeSliderPosition {
  x: number;
  y: number;
}

export interface IRangeSliderSize {
  height?: string;
  width?: string;
}

export interface IRangeSliderStylesOptions {
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

export interface IRangeSliderStyles {
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

export interface IRangeSliderStylesProp extends Partial<IRangeSliderStyles> {
  options?: Partial<IRangeSliderStylesOptions>;
}

export interface IRangeSliderProps {
  axis?: string;
  classNamePrefix?: string;
  onChange: (position: IRangeSliderPosition, props: object) => void;
  onDragEnd?: (position: IRangeSliderPosition, props: object) => void;
  styles?: IRangeSliderStylesProp;
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
