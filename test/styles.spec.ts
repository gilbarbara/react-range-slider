import getStyles from '../src/styles';

describe('styles', () => {
  describe('without custom styles', () => {
    it('should return a RangeSliderStyles', () => {
      expect(getStyles()).toMatchSnapshot();
    });
  });

  describe('with custom styles', () => {
    it('should return a modified RangeSliderStyles', () => {
      expect(
        getStyles({
          options: {
            thumbBorderRadius: 0,
            trackBorderRadius: 0,
          },
        }),
      ).toMatchSnapshot();
    });
  });
});
