import { ScryfallColor, ScryfallObject } from './scryfall-object';

export interface ScryfallCard extends ScryfallObject {
  // Core Card Fields
  arena_id?: number;
  id: string;
  lang: string;
  mtgo_id?: number;
  mtgo_foil_id?: number;
  multiverse_ids?: number[];
  tcgplayer_id?: number;
  tcgplayer_etched_id?: number;
  cardmarket_id?: number;
  object: 'card';
  oracle_id: string;
  prints_search_uri: string;
  rulings_uri: string;
  scryfall_uri?: string;
  uri?: string;

  // Gameplay Fields
  all_parts?: ScryfallCardRelatedPart[];
  card_faces?: ScryfallCardFace[];
  cmc: number;
  color_identity: ScryfallColor[];
  color_indicator?: ScryfallColor[];
  colors?: ScryfallColor[];
  edhrec_rank?: number;
  hand_modifier?: string;
  keywords?: string[];
  layout: string;
  legalities: ScryfallCardLegalityMap;
  life_modifier?: string;
  loyalty?: string;
  mana_cost?: string;
  name: string;
  oracle_text?: string;
  oversized?: boolean;
  power?: string;
  produced_mana?: ScryfallColor[];
  reserved: boolean;
  toughness?: string;
  type_line: string;

  // Print Fields
  artist?: string;
  artist_ids?: string[];
  booster: boolean;
  border_color: string;
  card_back_id: string;
  collector_number: string;
  content_warning?: boolean;
  digital: boolean;
  foil?: boolean;
  nonfoil?: boolean;
  finishes?: string[];
  flavor_name?: string;
  flavor_text?: string;
  frame_effects?: string[];
  frame: string;
  full_art?: boolean;
  games: string[];
  highres_image?: boolean;
  illustration_id?: string;
  image_status?: string;
  image_uris?: ScryfallCardImageUriMap;
  prices: unknown;
  printed_name?: string;
  printed_text?: string;
  printed_type_line?: string;
  promo?: boolean;
  promo_types?: string[];
  purchase_uris?: unknown;
  rarity: string;
  related_uris?: unknown;
  released_at: string;
  reprint: boolean;
  scryfall_set_uri: string;
  set_name: string;
  set_search_uri: string;
  set_type: string;
  set_uri: string;
  set: string;
  set_id: string;
  story_spotlight?: boolean;
  textless?: boolean;
  variation?: boolean;
  variation_of?: string;
  watermark?: string;
  preview?: ScryfallCardPreview;
}

export interface ScryfallCardFace extends ScryfallObject {
  artist?: string | null;
  artist_id?: string | null;
  color_indicator?: string[];
  colors?: string[];
  flavor_text?: string | null;
  illustration_id?: string | null;
  image_uris?: ScryfallCardImageUriMap;
  loyalty?: string | null;
  mana_cost?: string;
  name: string;
  object: 'card_face';
  oracle_text?: string | null;
  power?: string | null;
  printed_name?: string | null;
  printed_text?: string | null;
  printed_type_line?: string | null;
  toughness?: string | null;
  type_line: string;
  watermark?: string | null;
}

export interface ScryfallCardImageUriMap {
  png: string | null;
  border_crop: string | null;
  art_crop: string | null;
  large: string | null;
  normal: string | null;
  small: string | null;
}

export interface ScryfallCardPreview {
  previewed_at: string | null;
  source_uri: string | null;
  source: string | null;
}

export interface ScryfallCardRelatedPart extends ScryfallObject {
  id: string;
  object: 'related_card';
  component: string;
  name: string;
  type_line: string;
  uri: string;
}

export interface ScryfallCardLegalityMap {
  [key: string]: 'banned' | 'legal' | 'not_legal' | 'restricted';
}
