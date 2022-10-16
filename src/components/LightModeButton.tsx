import { useState } from 'react';
import { LightModeButtonTypes } from '../types/App.types';
import './LightModeButton.css';

const LightModeButton = ({ darkMode, onClick }: LightModeButtonTypes) => {
  const [hover, hoverSet] = useState(false);
  return (
    <button
      className={darkMode ? 'DarkModeButton' : 'LightModeButton'}
      onClick={onClick}
      onMouseEnter={() => hoverSet(true)}
      onMouseLeave={() => hoverSet(false)}>
      {darkMode ? (
        <img
          src={
            !hover
              ? `${process.env.PUBLIC_URL}/icons/lightMode.png`
              : `${process.env.PUBLIC_URL}/icons/lightMode_hover.png`
          }
        />
      ) : (
        <img
          src={
            !hover
              ? `${process.env.PUBLIC_URL}/icons/darkMode.png`
              : `${process.env.PUBLIC_URL}/icons/darkMode_hover.png`
          }
        />
      )}
    </button>
  );
};

export default LightModeButton;
