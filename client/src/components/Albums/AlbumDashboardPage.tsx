import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReservations } from "../../services/ApiFacade";
import { AlbumCustomerDTO } from "../../types/AlbumCustomer";

const AlbumDashboardPage: React.FC = () => {
  const [albums, setAlbums] = useState<AlbumCustomerDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const getCustomerIdFromToken = (): number | null => {
    const token = localStorage.getItem("authToken");
    if (!token) return null;
    // Optionally decode JWT token to get customer data (use a library like jwt-decode if needed)
    return 1; // Example customer ID, replace with actual logic
  };

  useEffect(() => {
    const fetchReservations = async () => {
      const customerId = getCustomerIdFromToken();
      if (!customerId) {
        setErrorMessage("You must be logged in to view your albums.");
        navigate("/account");
        return;
      }

      try {
        const available = true;
        const liked = true;
        const reservations = await getReservations(
          customerId,
          available,
          liked
        );
        setAlbums(reservations);
        setLoading(false);
      } catch {
        setErrorMessage("An error occurred while fetching your reservations.");
        setLoading(false);
      }
    };

    fetchReservations();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p style={{ color: "red" }}>{errorMessage}</p>;
  }

  return (
    <div>
      <h2>Your Liked Albums</h2>
      <div>
        {albums.length === 0 ? (
          <p>You have no liked albums.</p>
        ) : (
          <ul>
            {albums.map((album) => (
              <li key={album.id}>
                <h3>
                  {album.albumTitle} by {album.albumArtist}
                </h3>
                <p>Interest Date: {album.interestDate}</p>
                <p>Available: {album.available ? "Yes" : "No"}</p>
                <p>Notified: {album.notified ? "Yes" : "No"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AlbumDashboardPage;
