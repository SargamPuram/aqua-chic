import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/PhotoGallery.css';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://aqua-chic-production.up.railway.app/photos');
        // No need to append s3BaseUrl here if `photo.url` is already complete
        const photosWithLikes = await Promise.all(response.data.photos.map(async (photo) => {
          try {
            const likesResponse = await axios.get(`https://aqua-chic-production.up.railway.app/likes/${encodeURIComponent(photo.key)}`);
            return { ...photo, likes: likesResponse.data.likes };
          } catch (error) {
            console.error(`Error fetching likes for ${photo.key}:`, error);
            return { ...photo, likes: 0 }; // Default to 0 likes if there's an error
          }
        }));
        setPhotos(photosWithLikes);
      } catch (error) {
        setError('Oops! Something went wrong while fetching photos.');
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

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
                src={photo.url} // Ensure photo.url is correctly set
                alt={`Uploaded ${index}`}
                className="photo-img"
                onError={(e) => {
                  e.target.onerror = null; // Prevents infinite loop if error persists
                  e.target.src = 'default-image-url'; // Fallback image URL
                  console.error(`Failed to load image: ${photo.url}`);
                }}
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



