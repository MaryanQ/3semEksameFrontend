import React, { useCallback, useEffect, useState } from "react";
import {
  registerInterest,
  unsubscribeInterest,
  getReservations,
  getAlbumsWithImages,
} from "../../services/ApiFacade";
import "../../styles/CustomerReservations.css";

interface Album {
  id: number;
  title: string;
  artist: string;
  genre: string;
  available: boolean;
}

const CustomerReservations: React.FC<{ customerId: number }> = ({
  customerId,
}) => {
  const [reservations, setReservations] = useState<Album[]>([]);
  const [allAlbums, setAllAlbums] = useState<Album[]>([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [loadingAlbums, setLoadingAlbums] = useState(false);

  // Fetch reservations
  const fetchReservations = useCallback(async () => {
    setLoadingReservations(true);
    try {
      const data = await getReservations(customerId, availableOnly);
      setReservations(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoadingReservations(false);
    }
  }, [customerId, availableOnly]);

  // Fetch all albums
  const fetchAllAlbums = useCallback(async () => {
    setLoadingAlbums(true);
    try {
      const data = await getAlbumsWithImages();
      setAllAlbums(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoadingAlbums(false);
    }
  }, []);

  // Initial fetch of reservations and albums
  useEffect(() => {
    fetchReservations();
    fetchAllAlbums();
  }, [fetchReservations, fetchAllAlbums]);

  // Handle album reservation
  const handleReserve = async (albumId: number) => {
    try {
      await registerInterest(customerId, albumId);
      setSuccessMessage("Album reserved successfully!");
      fetchReservations();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    }
  };

  // Handle album unsubscription
  const handleUnsubscribe = async (albumId: number) => {
    try {
      await unsubscribeInterest(customerId, albumId);
      setSuccessMessage("Unsubscribed successfully!");
      fetchReservations();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    }
  };

  // Auto-clear messages after a delay
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  return (
    <div className="customer-reservations">
      <h1>Albums & Reservations</h1>

      {/* Display error or success messages */}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Filter toggle for available-only reservations */}
      <div className="filter">
        <label>
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={() => setAvailableOnly(!availableOnly)}
          />
          Show only available reservations
        </label>
      </div>

      {/* Display reservations */}
      <h2>My Reservations</h2>
      {loadingReservations ? (
        <p>Loading reservations...</p>
      ) : reservations.length > 0 ? (
        <div className="album-list">
          {reservations.map((album) => (
            <div key={album.id} className="album-card">
              <h3>{album.title}</h3>
              <p>Artist: {album.artist}</p>
              <p>Genre: {album.genre}</p>
              <p>Available: {album.available ? "Yes" : "No"}</p>
              <button onClick={() => handleUnsubscribe(album.id)}>
                Unsubscribe
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No reservations found.</p>
      )}

      {/* Display all albums */}
      <h2>All Albums</h2>
      {loadingAlbums ? (
        <p>Loading albums...</p>
      ) : (
        <div className="album-list">
          {allAlbums.map((album) => (
            <div key={album.id} className="album-card">
              <h3>{album.title}</h3>
              <p>Artist: {album.artist}</p>
              <p>Genre: {album.genre}</p>
              <p>Available: {album.available ? "Yes" : "No"}</p>
              {album.available ? (
                <button onClick={() => handleReserve(album.id)}>Reserve</button>
              ) : (
                <button disabled>Not Available</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerReservations;
