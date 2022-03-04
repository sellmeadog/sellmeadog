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
  matchExp: RegExp,
  mapFn: (data: string, matchExp: RegExp) => T = parse_stream_map_fn
) {
  return (source$: Observable<Response>) =>
    source$.pipe(
      lines(),
      filter((line) => matchExp.test(line)),
      map((line) => mapFn(line, matchExp))
    );
}

function lines(): OperatorFunction<Response, string> {
  return mergeMap((response) =>
    scheduled(response.body.pipe(split()), asyncScheduler)
  );
}

function parse_stream_map_fn<T = unknown>(data: string, matchExp: RegExp): T {
  return JSON.parse(data.match(matchExp)[1]);
}
