import { formatTime } from './helpers';

describe('formatTime helper', () => {
  describe('showing sub-second precision', () => {
    it('formats a time of 0', () => {
      expect(formatTime(0)).toBe('0.000');
    });
  });

  describe('not showing sub-second precision', () => {
    let formatTimeNoSubSecond;

    beforeEach(() => {
      formatTimeNoSubSecond = value => formatTime(value, { showSubSecond: false });
    });

    it('formats a time of 0', () => {
      expect(formatTimeNoSubSecond(0)).toBe('0');
    });
  });
});
