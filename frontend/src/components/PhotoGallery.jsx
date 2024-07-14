import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/PhotoGallery.css';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await axios.get('https://aqua-chic-production.up.railway.app/photos');
        const s3BaseUrl = 'https://aqua-chic.s3.amazonaws.com/uploads/';
        const photosWithLikes = await Promise.all(response.data.photos.map(async (photo) => {
          const likesResponse = await axios.get(`https://aqua-chic-production.up.railway.app/likes/${encodeURIComponent(photo.key)}`);
          return { ...photo, url: `${s3BaseUrl}${photo.filename}`, likes: likesResponse.data.likes };
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
      const response = await axios.post('https://aqua-chic-production.up.railway.app/like-photo', { photoId: key });
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
                onError={() => console.error(`Failed to load image: ${photo.url}`)}
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

