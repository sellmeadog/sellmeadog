import { ScryfallObject, ScryfallObjectList } from './scryfall-object';

export interface ScryfallSet extends ScryfallObject {
  object: 'set';
  id: string;
  code: string;
  mtgo_code?: string | null;
  arena_code?: string | null;
  tcgplayer_id?: number | null;
  name: string;
  set_type: string;
  released_at?: string | null;
  block_code?: string | null;
  block?: string | null;
  parent_set_code?: string | null;
  card_count: number;
  printed_size?: number | null;
  digital: boolean;
  foil_only: boolean;
  nonfoil_only: boolean;
  scryfall_uri: string;
  uri: string;
  icon_svg_uri: string;
  search_uri: string;
}

export type ScryfallSetList = ScryfallObjectList<ScryfallSet>;
