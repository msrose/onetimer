import { formatTime } from './helpers';

describe('formatTime helper', () => {
  describe('showing sub-second precision', () => {
    it('formats a time of 0', () => {
      expect(formatTime(0)).toBe('0.000');
    });

    it('formats a time less than one second', () => {
      expect(formatTime(589)).toBe('0.589');
    });

    it('formats a time greater than one second', () => {
      expect(formatTime(1589)).toBe('1.589');
    });

    it('formats a time of one minute', () => {
      expect(formatTime(60000)).toBe('1:00.000');
    });

    it('formats a time greater than one minute', () => {
      expect(formatTime(61589)).toBe('1:01.589');
    });

    it('formats a time of one hour', () => {
      expect(formatTime(3600000)).toBe('1:00:00.000');
    });

    it('formats a time greater than one hour', () => {
      expect(formatTime(3661589)).toBe('1:01:01.589');
    });

    it('formats a time greater than ten hours', () => {
      expect(formatTime(36061589)).toBe('10:01:01.589');
    });

    it('formats a time greater than 100 hours', () => {
      expect(formatTime(360061589)).toBe('100:01:01.589');
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

    it('formats a time less than one second', () => {
      expect(formatTimeNoSubSecond(589)).toBe('0');
    });

    it('formats a time greater than one second', () => {
      expect(formatTimeNoSubSecond(1589)).toBe('1');
    });

    it('formats a time of one minute', () => {
      expect(formatTimeNoSubSecond(60000)).toBe('1:00');
    });

    it('formats a time greater than one minute', () => {
      expect(formatTimeNoSubSecond(61589)).toBe('1:01');
    });

    it('formats a time of one hour', () => {
      expect(formatTimeNoSubSecond(3600000)).toBe('1:00:00');
    });

    it('formats a time greater than one hour', () => {
      expect(formatTimeNoSubSecond(3661589)).toBe('1:01:01');
    });

    it('formats a time greater than ten hours', () => {
      expect(formatTimeNoSubSecond(36061589)).toBe('10:01:01');
    });

    it('formats a time greater than 100 hours', () => {
      expect(formatTimeNoSubSecond(360061589)).toBe('100:01:01');
    });
  });
});
