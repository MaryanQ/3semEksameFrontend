import React, { useState, useEffect } from "react";
import {
  getAlbumsWithImages,
  AddAlbum,
  EditAlbum,
  DeleteAlbum,
  getAllStores,
} from "../../services/ApiFacade";
import { Album } from "../../types/Albums";
import "../../styles/AdminDashboard.css";
import { Store } from "../../types/Store";

const AdminDashboard: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchAlbums();
    fetchStores();
  }, []);

  const fetchAlbums = async () => {
    const data = await getAlbumsWithImages();
    setAlbums(data);
  };

  const fetchStores = async () => {
    const storeData = await getAllStores();
    setStores(storeData);
  };

  const handleAddAlbum = async (album: Partial<Album>) => {
    try {
      await AddAlbum(album as Album);
      setConfirmationMessage("Album blev tilføjet!");
      fetchAlbums();
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding album:", error);
    }
  };

  const handleEditAlbum = async (album: Album) => {
    try {
      await EditAlbum(album.id, album);
      setConfirmationMessage("Album blev opdateret!");
      fetchAlbums();
      setIsEditing(false);
      setSelectedAlbum(null);
    } catch (error) {
      console.error("Error editing album:", error);
    }
  };

  const handleDeleteAlbum = async (id: number) => {
    if (window.confirm("Er du sikker på, at du vil slette dette album?")) {
      try {
        await DeleteAlbum(id);
        setConfirmationMessage("Album blev slettet!");
        fetchAlbums();
      } catch (error) {
        console.error("Error deleting album:", error);
      }
    }
  };

  const openAddForm = () => {
    setSelectedAlbum({
      id: 0,
      title: "",
      artist: "",
      genre: "",
      available: false,
      imageUrl: "",
      storeName: "",
      liked: false,
    });
    setIsAdding(true);
    setIsEditing(false);
  };

  const openEditForm = (album: Album) => {
    setSelectedAlbum(album);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdding) {
      handleAddAlbum(selectedAlbum!);
    } else if (isEditing) {
      handleEditAlbum(selectedAlbum!);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Confirmation Message */}
      {confirmationMessage && (
        <div className="confirmation-message">
          {confirmationMessage}
          <button onClick={() => setConfirmationMessage(null)}>Luk</button>
        </div>
      )}

      {/* Album Grid */}
      <div className="album-grid">
        {albums.map((album) => (
          <div key={album.id} className="album-card">
            <img
              src={album.imageUrl || "https://via.placeholder.com/150"}
              alt={album.title}
              className="album-image"
            />
            <div className="album-info">
              <h3>{album.title}</h3>
              <p>Artist: {album.artist}</p>
              <p>Genre: {album.genre}</p>
              <p>Tilgængelig: {album.available ? "Ja" : "Nej"}</p>
              <p>
                Butik:{" "}
                {stores.find((store) => store.name === album.storeName)?.name ||
                  "Ikke tilknyttet"}
              </p>
            </div>
            <div className="album-actions">
              <button
                className="button edit-button"
                onClick={() => openEditForm(album)}
              >
                Rediger
              </button>
              <button
                className="button delete-button"
                onClick={() => handleDeleteAlbum(album.id)}
              >
                Slet
              </button>
            </div>
          </div>
        ))}

        {/* Add Album Button */}
        <div className="add-album-card" onClick={openAddForm}>
          <div className="add-album-content">
            <p>Tilføj nyt album</p>
            <button className="button add-button">+</button>
          </div>
        </div>
      </div>

      {/* Add/Edit Album Form */}
      {(isAdding || isEditing) && (
        <div className="form-container">
          <h2>{isAdding ? "Tilføj Nyt Album" : "Rediger Album"}</h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Titel"
              value={selectedAlbum?.title || ""}
              onChange={(e) =>
                setSelectedAlbum({
                  ...selectedAlbum!,
                  title: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Artist"
              value={selectedAlbum?.artist || ""}
              onChange={(e) =>
                setSelectedAlbum({
                  ...selectedAlbum!,
                  artist: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Genre"
              value={selectedAlbum?.genre || ""}
              onChange={(e) =>
                setSelectedAlbum({
                  ...selectedAlbum!,
                  genre: e.target.value,
                })
              }
            />
            <label>
              Tilgængelig:
              <input
                type="checkbox"
                checked={selectedAlbum?.available || false}
                onChange={(e) =>
                  setSelectedAlbum({
                    ...selectedAlbum!,
                    available: e.target.checked,
                  })
                }
              />
            </label>
            <input
              type="text"
              placeholder="Billede URL"
              value={selectedAlbum?.imageUrl || ""}
              onChange={(e) =>
                setSelectedAlbum({
                  ...selectedAlbum!,
                  imageUrl: e.target.value,
                })
              }
            />
            <label>
              Butik:
              <select
                value={selectedAlbum?.storeName || ""}
                onChange={(e) =>
                  setSelectedAlbum({
                    ...selectedAlbum!,
                    storeName: e.target.value,
                  })
                }
              >
                <option value="">Vælg en butik</option>
                {stores.map((store) => (
                  <option key={store.id} value={store.name}>
                    {store.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="button submit-button">
              {isAdding ? "Tilføj" : "Gem"}
            </button>
            <button
              type="button"
              className="button cancel-button"
              onClick={() => {
                setIsAdding(false);
                setIsEditing(false);
                setSelectedAlbum(null);
              }}
            >
              Annuller
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
