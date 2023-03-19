export interface BookResponseType {
  meta?: MetaData;
  documents?: any;
}

export interface MetaData {
  is_end?: boolean;
  pageable_count?: number;
  total_count?: number;
}

export interface Books {
  authors?: Array<string>;
  contents?: string;
  title?: string;
  publisher?: string;
  price?: number;
  sale_price?: number;
  thumbnail?: string;
  url?: string;
  isbn?: string;
}

export interface BookRequestType {
  target: "title" | "person" | "publisher" | "isbn";
  query: string;
  page?: number;
  size?: number;
}
