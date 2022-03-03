import {
  ScryfallBulkData,
  ScryfallCard,
  ScryfallSet,
  ScryfallSetList,
} from '@sellmeadog/etl/scryfall-types';
import { parse_stream } from '@sellmeadog/rxjs/operators';
import fetch from 'node-fetch';
import { join } from 'path';
import { defer, from, mergeMap, Observable, pluck, retry } from 'rxjs';

export function dataSourceScryfall(): string {
  return 'data-source-scryfall';
}

export class HttpDataSource {
  constructor(private baseUrl: string) {}

  get<T>(...path: string[]): Observable<T> {
    return defer(() => fetch(join(this.baseUrl, ...path))).pipe(
      retry(3),
      mergeMap((response) => response.json() as Promise<T>)
    );
  }
}

export class ScryfallDataSource extends HttpDataSource {
  private readonly JSON_LINE = /({.+}),?\r?\n/;

  constructor() {
    super('https://api.scryfall.com');
  }

  default_cards() {
    return this.bulk_data_type('default_cards');
  }

  oracle_cards() {
    return this.bulk_data_type('oracle_cards');
  }

  sets(): Observable<ScryfallSet[]> {
    return this.get<ScryfallSetList>('sets').pipe(pluck('data'));
  }

  private bulk_data_type(type: string) {
    return this.get<ScryfallBulkData>('bulk-data', type).pipe(
      mergeMap(({ download_uri }) =>
        from(fetch(download_uri)).pipe(
          parse_stream<ScryfallCard>(this.JSON_LINE)
        )
      )
    );
  }
}
