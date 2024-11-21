export interface Album {
  id: number;
  title: string;
  artist: string;
  genre: string;
  available: boolean;
  storeId?: number;
  liked: boolean;
  storeName?: string;
  imageUrl?: string;
}
