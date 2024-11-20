export interface AlbumCustomerDTO {
  id: number; // Corresponds to Long in Java
  albumId: number; // Corresponds to Long in Java
  albumTitle: string;
  albumArtist: string;
  interestDate: string; // Corresponds to LocalDate in Java (you may use string or Date depending on your date handling)
  available: boolean;
  notified: boolean;
}
