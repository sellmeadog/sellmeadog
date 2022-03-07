import { Long } from 'mongodb';

import { transform_scryfall_set } from './transform-scryfall-set';

describe('transform_scryfall_set', () => {
  it('should transform document', () => {
    const actual = transform_scryfall_set({
      object: 'set',
      id: '8052750a-aaf2-46fc-b46d-633f14124017',
      code: 'dka',
      mtgo_code: 'dka',
      arena_code: 'dka',
      tcgplayer_id: 125,
      name: 'Dark Ascension',
      uri: 'https://api.scryfall.com/sets/8052750a-aaf2-46fc-b46d-633f14124017',
      scryfall_uri: 'https://scryfall.com/sets/dka',
      search_uri:
        'https://api.scryfall.com/cards/search?order=set&q=e%3Adka&unique=prints',
      released_at: '2012-02-03',
      set_type: 'expansion',
      card_count: 158,
      printed_size: 158,
      digital: false,
      nonfoil_only: false,
      foil_only: false,
      block_code: 'isd',
      block: 'Innistrad',
      icon_svg_uri:
        'https://c2.scryfall.com/file/scryfall-symbols/sets/dka.svg?1631505600',
    });

    expect(actual).toEqual({
      _id: '8052750a-aaf2-46fc-b46d-633f14124017',
      code: 'dka',
      tcgplayer_id: new Long(125),
      name: 'Dark Ascension',
      released_at: '2012-02-03',
      set_type: 'expansion',
      card_count: new Long(158),
      parent_set_code: null,
      printed_size: new Long(158),
      digital: false,
      block_code: 'isd',
      block: 'Innistrad',
      icon_svg_uri:
        'https://c2.scryfall.com/file/scryfall-symbols/sets/dka.svg?1631505600',
    });
  });

  it('should transform document with default values when source undefined', () => {
    const actual = transform_scryfall_set({
      object: 'set',
      id: '8052750a-aaf2-46fc-b46d-633f14124017',
      code: 'dka',
      mtgo_code: 'dka',
      arena_code: 'dka',
      name: 'Dark Ascension',
      uri: 'https://api.scryfall.com/sets/8052750a-aaf2-46fc-b46d-633f14124017',
      scryfall_uri: 'https://scryfall.com/sets/dka',
      search_uri:
        'https://api.scryfall.com/cards/search?order=set&q=e%3Adka&unique=prints',
      set_type: 'expansion',
      card_count: 158,
      digital: false,
      nonfoil_only: false,
      foil_only: false,
      icon_svg_uri:
        'https://c2.scryfall.com/file/scryfall-symbols/sets/dka.svg?1631505600',
    });

    expect(actual).toEqual({
      _id: '8052750a-aaf2-46fc-b46d-633f14124017',
      code: 'dka',
      tcgplayer_id: null,
      name: 'Dark Ascension',
      released_at: null,
      set_type: 'expansion',
      card_count: new Long(158),
      parent_set_code: null,
      printed_size: new Long(158),
      digital: false,
      block_code: 'dka',
      block: 'Non-Block Expansion',
      icon_svg_uri:
        'https://c2.scryfall.com/file/scryfall-symbols/sets/dka.svg?1631505600',
    });
  });
});
