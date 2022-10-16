import { useState } from 'react';
import { ActionButtonTypes } from '../types/App.types';
import './ActionButton.css';

const ActionButton = ({
  name,
  special,
  onClick,
  darkMode,
  isCopied,
}: ActionButtonTypes) => {
  const [hover, hoverSet] = useState(false);

  return (
    <button
      className={
        name === 'back' || name === 'copy'
          ? isCopied
            ? 'CopiedButton'
            : darkMode
            ? 'ActionButton'
            : 'ActionButton_light'
          : special
          ? darkMode
            ? 'ActionSpecialButton'
            : 'ActionSpecialButton_light'
          : darkMode
          ? 'ActionButton'
          : 'ActionButton_light'
      }
      onClick={onClick}
      onMouseEnter={() => hoverSet(true)}
      onMouseLeave={() => hoverSet(false)}>
      {name === 'back' || name === 'copy' ? (
        <img
          src={
            hover || isCopied
              ? `${process.env.PUBLIC_URL}/icons/${name}_hover.png`
              : `${process.env.PUBLIC_URL}/icons/${name}.png`
          }
        />
      ) : (
        name
      )}
    </button>
  );
};

export default ActionButton;
