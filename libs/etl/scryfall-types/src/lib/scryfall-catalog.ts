import { ScryfallObject } from './scryfall-object';

export type ScryfallCatalogType =
  | 'ability-words'
  | 'artifact-types'
  | 'artist-names'
  | 'card-names'
  | 'creature-types'
  | 'enchantment-types'
  | 'keyword-abilities'
  | 'keyword-actions'
  | 'land-types'
  | 'loyalties'
  | 'planeswalker-types'
  | 'powers'
  | 'spell-types'
  | 'toughnesses'
  | 'watermarks'
  | 'word-bank';

export interface ScryfallCatalog extends ScryfallObject {
  object: 'catalog';
  uri: string;
  total_values: number;
  data: string[];
}
