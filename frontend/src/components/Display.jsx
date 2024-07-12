import React from 'react';

const Display = ({ photos, handleLike }) => {
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
