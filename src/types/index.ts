export interface bookResponseType {
  meta?: metaData;
  documents?: any;
}

export interface metaData {
  is_end?: boolean;
  pageable_count?: number;
  total_count?: number;
}

export interface books {
  authors?: Array<string>;
  contents?: string;
  title?: string;
  publisher?: string;
  price?: number;
  sale_price?: number;
  thumbnail?: string;
  url?: string;
  isbn?: number;
}

export interface bookRequestType {
  target: "title" | "person" | "publisher" | "isbn";
  query: string;
  page?: number;
  size?: number;
}
