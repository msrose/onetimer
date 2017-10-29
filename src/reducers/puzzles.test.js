import { Puzzles } from './puzzles';
import { uniq } from 'lodash';

describe('Puzzles map', () => {
  it('has all unique values', () => {
    const values = Object.values(Puzzles);
    expect(values).toEqual(uniq(values));
  });
});
