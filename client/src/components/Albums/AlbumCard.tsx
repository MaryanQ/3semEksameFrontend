import React from "react";
import { Album } from "../../types/Albums";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./AlbumCard.css";

interface Props {
  album: Album;
  onLike: (albumId: number) => void;
}

const AlbumCard: React.FC<Props> = ({ album, onLike }) => {
  return (
    <div className="card" style={{ width: "18rem", margin: "10px" }}>
      <img
        src={album.imageUrl}
        className="card-img-top"
        alt={`${album.title} cover`}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{album.title}</h5>
        <p className="card-text">Artist: {album.artist}</p>
        <p className="card-text">Genre: {album.genre}</p>
        <p className="card-text">Available: {album.available ? "Yes" : "No"}</p>
        <button
          className="btn btn-outline-danger"
          onClick={() => onLike(album.id)}
        >
          {album.liked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
};

export default AlbumCard;
