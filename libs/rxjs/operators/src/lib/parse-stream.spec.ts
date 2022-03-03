import { Response } from 'node-fetch';
import { parse_stream } from './parse-stream';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { of, toArray } from 'rxjs';

import actual = require('./oracle-cards.json');

describe('parse_stream', () => {
  it('should parse file line by line', () => {
    const rs = createReadStream(resolve(__dirname, 'oracle-cards.json'));
    const response = new Response(rs);

    of(response)
      .pipe(parse_stream(/({.+}),?\r?\n/), toArray())
      .subscribe((value) => expect(value).toEqual(actual));
  });
});
