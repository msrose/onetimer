const lodash = jest.genMockFromModule('lodash');

export const debounce = x => x;

lodash.debounce = debounce;

export default lodash;
