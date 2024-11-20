export interface Album {
  id: number; // Matches `Long` in backend
  title: string;
  artist: string;
  genre: string; // Genre som String (enum værdi fra backend)
  available: boolean;
  storeId?: number; // Reference til Store; valgfri (kan være null)
  liked: boolean;
  imageUrl?: string; // URL til billede; valgfri (kan være null)
}
