import React from 'react';
import PasswordGenerator from './components/PasswordGenerator';
import './styles/App.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Password Generator</h1>
      <PasswordGenerator />
    </div>
  );
};

export default App;
