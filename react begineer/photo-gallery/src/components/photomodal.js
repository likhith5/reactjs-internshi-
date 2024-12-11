
import React from 'react';
import './photomodal.css'; // Update this line to match the filename

const PhotoModal = ({ photo, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <img src={photo.urls.full} alt={photo.alt_description} />
        <p>{photo.description || 'No description available.'}</p>
      </div>
    </div>
  );
};

export default PhotoModal;
