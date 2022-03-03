import { makeMockedFunction } from '@sellmeadog/extensions/testing';
import fetch, { Response } from 'node-fetch';
import { extract_scryfall_sets } from './extract-scryfall-sets';

describe('extract_scryfall_sets', () => {
  const fetch_ = makeMockedFunction(fetch);

  it('should fetch request', () => {
    fetch_.mockImplementation(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({ object: 'list', has_more: false, data: [] }),
          { status: 200, statusText: 'OK' }
        )
      )
    );

    extract_scryfall_sets().subscribe((data) => {
      expect(data).toEqual([]);
      expect(fetch_).toHaveBeenCalledTimes(1);
    });
  });
});
