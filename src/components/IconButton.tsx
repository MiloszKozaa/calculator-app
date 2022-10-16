import { useState } from 'react';
import { IconButtonTypes } from '../types/App.types';
import './IconButton.css';

const IconButton = ({ name, style, onClick }: IconButtonTypes) => {
  const [hover, hoverSet] = useState(false);

  return (
    <button
      className={`Icon${style}Button`}
      onClick={onClick}
      onMouseEnter={() => hoverSet(true)}
      onMouseLeave={() => hoverSet(false)}>
      <img
        src={
          hover
            ? `${process.env.PUBLIC_URL}/icons/${name}_hover.png`
            : `${process.env.PUBLIC_URL}/icons/${name}.png`
        }
        alt=''
      />
    </button>
  );
};

export default IconButton;
