import { Long } from 'mongodb';

import { to_long } from './to-numeric';

describe('to_numeric', () => {
  it('should return null for null or undefined values', () => {
    expect(to_long(undefined)).toBeNull();
    expect(to_long(null)).toBeNull();
  });

  it('should parse and return an exact numeric value from input string', () => {
    expect(to_long('1')).toEqual(new Long(1));
  });

  it('should parse and return the approximate numeric value from input string', () => {
    expect(to_long('X')).toEqual(new Long(0));
    expect(to_long('*')).toEqual(new Long(0));
    expect(to_long('1+*')).toEqual(new Long(1));
    expect(to_long('X + 2')).toEqual(new Long(2));
  });
});
