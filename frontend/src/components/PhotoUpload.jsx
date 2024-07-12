import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            setError('Failed to upload file. Please try again.');
        } finally {
            setUploading(false);
        }
    }

    return (
        <div>
            <h1>Please upload the photo here</h1>
            <input type="file" name="photo" onChange={handleImage} />
            <button onClick={handleApi} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Submit'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {imageUrl && (
                <div>
                    <h3>Uploaded Image:</h3>
                    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '500px', maxHeight: '500px' }} />
                </div>
            )}
        </div>
    );
};

export default PhotoUpload;
