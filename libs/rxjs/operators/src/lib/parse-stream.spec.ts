import { Response } from 'node-fetch';
import { parse_stream } from './parse-stream';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { lastValueFrom, of, toArray } from 'rxjs';

describe('parse_stream', () => {
  it('should parse file line by line', async () => {
    const rs = createReadStream(resolve(__dirname, 'oracle-cards.json'));
    const response = new Response(rs);

    const data = await lastValueFrom(
      of(response).pipe(parse_stream(/({.+}),?/), toArray())
    );

    expect(data).toMatchSnapshot();
  });
});
