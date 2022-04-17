import * as React from 'react';

import getStyles from './styles';
import { RangeSliderPosition, RangeSliderProps, RangeSliderSize, RangeSliderState } from './types';
import {
  getBaseProps,
  getCoordinates,
  getNormalizedValue,
  getPosition,
  isUndefined,
  removeProperties,
} from './utils';

class RangeSlider extends React.Component<RangeSliderProps, RangeSliderState> {
  private lastCoordinates = { x: 0, y: 0 };
  private mounted = false;
  private offset = { x: 0, y: 0 };
  private readonly rail: React.RefObject<HTMLDivElement>;
  private readonly slider: React.RefObject<HTMLDivElement>;
  private readonly track: React.RefObject<HTMLDivElement>;
  private start = { x: 0, y: 0 };

  public static defaultProps = getBaseProps();

  constructor(props: RangeSliderProps) {
    super(props);

    this.slider = React.createRef();
    this.rail = React.createRef();
    this.track = React.createRef();

    this.state = {
      isDragging: false,
      x: getNormalizedValue('x', props),
      y: getNormalizedValue('y', props),
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentDidUpdate(_: RangeSliderProps, previousState: RangeSliderState) {
    const { x, y } = this.state;
    const { onChange } = this.props;
    const { x: previousX, y: previousY } = previousState;

    /* istanbul ignore else */
    if (onChange && (x !== previousX || y !== previousY)) {
      onChange({ x, y }, this.props);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  private get position() {
    const { axis, xMax, xMin, yMax, yMin } = getBaseProps(this.props);
    let bottom: number = ((this.y - yMin) / (yMax - yMin)) * 100;
    let left: number = ((this.x - xMin) / (xMax - xMin)) * 100;

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

  private get x() {
    const { x: innerX } = this.state;
    const { x } = this.props;

    return isUndefined(x) ? innerX : x;
  }

  private get y() {
    const { y: innerY } = this.state;
    const { y } = this.props;

    return isUndefined(y) ? innerY : y;
  }

  private getDragPosition = ({ x, y }: RangeSliderPosition) => {
    return {
      x: x + this.start.x - this.offset.x,
      y: this.offset.y + this.start.y - y,
    };
  };

  private updateOptions = ({ x, y }: RangeSliderPosition) => {
    const { rail, track } = this;

    this.start = {
      x: rail.current?.offsetLeft ?? 0,
      y:
        (track.current?.offsetHeight ?? 0) -
        (rail.current?.offsetTop ?? 0) -
        (rail.current?.offsetHeight ?? 0),
    };
    this.lastCoordinates = { x, y };
    this.offset = { x, y };
  };

  private updatePosition = (position: RangeSliderPosition) => {
    this.setState(getPosition(position, this.props, this.slider.current));
  };

  private handleBlur = () => {
    document.removeEventListener('keydown', this.handleKeydown);
  };

  private handleClickTrack = (event: React.MouseEvent | React.TouchEvent) => {
    const { onAfterEnd } = this.props;
    const { isDragging } = this.state;

    if (!isDragging) {
      const element = event.currentTarget as Element;
      const { x, y } = getCoordinates(event, this.lastCoordinates);
      const { bottom, left } = element.getBoundingClientRect();
      const nextPosition = {
        x: x - left,
        y: bottom - y,
      };

      this.lastCoordinates = { x, y };
      this.updatePosition(nextPosition);

      if (onAfterEnd) {
        onAfterEnd(getPosition(nextPosition, this.props, this.slider.current), this.props);
      }
    } else if (this.mounted) {
      this.setState({ isDragging: false });
    }
  };

  private handleDrag = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    const coordinates = getCoordinates(event, this.lastCoordinates);

    this.updatePosition(this.getDragPosition(coordinates));
    this.lastCoordinates = coordinates;
  };

  private handleDragEnd = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();

    const { onAfterEnd, onDragEnd } = this.props;
    const position = getPosition(
      this.getDragPosition(getCoordinates(event, this.lastCoordinates)),
      this.props,
      this.slider.current,
    );

    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleDragEnd);

    document.removeEventListener('touchmove', this.handleDrag);
    document.removeEventListener('touchend', this.handleDragEnd);
    document.removeEventListener('touchcancel', this.handleDragEnd);

    /* istanbul ignore else */
    if (onDragEnd) {
      onDragEnd(position, this.props);
    }

    /* istanbul ignore else */
    if (onAfterEnd) {
      onAfterEnd(position, this.props);
    }
  };

  private handleFocus = () => {
    document.addEventListener('keydown', this.handleKeydown, { passive: false });
  };

  private handleKeydown = (event: KeyboardEvent) => {
    const { x: innerX, y: innerY } = this.state;
    const { x, y } = this.props;
    const { axis, xMax, xMin, xStep, yMax, yMin, yStep } = getBaseProps(this.props);

    const codes = { down: 'ArrowDown', left: 'ArrowLeft', up: 'ArrowUp', right: 'ArrowRight' };

    /* istanbul ignore else */
    if (Object.values(codes).includes(event.code)) {
      event.preventDefault();

      const position = {
        x: isUndefined(x) ? innerX : getNormalizedValue('x', this.props),
        y: isUndefined(y) ? innerY : getNormalizedValue('y', this.props),
      };
      const xMinus = position.x - xStep <= xMin ? xMin : position.x - xStep;
      const xPlus = position.x + xStep >= xMax ? xMax : position.x + xStep;
      const yMinus = position.y - yStep <= yMin ? yMin : position.y - yStep;
      const yPlus = position.y + yStep >= yMax ? yMax : position.y + yStep;

      switch (event.code) {
        case codes.up: {
          if (axis === 'x') {
            position.x = xPlus;
          } else {
            position.y = yPlus;
          }

          break;
        }
        case codes.down: {
          if (axis === 'x') {
            position.x = xMinus;
          } else {
            position.y = yMinus;
          }

          break;
        }
        case codes.left: {
          if (axis === 'y') {
            position.y = yMinus;
          } else {
            position.x = xMinus;
          }

          break;
        }

        case codes.right:
        default: {
          if (axis === 'y') {
            position.y = yPlus;
          } else {
            position.x = xPlus;
          }

          break;
        }
      }

      this.setState(position);
    }
  };

  private handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();

    this.updateOptions(getCoordinates(event, this.lastCoordinates));

    this.setState({ isDragging: true });

    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('mouseup', this.handleDragEnd);
  };

  private handleTouchStart = (event: React.TouchEvent) => {
    event.preventDefault();

    this.updateOptions(getCoordinates(event, this.lastCoordinates));

    document.addEventListener('touchmove', this.handleDrag, { passive: false });
    document.addEventListener('touchend', this.handleDragEnd, { passive: false });
    document.addEventListener('touchcancel', this.handleDragEnd, { passive: false });
  };

  public render() {
    const { axis, className, xMax, xMin, yMax, yMin } = this.props;
    const rest = removeProperties(
      this.props,
      'axis',
      'className',
      'onAfterEnd',
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
    );

    const { x: xPos, y: yPos } = this.position;
    const position = { left: `${xPos}%`, bottom: `${yPos}%` };
    const size: RangeSliderSize = {};

    let orientation: 'horizontal' | 'vertical' | undefined;
    let range;
    let slider;
    let thumb;
    let track;
    let valuemax = xMax;
    let valuemin = xMin;
    let valuenow = this.x;

    /* istanbul ignore else */
    if (axis === 'x') {
      size.width = `${xPos}%`;
      slider = this.styles.sliderX;
      orientation = 'horizontal';
      range = this.styles.rangeX;
      track = this.styles.trackX;
      thumb = this.styles.thumbX;
    }

    /* istanbul ignore else */
    if (axis === 'y') {
      size.height = `${yPos}%`;
      slider = this.styles.sliderY;
      range = this.styles.rangeY;
      track = this.styles.trackY;
      thumb = this.styles.thumbY;
      orientation = 'vertical';
      valuemax = yMax;
      valuemin = yMin;
      valuenow = this.y;
    }

    /* istanbul ignore else */
    if (axis === 'xy') {
      size.height = `${yPos}%`;
      size.width = `${xPos}%`;
      slider = this.styles.sliderXY;
      range = this.styles.rangeXY;
      track = this.styles.trackXY;
      thumb = this.styles.thumbXY;
    }

    return (
      <div ref={this.slider} className={className} style={slider} {...rest}>
        <div
          ref={this.track}
          className={className && `${className}__track`}
          onClick={this.handleClickTrack}
          role="presentation"
          // @ts-ignore We can't use React's events because the listeners
          style={track}
        >
          <div className={className && `${className}__range`} style={{ ...size, ...range }} />
          <div
            ref={this.rail}
            onMouseDown={this.handleMouseDown}
            onTouchStart={this.handleTouchStart}
            // @ts-ignore We can't use React's events because the listeners
            role="presentation"
            // @ts-ignore We can't use React's events because the listeners
            style={{ ...this.styles.rail, ...position }}
          >
            <span
              aria-label="slider handle"
              aria-orientation={orientation}
              aria-valuemax={valuemax}
              aria-valuemin={valuemin}
              aria-valuenow={valuenow}
              className={className && `${className}__thumb`}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              role="slider"
              style={thumb}
              tabIndex={0}
            />
          </div>
        </div>
      </div>
    );
  }
}

export * from './types';

export default RangeSlider;
