import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PhotoUpload.css'; // Ensure the correct path

const PhotoUpload = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleImage(e) {
    setImage(e.target.files[0]);
  }

  async function handleApi() {
    if (!image) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('photo', image); // Ensure the name matches the backend

    try {
      const response = await axios.post('http://localhost:3001/upload-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { data } = response;
      setImageUrl(data.url);
      navigate('/photogallery');
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Oops! Something went wrong. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="photo-upload-container">
      <div className="upload-form">
        <h1>Upload Your Epic Snap 📸</h1>
        <p className="fun-message">We can’t wait to see your stylish moments! Just drag and drop or select your photo below.</p>
        <input type="file" name="photo" onChange={handleImage} />
        <button onClick={handleApi} disabled={uploading}>
          {uploading ? 'Uploading... 🚀' : 'Submit Your Photo 🚀'}
        </button>
        {error && <p className="error-message">{error}</p>}
        {imageUrl && (
          <div>
            <h3>Your Photo Looks Amazing! 😎</h3>
            <img src={imageUrl} alt="Uploaded" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;
