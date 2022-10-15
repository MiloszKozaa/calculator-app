import { NumberButtonTypes } from '../types/App.types';
import { ACTIONS } from './Calculator';
import './NumberButton.css';

const OperationButton = ({ dispatch, digit }: NumberButtonTypes) => {
  return (
    <button
      className='NumberButton'
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>
      {digit}
    </button>
  );
};

export default OperationButton;
