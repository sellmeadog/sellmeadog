import { makeMockedFunction } from '@sellmeadog/extensions/testing';
import fetch, { Response } from 'node-fetch';
import { lastValueFrom } from 'rxjs';
import { HttpDataSource } from './http-data-source';

describe('dataSourceHttp', () => {
  let http: HttpDataSource;
  let fetch_: jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    jest.resetAllMocks();

    fetch_ = makeMockedFunction(fetch);
    fetch_.mockResolvedValue(new Response(JSON.stringify({ hello: 'world' })));

    http = new HttpDataSource('localhost');
  });

  it('should GET at baseUrl', async () => {
    const actual = await lastValueFrom(http.get());

    expect(actual).toEqual({ hello: 'world' });
    expect(fetch_).toHaveBeenCalledTimes(1);
    expect(fetch_).toHaveBeenCalledWith('localhost');
  });

  it('should GET at baseUrl with route', async () => {
    const actual = await lastValueFrom(http.get('contacts', 1));

    expect(actual).toEqual({ hello: 'world' });
    expect(fetch_).toHaveBeenCalledTimes(1);
    expect(fetch_).toHaveBeenCalledWith('localhost/contacts/1');
  });
});
