import { useReducer } from 'react';
import ActionButton from './ActionButton';
import OperationButton from './OperationButton';
import NumberButton from './NumberButton';
import Preview from './Preview';
import Result from './Result';
import './Calculator.css';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

const reducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }
      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.CHOOSE_OPERATION:
      if (!state.previousOperand && !state.currentOperand) {
        return state;
      }
      if (!state.previousOperand) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      if (!state.currentOperand && state.previousOperand) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.previousOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        operation: payload.operation,
        previousOperand: evaluate(state),
        currentOperand: null,
      };
  }
};

const evaluate = ({ previousOperand, currentOperand, operation }: any) => {
  let computation;
  const previous = parseInt(previousOperand);
  const current = parseInt(currentOperand);
  if (isNaN(previous) || isNaN(current)) {
    return '';
  }
  operation === '+'
    ? (computation = previous + current)
    : operation === '-'
    ? (computation = previous - current)
    : operation === '×'
    ? (computation = previous * current)
    : (computation = previous / current);
  return computation.toString();
};

const Calculator = () => {
  const [{ previousOperand, currentOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className='wrapper'>
      <div className='screen'>
        <Preview
          preview={
            previousOperand ? parseInt(previousOperand).toLocaleString() : ''
          }
          operation={operation}
        />
        <Result
          result={
            currentOperand ? parseInt(currentOperand).toLocaleString() : ''
          }
        />
      </div>
      <div className='buttons'>
        <ActionButton
          name='AC'
          special={true}
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        />
        <ActionButton name='C' />
        <ActionButton name='%' />
        <OperationButton operation='÷' dispatch={dispatch} />
        <NumberButton digit='7' dispatch={dispatch} />
        <NumberButton digit='8' dispatch={dispatch} />
        <NumberButton digit='9' dispatch={dispatch} />
        <OperationButton operation='×' dispatch={dispatch} />
        <NumberButton digit='4' dispatch={dispatch} />
        <NumberButton digit='5' dispatch={dispatch} />
        <NumberButton digit='6' dispatch={dispatch} />
        <OperationButton operation='-' dispatch={dispatch} />
        <NumberButton digit='1' dispatch={dispatch} />
        <NumberButton digit='2' dispatch={dispatch} />
        <NumberButton digit='3' dispatch={dispatch} />
        <OperationButton operation='+' dispatch={dispatch} />
        <NumberButton digit='0' dispatch={dispatch} />
        <NumberButton digit='0' dispatch={dispatch} />
        <NumberButton digit='.' dispatch={dispatch} />
        <OperationButton operation='=' special={true} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default Calculator;
