import { make_scryfall_data_source } from '@sellmeadog/data-source/scryfall';
import { transform_scryfall_set } from '@sellmeadog/magic-transformation';
import { concat, lastValueFrom, map } from 'rxjs';

const scryfall = make_scryfall_data_source();

export async function run() {
  const sets_etl$ = scryfall
    .sets()
    .pipe(map((sets) => sets.map(transform_scryfall_set)));

  return await lastValueFrom(concat(sets_etl$));
}
