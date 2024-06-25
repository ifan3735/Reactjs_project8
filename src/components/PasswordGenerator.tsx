import React, { useState, useEffect, useRef, useCallback } from 'react';
import './PasswordGenerator.scss';

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecial, setIncludeSpecial] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);

  const generatePassword = useCallback(() => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specials = '!@#$%^&*()_+[]{}|;:,.<>?';

    let chars = letters;
    if (includeNumbers) chars += numbers;
    if (includeSpecial) chars += specials;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(generatedPassword);
  }, [length, includeNumbers, includeSpecial]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
    }
  };

  return (
    <div className="password-generator">
      <div className="controls">
        <label>
          Length: {length}
          <input
            type="range"
            min="6"
            max="24"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSpecial}
            onChange={() => setIncludeSpecial(!includeSpecial)}
          />
          Include Special Characters
        </label>
      </div>
      <div className="output">
        <input
          ref={passwordRef}
          type="text"
          value={password}
          readOnly
        />
        <button onClick={copyToClipboard}>Copy</button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
