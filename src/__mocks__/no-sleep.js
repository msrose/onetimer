function NoSleep() { }
NoSleep.prototype.enable = jest.fn();
NoSleep.prototype.disable = jest.fn();

export default NoSleep;
