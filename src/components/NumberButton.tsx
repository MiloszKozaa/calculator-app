import { NumberButtonTypes } from '../types/App.types';
import { ACTIONS } from './Calculator';
import './NumberButton.css';

const OperationButton = ({ dispatch, darkMode, digit }: NumberButtonTypes) => {
  return (
    <button
      className={darkMode ? 'NumberButton' : 'NumberButton_light'}
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>
      {digit}
    </button>
  );
};

export default OperationButton;
