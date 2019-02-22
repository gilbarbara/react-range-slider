import React, { Component } from 'react';
// @ts-ignore
import blacklist from 'blacklist';
import { getCoordinates, getValues } from './utils';

export interface Position {
  x: number;
  y: number;
}

export interface Style {
  height?: string;
  width?: string;
}

export interface Props {
  axis?: string;
  onChange: (position: Position, props: object) => void;
  onDragEnd?: (position: Position, props: object) => void;
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

class InputSlider extends Component<Props> {
  private handle: HTMLElement | null = null;
  private node: HTMLElement | null = null;
  private offset: { x: number; y: number } = { x: 0, y: 0 };
  private start: { x: number; y: number } = { x: 0, y: 0 };
  private track: HTMLElement | null = null;

  public static defaultProps: Partial<Props> = {
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

  private getDragPosition = (e: MouseEvent | TouchEvent) => {
    const { node } = this;
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

  private updatePosition = (position: Position) => {
    const { onChange } = this.props;
    const rect: ClientRect = this.node!.getBoundingClientRect();

    /* istanbul ignore else */
    if (onChange) {
      onChange(getValues(position, this.props, rect), this.props);
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
    const rect: ClientRect = this.node!.getBoundingClientRect();

    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleDragEnd);

    document.removeEventListener('touchmove', this.handleDrag);
    document.removeEventListener('touchend', this.handleDragEnd);
    document.removeEventListener('touchcancel', this.handleDragEnd);

    /* istanbul ignore else */
    if (onDragEnd) {
      onDragEnd(getValues(this.getDragPosition(e), this.props, rect), this.props);
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
    const { axis } = this.props;
    const rest = blacklist(
      this.props,
      'axis',
      'onChange',
      'onDragEnd',
      'className',
      'x',
      'xMin',
      'xMax',
      'xStep',
      'y',
      'yMin',
      'yMax',
      'yStep',
    );
    const { x, y } = this.position;
    const position = { left: `${x}%`, bottom: `${y}%` };
    const style: Style = {};

    /* istanbul ignore else */
    if (axis === 'x') {
      style.width = `${x}%`;
    }

    /* istanbul ignore else */
    if (axis === 'y') {
      style.height = `${y}%`;
    }

    rest.className = ['rrs-slider', `rrs-slider-${axis}`, this.props.className].join(' ');

    return (
      <div ref={c => (this.node = c)} {...rest}>
        <div
          className="rrs-track"
          ref={c => (this.track = c)}
          // @ts-ignore
          onClick={this.handleClickTrack}
        >
          <div className="rrs-range" style={style} />
          <div
            className="rrs-handle"
            ref={c => (this.handle = c)}
            // @ts-ignore
            onTouchStart={this.handleTouchStart}
            // @ts-ignore
            onMouseDown={this.handleMouseDown}
            style={position}
          />
        </div>
      </div>
    );
  }
}

export default InputSlider;
