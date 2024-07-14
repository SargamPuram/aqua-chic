import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('https://aqua-chic-production.up.railway.app/leaderboard');
        console.log('Leaderboard data:', response.data); // Log the response data
        const sortedData = response.data.sort((a, b) => b.likes - a.likes);
        setWinners(sortedData.slice(0, 3)); // Display top 3
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h1>Top 3 Photos</h1>
      <ul>
        {winners.map((winner, index) => (
          <li key={winner.photoId} className="leaderboard-item">
            <div className="rank">{index + 1}</div>
            <img 
              src={winner.photoUrl} 
              alt={`Leaderboard item ${index + 1}`} // Update the alt attribute
              className="photo" 
              onError={() => console.error(`Failed to load image: ${winner.photoUrl}`)} // Add error logging
            />
            <div className="likes">❤️ {winner.likes}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;


