import { Response } from 'node-fetch';
import {
  asyncScheduler,
  filter,
  map,
  mergeMap,
  Observable,
  OperatorFunction,
  scheduled,
} from 'rxjs';
import split = require('split2');

export function parse_stream<T = unknown>(
  matcher: RegExp,
  parser: (data: string) => T = JSON.parse
) {
  return (source$: Observable<Response>) =>
    source$.pipe(
      lines(),
      filter((line) => matcher.test(line)),
      map(parser)
    );
}

function lines(): OperatorFunction<Response, string> {
  return mergeMap((response) =>
    scheduled(response.body.pipe(split()), asyncScheduler)
  );
}
