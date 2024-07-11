import React, { useState } from 'react';
import '../App.css';

const Display = () => {
    const initialPhotos = [
        { url: 'https://images.unsplash.com/photo-1632149877166-f75d49000351?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', likes: Math.floor(Math.random() * 100) },
        { url: 'https://images.unsplash.com/photo-1588117260148-b47818741c74?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', likes: Math.floor(Math.random() * 100) },
        { url: 'https://images.unsplash.com/photo-1535972976071-2dccec4adc83?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', likes: Math.floor(Math.random() * 100) },
        // Add more photos as needed
    ];

    const [photos, setPhotos] = useState(initialPhotos);

    const handleLike = (index) => {
        const updatedPhotos = [...photos];
        updatedPhotos[index].likes += 1;
        setPhotos(updatedPhotos);
    };

    return (
        <div>
            <h1>Pre-loaded Photo Gallery</h1>
            <div className="gallery">
                {photos.map((photo, index) => (
                    <div key={index} className="photo-item">
                        <img src={photo.url} alt={`Photo ${index + 1}`} />
                        <div className="photo-details">
                            <span>Likes: {photo.likes}</span>
                            <button onClick={() => handleLike(index)}>Like</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Display;
