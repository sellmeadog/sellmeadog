import {
  ScryfallBulkData,
  ScryfallBulkDataList,
} from '@sellmeadog/etl/scryfall-types';
import { defer, from, map, mergeMap, Observable, pluck, retry } from 'rxjs';

export const extract_scryfall_bulk_data = (
  bulk_data_type: 'default_cards' | 'oracle_cards'
): Observable<ScryfallBulkData> => {
  return defer(() => fetch('https://api.scryfall.com/bulk-data')).pipe(
    retry(3),
    mergeMap((response) =>
      from(response.json() as Promise<ScryfallBulkDataList>).pipe(
        pluck('data'),
        map((data) => data.find(({ type }) => type === bulk_data_type))
      )
    )
  );
};
