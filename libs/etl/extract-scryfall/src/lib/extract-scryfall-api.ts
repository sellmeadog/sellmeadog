import {
  ScryfallObject,
  ScryfallObjectList,
} from '@sellmeadog/etl/scryfall-types';
import fetch from 'node-fetch';
import { defer, mergeMap, Observable, retry } from 'rxjs';

export type ScryfallRoute = 'bulk-data' | 'cards' | 'sets';

export const extract_scryfall_api = <
  T extends ScryfallObject | ScryfallObjectList
>(
  route: ScryfallRoute
): Observable<T> => {
  return defer(() => fetch(`https://api.scryfall.com/${route}`)).pipe(
    retry(3),
    mergeMap((response) => response.json() as Promise<T>)
  );
};
