import { OperationButtonTypes } from '../types/App.types';
import { ACTIONS } from './Calculator';
import './OperationButton.css';

const OperationButton = ({
  dispatch,
  operation,
  special,
  onClick,
}: OperationButtonTypes) => {
  return (
    <button
      className={special ? 'OperationSpecialButton' : 'OperationButton'}
      onClick={
        onClick
          ? onClick
          : () =>
              dispatch({
                type: ACTIONS.CHOOSE_OPERATION,
                payload: { operation },
              })
      }>
      {operation}
    </button>
  );
};

export default OperationButton;
