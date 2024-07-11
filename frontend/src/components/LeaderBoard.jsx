import React from 'react';

const Leaderboard = ({ photos }) => {
    // Sort photos by likes in descending order
    const sortedPhotos = [...photos].sort((a, b) => b.likes - a.likes);

    return (
        <div>
            <h1>Photo Leaderboard</h1>
            <div className="leaderboard">
                {sortedPhotos.map((photo, index) => (
                    <div key={index} className="leaderboard-item">
                        <img src={photo.url} alt={`Photo ${index + 1}`} />
                        <div className="leaderboard-details">
                            <span>Likes: {photo.likes}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
