// src/components/Gallery.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PhotoModal from './photomodal'; // Import the modal component
import './gallery.css'; // Optional: Create a CSS file for styling
import './photomodal.css';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          'https://api.unsplash.com/photos/random?count=12&client_id=vCmEW-KEX-FYUbTwtfd2DVXJl3ftmsXg87YcrjqqCVA'
        );
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div>
      <h1>Photo Gallery</h1>
      <div className="gallery">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item" onClick={() => openModal(photo)}>
            <img src={photo.urls.small} alt={photo.alt_description} />
          </div>
        ))}
      </div>
      {selectedPhoto && <PhotoModal photo={selectedPhoto} onClose={closeModal} />}
    </div>
  );
};

export default Gallery;
