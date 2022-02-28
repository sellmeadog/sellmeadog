export interface P9MagicSet {
  _id: string;
  code: string;
  tcgplayer_id: number | null;
  name: string;
  set_type: string;
  released_at: string | null;
  block_code: string | null;
  block: string | null;
  parent_set_code: string | null;
  card_count: number;
  printed_size: number;
  digital: boolean;
  icon_svg_uri: string;
}
