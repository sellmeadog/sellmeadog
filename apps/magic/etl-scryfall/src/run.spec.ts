import { makeMockedFunction } from '@sellmeadog/extensions/testing';
import { createReadStream } from 'fs';
import fetch, { Response } from 'node-fetch';
import { resolve } from 'path';
import { run } from './run';

describe('main', () => {
  let fetch_: jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    jest.resetAllMocks();
    fetch_ = makeMockedFunction(fetch);
  });

  it('should run', async () => {
    const rs = createReadStream(resolve(__dirname, '__json__', 'sets.json'));
    fetch_.mockResolvedValue(new Response(rs));

    expect(await run()).toMatchSnapshot();
  });
});
