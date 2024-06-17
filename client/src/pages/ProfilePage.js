import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get('http://localhost:3001/api/game/profile', { withCredentials: true });
      setUser(response.data.user);
      setRounds(response.data.rounds);
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {user && (
        <div>
          <h1>{user.username}'s Profile</h1>
          <ul>
            {rounds.map((round, index) => (
              <li key={index}>
                Meme ID: {round.meme_id}, Selected Caption ID: {round.selected_caption_id}, Points: {round.points}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
