export interface ScryfallObject {
  object: string;
}

export interface ScryfallObjectList<T extends ScryfallObject> {
  object: 'list';
  has_more: boolean;
  next_page?: string;
  data: T[];
}

export type ScryfallColor = 'W' | 'U' | 'B' | 'R' | 'G' | 'C';
