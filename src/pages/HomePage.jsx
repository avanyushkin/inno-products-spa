import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <h1>Welcome!</h1>
      <Link to='/login'>Login link</Link>
    </>
  );
}

export default HomePage;