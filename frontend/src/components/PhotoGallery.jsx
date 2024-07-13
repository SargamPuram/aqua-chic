import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/PhotoGallery.css'; // Import the CSS file

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await axios.get('http://localhost:3001/photos');
        const photosWithLikes = await Promise.all(response.data.photos.map(async (photo) => {
          const likesResponse = await axios.get(`http://localhost:3001/likes/${encodeURIComponent(photo.key)}`);
          return { ...photo, likes: likesResponse.data.likes };
        }));
        setPhotos(photosWithLikes);
      } catch (error) {
        setError('Oops! Something went wrong while fetching photos.');
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  const handleLike = async (key) => {
    try {
      const response = await axios.post('http://localhost:3001/like-photo', { photoId: key });
      setPhotos(photos.map(photo => photo.key === key ? { ...photo, likes: response.data.likes } : photo));
    } catch (error) {
      console.error('Error liking photo:', error);
    }
  };

  return (
    <div className="photo-gallery-container">
      <h1 className="gallery-heading">🌟 Awesome Photo Gallery 🌟</h1>
      {loading && <p className="loading-text">Fetching the coolest pics...</p>}
      {error && <p className="error-text">{error}</p>}
      <div className="photo-grid">
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <div key={index} className="photo-card">
              <img
                src={photo.url}
                alt={`Uploaded ${index}`}
                className="photo-img"
              />
              <div className="photo-actions">
                <button onClick={() => handleLike(photo.key)} className="like-button">
                  💖 {photo.likes}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-photos-text">No photos available. Time to upload some cool snaps!</p>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
