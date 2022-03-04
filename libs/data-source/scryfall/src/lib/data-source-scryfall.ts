import { HttpDataSource } from '@sellmeadog/data-source/http';
import {
  ScryfallBulkData,
  ScryfallBulkDataType,
  ScryfallCard,
  ScryfallCatalogType,
  ScryfallSet,
  ScryfallSetList,
} from '@sellmeadog/etl/scryfall-types';
import { parse_stream } from '@sellmeadog/rxjs/operators';
import fetch from 'node-fetch';
import { from, mergeMap, Observable, pluck } from 'rxjs';

export function dataSourceScryfall(): string {
  return 'data-source-scryfall';
}

export class ScryfallDataSource extends HttpDataSource {
  private readonly JSON_LINE = /({.+}),?/;

  constructor() {
    super('https://api.scryfall.com');
  }

  catalog(type: ScryfallCatalogType) {
    return this.get('catalog', type).pipe(pluck('data'));
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

  private bulk_data_type(type: ScryfallBulkDataType) {
    return this.get<ScryfallBulkData>('bulk-data', type).pipe(
      mergeMap(({ download_uri }) =>
        from(fetch(download_uri)).pipe(
          parse_stream<ScryfallCard>(this.JSON_LINE)
        )
      )
    );
  }
}
