import { AlbumCustomerDTO } from "../types/AlbumCustomer";
import { Album } from "../types/Albums";
import { getImageUrl } from "./ ImageMapper";
import { makeOptions, handleHttpErrors } from "./FetchUtils";

const API_URL = "http://localhost:8080";

const Albums_URL = API_URL + "/api/albums";
const Auth_URL = API_URL + "/api/auth";

/**
 * Hent alle albums fra backend
 */
export const getAllAlbums = async (): Promise<Album[]> => {
  const options = makeOptions("GET");
  return fetch(Albums_URL, options).then(handleHttpErrors);
};

export const getAlbumsWithImages = async (): Promise<Album[]> => {
  const albums = await getAllAlbums(); // Hent albums fra backend
  return albums.map((album) => ({
    ...album,
    imageUrl: getImageUrl(album.title), // Tilføj billed-URL baseret på titel
  }));
};
// Assuming the customerId is passed as an argument, and you want to fetch filtered reservations
export const getReservations = async (
  customerId: number,
  available: boolean = false, // Default is false (fetch unavailable albums)
  liked: boolean = true // Default is true (fetch liked albums)
): Promise<AlbumCustomerDTO[]> => {
  const queryParams = new URLSearchParams();
  if (available !== undefined) {
    queryParams.append("available", String(available));
  }
  if (liked !== undefined) {
    queryParams.append("liked", String(liked));
  }

  // Fetch with the customerId and query params
  const response = await fetch(
    `${API_URL}/api/customers/${customerId}/albums?${queryParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch album reservations");
  }

  return response.json(); // Returns the list of reservations (AlbumCustomerDTO)
};

//auth
export const login = async (
  username: string,
  password: string
): Promise<string> => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  const response = await fetch(`${Auth_URL}/login`, options);
  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  const data = await response.json();
  return data.token; // Token fra backend
};

export const register = async (
  username: string,
  password: string
): Promise<void> => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  const response = await fetch(`${Auth_URL}/register`, options);
  if (!response.ok) {
    throw new Error("Registration failed");
  }
};

export const makeAuthorizedOptions = (method: string, token: string) => ({
  method,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
