import { Album } from "../types/Albums";
import { getImageUrl } from "./ ImageMapper";
import { makeOptions, handleHttpErrors } from "./FetchUtils";
import { Store } from "../types/Store";

const API_URL = "http://localhost:8080";

const Albums_URL = API_URL + "/api/albums";
const Auth_URL = API_URL + "/api/auth";
const CUSTOMER_URL = API_URL + "/api/customers/{customerId}/albums";
const STORE_URL = API_URL + "/api/stores";

export const getAllAlbums = async (): Promise<Album[]> => {
  const options = makeOptions("GET");
  return fetch(Albums_URL, options).then(handleHttpErrors);
};

export const getAlbumById = async (id: number): Promise<Album> => {
  const options = makeOptions("GET");
  return fetch(`${Albums_URL}/${id}`, options).then(handleHttpErrors);
};

export const AddAlbum = async (album: Album): Promise<Album> => {
  const options = makeOptions("POST", album);
  return fetch(Albums_URL, options).then(handleHttpErrors);
};

export const EditAlbum = async (id: number, album: Album): Promise<Album> => {
  const options = makeOptions("PUT", album); // Include album data in the request body
  return fetch(`${Albums_URL}/${id}`, options) // Append album ID to the URL
    .then(handleHttpErrors)
    .catch((error) => {
      console.error("Error editing album:", error);
      throw error;
    });
};

export const DeleteAlbum = async (id: number): Promise<void> => {
  const options = makeOptions("DELETE");
  return fetch(`${Albums_URL}/${id}`, options).then(handleHttpErrors);
};

export const getAllStores = async (): Promise<Store[]> => {
  const response = await fetch(STORE_URL);
  const data = await response.json();
  return data; // Sørg for, at dette er en liste over stores
};

export const getAlbumsWithImages = async (): Promise<Album[]> => {
  const albums = await getAllAlbums(); // Hent albums fra backend
  return albums.map((album) => ({
    ...album,
    imageUrl: getImageUrl(album.title), // Tilføj billed-URL baseret på titel
  }));
};

//reservation
export const registerInterest = async (customerId: number, albumId: number) => {
  const options = makeOptions("POST");
  console.log(`Sending POST to reserve album:`, { customerId, albumId });

  return fetch(`${CUSTOMER_URL}/{albumId}/reserve`, options)
    .then(handleHttpErrors)
    .catch((error) => {
      console.error("Error reserving album:", error);
      throw error; // Re-throw the error to handle it in the calling function
    });
};

export const unsubscribeInterest = async (
  customerId: number,
  albumId: number
) => {
  const options = makeOptions("DELETE");
  // Include customerId and albumId in the correct position in the URL
  return fetch(
    `${CUSTOMER_URL}/${customerId}/albums/${albumId}/unsubscribe`,
    options
  ).then(handleHttpErrors);
};

export const getReservations = async (
  customerId: number,
  available: boolean = false
) => {
  const options = makeOptions("GET");
  return fetch(
    `${CUSTOMER_URL}/${customerId}/albums/reservations?available=${available}`,
    options
  ).then(handleHttpErrors);
};

//auth
export const login = async (
  username: string,
  password: string
): Promise<{ token: string; roles: string[] }> => {
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
  saveToken(data.token, data.roles);
  return data;
};

export const register = async (
  username: string,
  password: string,
  name: string,
  email: string,
  phoneNumber: string
): Promise<void> => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, name, email, phoneNumber }),
  };

  const response = await fetch(`${Auth_URL}/register-customer`, options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Registration failed");
  }
};

const saveToken = (token: string, roles: string[]) => {
  localStorage.setItem("token", token);
  localStorage.setItem("roles", JSON.stringify(roles));
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getRoles = (): string[] => {
  const roles = localStorage.getItem("roles");
  return roles ? JSON.parse(roles) : [];
};

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("roles");
};

export const makeAuthorizedOptions = (method: string): RequestInit => {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  return {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};
