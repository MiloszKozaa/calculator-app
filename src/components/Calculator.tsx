//SHOW INFO NUMBER COPIED
//CREATE LIGHT AND DARK MODE

import { useReducer } from 'react';
import ActionButton from './ActionButton';
import OperationButton from './OperationButton';
import NumberButton from './NumberButton';
import IconButton from './IconButton';
import Preview from './Preview';
import Result from './Result';
import './Calculator.css';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_CURRENT: 'delete-current',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
  COPY: 'copy',
};

const reducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }
      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state;
      }
      if (state.currentOperand && state.currentOperand.length > 11) {
        return {
          ...state,
          currentOperand: state.currentOperand,
        };
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
      if (!state.currentOperand) {
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
    case ACTIONS.EVALUATE:
      if (state.previousOperand && !state.currentOperand) {
        return {
          ...state,
          currentOperand: state.previousOperand,
          operation: null,
          previousOperand: null,
        };
      }
      if (!state.previousOperand || !state.currentOperand || !state.operation) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    case ACTIONS.DELETE_CURRENT:
      if (!state.previousOperand) {
        return {};
      }
      return {
        ...state,
        previousOperand: state.previousOperand,
        currentOperand: null,
      };
    case ACTIONS.COPY:
      if (state.currentOperand) {
        navigator.clipboard.writeText(state.currentOperand.toString());
      }
      return state;
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (!state.currentOperand) {
        return state;
      }
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
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

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});

const formatOperand = (operand: any) => {
  if (!operand) {
    return;
  }
  const [integer, decimal] = operand.split('.');
  if (!decimal) {
    return INTEGER_FORMATTER.format(integer);
  }
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
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
          preview={formatOperand(previousOperand)}
          operation={operation}
        />
        <Result result={formatOperand(currentOperand)} />
      </div>
      <div className='buttons'>
        <ActionButton
          name='AC'
          special={true}
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        />
        <ActionButton
          name='C'
          onClick={() => dispatch({ type: ACTIONS.DELETE_CURRENT })}
        />
        <IconButton
          name='back'
          style='Action'
          onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
        />
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
        <NumberButton digit='.' dispatch={dispatch} />
        <NumberButton digit='0' dispatch={dispatch} />
        <IconButton
          name='copy'
          style='Number'
          onClick={() => dispatch({ type: ACTIONS.COPY })}
        />
        <OperationButton
          operation='='
          special={true}
          dispatch={dispatch}
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        />
      </div>
    </div>
  );
};

export default Calculator;
