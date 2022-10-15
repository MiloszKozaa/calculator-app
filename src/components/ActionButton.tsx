import { ActionButtonTypes } from '../types/App.types';
import './ActionButton.css';

const ActionButton = ({ name, special, onClick }: ActionButtonTypes) => {
  return (
    <button
      className={special ? 'ActionSpecialButton' : 'ActionButton'}
      onClick={onClick}>
      {name}
    </button>
  );
};

export default ActionButton;
