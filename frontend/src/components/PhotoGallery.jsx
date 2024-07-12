import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        setError('Error fetching photos.');
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
    <div>
      <h1>Photo Gallery</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <div key={index} style={{ margin: '10px' }}>
              <img
                src={photo.url}
                alt={`Uploaded ${index}`}
                style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
              />
              <div>
                <button onClick={() => handleLike(photo.key)}>
                  Like {photo.likes}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No photos available.</p>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
