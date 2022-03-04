import { ScryfallObject, ScryfallObjectList } from './scryfall-object';

export type ScryfallBulkDataType =
  | 'all_cards'
  | 'default_cards'
  | 'oracle_cards'
  | 'rulings'
  | 'unique_artwork';

export interface ScryfallBulkData extends ScryfallObject {
  object: 'bulk-data';
  id: string;
  type: ScryfallBulkDataType;
  updated_at: string;
  uri: string;
  name: string;
  description: string;
  compressed_size: number;
  download_uri: string;
  content_type: 'application/json';
  content_encoding: 'gzip';
}

export type ScryfallBulkDataList = ScryfallObjectList<ScryfallBulkData>;
