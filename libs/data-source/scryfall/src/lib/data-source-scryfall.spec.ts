import { makeMockedFunction } from '@sellmeadog/extensions/testing';
import { createReadStream } from 'fs';
import fetch, { Response } from 'node-fetch';
import { resolve } from 'path';
import { lastValueFrom } from 'rxjs';
import {
  make_scryfall_data_source,
  ScryfallDataSource,
} from './data-source-scryfall';

describe('ScryfallDataSource', () => {
  let fetch_: jest.MockedFunction<typeof fetch>;
  let scryfall: ScryfallDataSource;

  beforeEach(() => {
    jest.resetAllMocks();

    fetch_ = makeMockedFunction(fetch);
    scryfall = new ScryfallDataSource();
  });

  it('factory works', () => {
    expect(make_scryfall_data_source()).toBeInstanceOf(ScryfallDataSource);
  });

  it('should GET /catalog endpoints', async () => {
    fetch_.mockResolvedValue(
      new Response(
        createReadStream(
          resolve(__dirname, '__json__', 'catalog-keyword-actions.json')
        )
      )
    );

    const data = await lastValueFrom(scryfall.catalog('keyword-actions'));

    expect(data).toMatchSnapshot();
    expect(fetch_).toHaveBeenCalledTimes(1);
    expect(fetch_).toHaveBeenCalledWith(
      'https://api.scryfall.com/catalog/keyword-actions'
    );
  });

  it('should GET /bulk-data/default_cards endpoint', async () => {
    const download_uri = resolve(
      __dirname,
      '__json__',
      'bulk-data-oracle-cards.json'
    );

    fetch_
      .mockImplementationOnce(() =>
        Promise.resolve(new Response(JSON.stringify({ download_uri })))
      )
      .mockImplementationOnce((url) =>
        Promise.resolve(new Response(createReadStream(url.toString())))
      );

    const data = await lastValueFrom(scryfall.default_cards());

    expect(data).toMatchSnapshot();
    expect(fetch_).toHaveBeenCalledTimes(2);
    expect(fetch_).toHaveBeenCalledWith(
      'https://api.scryfall.com/bulk-data/default_cards'
    );
    expect(fetch_).toHaveBeenCalledWith(download_uri);
  });

  it('should GET /bulk-data/oracle_cards endpoint', async () => {
    const download_uri = resolve(
      __dirname,
      '__json__',
      'bulk-data-oracle-cards.json'
    );

    fetch_
      .mockImplementationOnce(() =>
        Promise.resolve(new Response(JSON.stringify({ download_uri })))
      )
      .mockImplementationOnce((url) =>
        Promise.resolve(new Response(createReadStream(url.toString())))
      );

    const data = await lastValueFrom(scryfall.oracle_cards());

    expect(data).toMatchSnapshot();
    expect(fetch_).toHaveBeenCalledTimes(2);
    expect(fetch_).toHaveBeenCalledWith(
      'https://api.scryfall.com/bulk-data/oracle_cards'
    );
    expect(fetch_).toHaveBeenCalledWith(download_uri);
  });
});
