import { ScryfallSet, ScryfallSetList } from '@sellmeadog/etl/scryfall-types';
import fetch from 'node-fetch';
import { defer, from, mergeMap, Observable, pluck, retry } from 'rxjs';

export const extract_scryfall_sets = (): Observable<ScryfallSet[]> => {
  return defer(() => fetch('https://api.scryfall.com/sets')).pipe(
    retry(3),
    mergeMap((response) =>
      from(response.json() as Promise<ScryfallSetList>).pipe(pluck('data'))
    )
  );
};
