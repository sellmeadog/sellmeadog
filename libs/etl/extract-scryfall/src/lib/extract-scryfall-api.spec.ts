import { makeMockedFunction } from '@sellmeadog/extensions/testing';
import fetch, { Response } from 'node-fetch';
import { extract_scryfall_api } from './extract-scryfall-api';

describe('extract-scryfall-api', () => {
  const fetch_ = makeMockedFunction(fetch);

  it('should make request against base url', () => {
    fetch_.mockResolvedValue(new Response());

    extract_scryfall_api('sets').subscribe();

    expect(fetch_).toHaveBeenCalledTimes(1);
    expect(fetch_).toHaveBeenCalledWith('https://api.scryfall.com/sets');
  });
});
