import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to What Do You Meme?</h1>
      <Link to="/login">Login</Link> or <Link to="/game">Play as Guest</Link>
    </div>
  );
}

export default HomePage;
