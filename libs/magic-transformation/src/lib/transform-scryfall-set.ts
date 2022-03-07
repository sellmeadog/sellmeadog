import { ScryfallSet } from '@sellmeadog/etl/scryfall-types';
import { to_long } from '@sellmeadog/extensions/string';
import { P9MagicSet } from '@sellmeadog/magic-types';

export const transform_scryfall_set = ({
  block_code = null,
  block = 'Non-Block Expansion',
  card_count = 0,
  code,
  digital = false,
  icon_svg_uri,
  id,
  name,
  printed_size,
  parent_set_code = null,
  released_at = null,
  set_type,
  tcgplayer_id = null,
}: ScryfallSet): P9MagicSet => {
  return {
    _id: id,
    block_code: block_code ?? code,
    block,
    card_count: to_long(card_count) as number,
    code,
    digital,
    icon_svg_uri,
    name,
    parent_set_code,
    printed_size: to_long(printed_size ?? card_count) as number,
    released_at,
    set_type,
    tcgplayer_id: to_long(tcgplayer_id),
  };
};
