import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN, REGISTER } from '../../routes';

function WelcomePage() {
  return (
    <div>
      <title>Welcome - XML</title>
      <div>
        <Link to={LOGIN}>Login</Link>
      </div>
      <main>
        <h1>Hello</h1>
      </main>
    </div>
  );
}

export default WelcomePage;
