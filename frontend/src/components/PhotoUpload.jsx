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

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleApi = async () => {
    if (!image) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('photo', image);

    try {
      const response = await axios.post('https://aqua-chic-production.up.railway.app/upload-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { data } = response;
      setImageUrl(data.url);
      navigate('/photogallery');
    } catch (error) {
      console.error('Error uploading file:', error);
      if (error.response) {
        setError(`Server responded with status ${error.response.status}: ${error.response.data.error}`);
      } else if (error.request) {
        setError('No response from server. Please check your network connection.');
      } else {
        setError(`Error in request setup: ${error.message}`);
      }
    } finally {
      setUploading(false);
    }
  };

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



