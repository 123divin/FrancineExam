import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GamePage() {
  const [meme, setMeme] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [correctCaptions, setCorrectCaptions] = useState([]);
  const [selectedCaption, setSelectedCaption] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMeme = async () => {
      const response = await axios.get('http://localhost:3001/api/game/start', { withCredentials: true });
      setMeme(response.data.meme);
      setCaptions(response.data.captions);
      setCorrectCaptions(response.data.correctCaptions);
    };

    fetchMeme();
  }, []);

  const handleSubmit = async () => {
    const response = await axios.post('http://localhost:3001/api/game/submit', {
      memeId: meme.id,
      selectedCaptionId: selectedCaption
    }, { withCredentials: true });

    if (response.data.points > 0) {
      setMessage('Correct! You earned 5 points.');
    } else {
      setMessage(`Wrong! The correct captions were ${correctCaptions.join(', ')}`);
    }
  };

  return (
    <div>
      {meme && (
        <div>
          <img src={meme.url} alt="Meme" />
          <ul>
            {captions.map((caption) => (
              <li key={caption.id}>
                <button onClick={() => setSelectedCaption(caption.id)}>{caption.text}</button>
              </li>
            ))}
          </ul>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default GamePage;
