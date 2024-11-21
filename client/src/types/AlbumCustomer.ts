export interface AlbumCustomerDTO {
  id: number;
  albumId: number;
  albumTitle: string;
  albumArtist: string;
  interestDate: string;
  available: boolean;
  notified: boolean;
}
