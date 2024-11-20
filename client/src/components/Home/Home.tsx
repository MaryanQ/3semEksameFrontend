import React, { useEffect, useState } from "react";
import { getAlbumsWithImages } from "../../services/ApiFacade";
import { Album } from "../../types/Albums";
import AlbumCard from "../Albums/AlbumCard";
import "./Home.css";

const Home: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    getAlbumsWithImages()
      .then((data) => setAlbums(data))
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h1>Music Store</h1>
      <div className="row">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} onLike={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default Home;
