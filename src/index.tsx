import * as React from 'react';

import { RangeSliderPosition, RangeSliderProps, RangeSliderSize } from './types';
import getStyles from './styles';
import { blacklist, getCoordinates, getValues } from './utils';

class RangeSlider extends React.Component<RangeSliderProps> {
  private handle: HTMLElement | null = null;
  private node: HTMLElement | null = null;
  private offset: { x: number; y: number } = { x: 0, y: 0 };
  private start: { x: number; y: number } = { x: 0, y: 0 };
  private track: HTMLElement | null = null;

  public static defaultProps: Partial<RangeSliderProps> = {
    axis: 'x',
    x: 0,
    xMax: 100,
    xMin: 0,
    xStep: 1,
    y: 0,
    yMax: 100,
    yMin: 0,
    yStep: 1,
  };

  private get position() {
    const { axis, x, xMax, xMin, y, yMax, yMin } = this.props;
    let bottom: number = ((y! - yMin!) / (yMax! - yMin!)) * 100;
    let left: number = ((x! - xMin!) / (xMax! - xMin!)) * 100;

    if (bottom > 100) {
      bottom = 100;
    }
    if (bottom < 0) {
      bottom = 0;
    }
    // bottom shouldn't be set with X axis
    /* istanbul ignore else */
    if (axis === 'x') {
      bottom = 0;
    }

    if (left > 100) {
      left = 100;
    }
    if (left < 0) {
      left = 0;
    }
    // left shouldn't be set with Y axis
    /* istanbul ignore else */
    if (axis === 'y') {
      left = 0;
    }

    return { x: left, y: bottom };
  }

  private get styles() {
    const { styles } = this.props;

    return getStyles(styles);
  }

  private getDragPosition = (e: MouseEvent | TouchEvent) => {
    const { x, y } = getCoordinates(e);

    return {
      x: x + this.start.x - this.offset.x,
      y: this.offset.y + this.start.y - y,
    };
  };

  private updateOptions = (e: MouseEvent | TouchEvent) => {
    const { handle, track } = this;
    const { x, y } = getCoordinates(e);

    this.start = {
      x: handle!.offsetLeft,
      y: track!.offsetHeight - handle!.offsetTop - handle!.offsetHeight,
    };

    this.offset = { x, y };
  };

  private updatePosition = (position: RangeSliderPosition) => {
    const { onChange } = this.props;
    let rect: ClientRect;

    /* istanbul ignore else */
    if (this.node) {
      rect = this.node.getBoundingClientRect();
    }

    /* istanbul ignore else */
    if (onChange) {
      onChange(getValues(position, this.props, rect! || {}), this.props);
    }
  };

  private handleClickTrack = (e: MouseEvent | TouchEvent) => {
    const element = e.currentTarget as Element;
    const { x, y } = getCoordinates(e);
    const { left, bottom } = element.getBoundingClientRect();

    this.updatePosition({
      x: x - left,
      y: bottom - y,
    });
  };

  private handleDrag = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();

    this.updatePosition(this.getDragPosition(e));
  };

  private handleDragEnd = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    const { onDragEnd } = this.props;
    let rect: ClientRect;

    /* istanbul ignore else */
    if (this.node) {
      rect = this.node.getBoundingClientRect();
    }

    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleDragEnd);

    document.removeEventListener('touchmove', this.handleDrag);
    document.removeEventListener('touchend', this.handleDragEnd);
    document.removeEventListener('touchcancel', this.handleDragEnd);

    /* istanbul ignore else */
    if (onDragEnd) {
      onDragEnd(getValues(this.getDragPosition(e), this.props, rect! || {}), this.props);
    }
  };

  private handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    this.updateOptions(e);

    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('mouseup', this.handleDragEnd);
  };

  private handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    this.updateOptions(e);

    document.addEventListener('touchmove', this.handleDrag, { passive: false });
    document.addEventListener('touchend', this.handleDragEnd);
    document.addEventListener('touchcancel', this.handleDragEnd);
  };

  public render() {
    const { axis = 'x', classNamePrefix, x, xMin, xMax, y, yMin, yMax } = this.props;
    const rest = blacklist(this.props, [
      'axis',
      'classNamePrefix',
      'onChange',
      'onDragEnd',
      'styles',
      'x',
      'xMin',
      'xMax',
      'xStep',
      'y',
      'yMin',
      'yMax',
      'yStep',
    ]);
    const { x: xPos, y: yPos } = this.position;
    const position = { left: `${xPos}%`, bottom: `${yPos}%` };
    const size: RangeSliderSize = {};
    let slider;
    let range;
    let track;
    let handle;
    let orientation: 'horizontal' | 'vertical' | undefined;
    let valuemax = xMax;
    let valuemin = xMin;
    let valuenow = x;

    /* istanbul ignore else */
    if (axis! === 'x') {
      size.width = `${xPos}%`;
      slider = this.styles.sliderX;
      orientation = 'horizontal';
      range = this.styles.rangeX;
      track = this.styles.trackX;
      handle = this.styles.handleX;
    }

    /* istanbul ignore else */
    if (axis! === 'y') {
      size.height = `${yPos}%`;
      slider = this.styles.sliderY;
      range = this.styles.rangeY;
      track = this.styles.trackY;
      handle = this.styles.handleY;
      orientation = 'vertical';
      valuemax = yMax;
      valuemin = yMin;
      valuenow = y;
    }

    /* istanbul ignore else */
    if (axis! === 'xy') {
      size.height = `${yPos}%`;
      size.width = `${xPos}%`;
      slider = this.styles.sliderXY;
      range = this.styles.rangeXY;
      track = this.styles.trackXY;
      handle = this.styles.handleXY;
    }

    return (
      <div ref={c => (this.node = c)} style={slider} {...rest} className={classNamePrefix}>
        <div
          className={classNamePrefix && `${classNamePrefix}__track`}
          ref={c => (this.track = c)}
          style={track}
          role="presentation"
          // @ts-ignore
          onClick={this.handleClickTrack}
        >
          <div
            className={classNamePrefix && `${classNamePrefix}__range`}
            style={{ ...size, ...range }}
          />
          <div
            ref={c => (this.handle = c)}
            style={{ ...this.styles.handleWrapper, ...position }}
            role="presentation"
            // @ts-ignore
            onTouchStart={this.handleTouchStart}
            // @ts-ignore
            onMouseDown={this.handleMouseDown}
          >
            <span
              className={classNamePrefix && `${classNamePrefix}__handle`}
              style={handle}
              tabIndex={0}
              role="slider"
              aria-label="slider handle"
              aria-orientation={orientation}
              aria-valuemin={valuemin}
              aria-valuenow={valuenow}
              aria-valuemax={valuemax}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RangeSlider;
