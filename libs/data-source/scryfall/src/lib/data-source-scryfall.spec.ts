import { dataSourceScryfall } from './data-source-scryfall';

describe('dataSourceScryfall', () => {
  it('should work', () => {
    expect(dataSourceScryfall()).toEqual('data-source-scryfall');
  });
});
