import { LightModeButtonTypes } from '../types/App.types';
import './ActionButton.css';

const LightModeButton = ({ darkMode, onClick }: LightModeButtonTypes) => {
  return (
    <button className='LightModeButton' onClick={onClick}>
      {darkMode ? 'yes' : 'no'}
    </button>
  );
};

export default LightModeButton;
