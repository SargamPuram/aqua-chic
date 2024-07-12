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
        setPhotos(response.data.photos); // Assuming the server returns an array of image URLs under 'photos'
      } catch (error) {
        setError('Error fetching photos.');
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

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
                src={photo}
                alt={`Uploaded ${index}`}
                style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
              />
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
