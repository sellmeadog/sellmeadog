import './magic-game';
import { P9MagicColor } from './magic-game';
import { P9MagicSet } from './magic-set';

export interface P9MagicCard {
  // Core Card Fields
  _id: string;
  _partition: string;
  tcgplayer_id: number | null;
  cardmarket_id: number | null;
  oracle_card?: boolean | null;
  oracle_id: string;
  rulings_uri: string;

  // Gameplay Fields
  card_faces: P9MagicCardFace[];
  cmc: number;
  color_identity: P9MagicColor[];
  edhrec_rank: number | null;
  keywords: string[];
  layout: string;
  legalities: P9MagicCardLegalityMap;
  name: string;
  produced_mana: P9MagicColor[];
  reserved: boolean;

  // Print Fields
  booster: boolean;
  border_color: string;
  collector_number: string;
  // default_card: boolean | null;
  digital: boolean;
  finishes: string[];
  flavor_name: string | null;
  frame_effects: string[];
  frame: string;
  full_art: boolean;
  games: string[];
  magic_set: P9MagicSet;
  promo: boolean;
  promo_types: string[];
  rarity: string;
  released_at: string;
  reprint: boolean;
  textless: boolean;
  preview: P9MagicCardPreview | null;
}

export interface P9MagicCardFace {
  artist: string | null;
  color_indicator: string[];
  colors: string[];
  flavor_text: string | null;
  image_uris: P9MagicCardImageUriMap | null;
  loyalty_numeric: number | null;
  loyalty: string | null;
  mana_cost: string;
  name: string;
  names: string[];
  oracle_text: string | null;
  power_numeric: number | null;
  power: string | null;
  printed_name: string | null;
  printed_text: string | null;
  printed_type_line: string | null;
  toughness_numeric: number | null;
  toughness: string | null;
  type_line: string;
  types: string[];
  watermark: string | null;
}

export interface P9MagicCardImageUriMap {
  png: string | null;
  border_crop: string | null;
  art_crop: string | null;
  large: string | null;
  normal: string | null;
  small: string | null;
}

export type P9MagicCardLegalStatus =
  | 'banned'
  | 'legal'
  | 'not_legal'
  | 'restricted';

export interface P9MagicCardLegalityMap {
  brawl: P9MagicCardLegalStatus;
  commander: P9MagicCardLegalStatus;
  future: P9MagicCardLegalStatus;
  historic: P9MagicCardLegalStatus;
  legacy: P9MagicCardLegalStatus;
  modern: P9MagicCardLegalStatus;
  oathbreaker: P9MagicCardLegalStatus;
  pauper: P9MagicCardLegalStatus;
  pioneer: P9MagicCardLegalStatus;
  standard: P9MagicCardLegalStatus;
  vintage: P9MagicCardLegalStatus;
}

export interface P9MagicCardPreview {
  previewed_at: string | null;
  source_uri: string | null;
  source: string | null;
}

export interface P9MagicCardRelatedPart {
  id: string;
  object: 'related_card';
  component: string;
  name: string;
  type_line: string;
  uri: string;
}

export interface P9MagicCardLegalityMap {
  [key: string]: 'banned' | 'legal' | 'not_legal' | 'restricted';
}
