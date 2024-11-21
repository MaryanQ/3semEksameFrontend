import { Album } from "./Albums";

export interface Store {
  id: number;
  name: string;
  street: string;
  city: string;
  zip: string;
  albums: Album[];
}
