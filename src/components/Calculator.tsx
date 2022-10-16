//CREATE LIGHT AND DARK MODE
//CREATE VIEW ON PHONE

import { useReducer } from 'react';
import OperationButton from './OperationButton';
import LightModeButton from './LightModeButton';
import ActionButton from './ActionButton';
import NumberButton from './NumberButton';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
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
  DARK_MODE: 'dark-mode',
};

const reducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
          copied: false,
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
        copied: false,
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
          copied: false,
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
        copied: false,
      };
    case ACTIONS.EVALUATE:
      if (state.previousOperand && !state.currentOperand) {
        return {
          ...state,
          currentOperand: state.previousOperand,
          operation: null,
          previousOperand: null,
          copied: false,
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
        copied: false,
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
        copied: false,
      };
    case ACTIONS.COPY:
      if (state.currentOperand) {
        navigator.clipboard.writeText(state.currentOperand.toString());
        return {
          ...state,
          copied: true,
        };
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
      if (!state.currentOperand && !state.previousOperand) {
        return {
          ...state,
          copied: false,
        };
      }
      if (!state.currentOperand && state.previousOperand) {
        return {
          ...state,
          currentOperand: state.previousOperand,
          operation: null,
          previousOperand: null,
          copied: false,
        };
      }
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
          copied: false,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
        copied: false,
      };
    case ACTIONS.DARK_MODE:
      if (state.darkMode) {
        return {
          ...state,
          darkMode: false,
        };
      }
      if (!state.darkMode) {
        return {
          ...state,
          darkMode: true,
        };
      }
  }
};

const evaluate = ({ previousOperand, currentOperand, operation }: any) => {
  let computation;
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
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
  const [
    { previousOperand, currentOperand, operation, copied, darkMode },
    dispatch,
  ] = useReducer(reducer, {});

  return (
    <div className={darkMode ? 'Calculator_dark' : 'Calculator_light'}>
      <Header darkMode={darkMode} />
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
            name='back'
            darkMode={darkMode}
            onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
          />
          <ActionButton
            name='copy'
            isCopied={copied}
            darkMode={darkMode}
            onClick={() => dispatch({ type: ACTIONS.COPY })}
          />
          <OperationButton
            operation='÷'
            dispatch={dispatch}
            darkMode={darkMode}
          />
          <NumberButton digit='7' dispatch={dispatch} darkMode={darkMode} />
          <NumberButton digit='8' dispatch={dispatch} darkMode={darkMode} />
          <NumberButton digit='9' dispatch={dispatch} darkMode={darkMode} />
          <OperationButton
            operation='×'
            dispatch={dispatch}
            darkMode={darkMode}
          />
          <NumberButton digit='4' dispatch={dispatch} darkMode={darkMode} />
          <NumberButton digit='5' dispatch={dispatch} darkMode={darkMode} />
          <NumberButton digit='6' dispatch={dispatch} darkMode={darkMode} />
          <OperationButton
            operation='-'
            dispatch={dispatch}
            darkMode={darkMode}
          />
          <NumberButton digit='1' dispatch={dispatch} darkMode={darkMode} />
          <NumberButton digit='2' dispatch={dispatch} darkMode={darkMode} />
          <NumberButton digit='3' dispatch={dispatch} darkMode={darkMode} />
          <OperationButton
            operation='+'
            dispatch={dispatch}
            darkMode={darkMode}
          />
          <NumberButton digit='.' dispatch={dispatch} darkMode={darkMode} />
          <NumberButton digit='0' dispatch={dispatch} darkMode={darkMode} />
          <LightModeButton
            darkMode={darkMode}
            onClick={() => dispatch({ type: ACTIONS.DARK_MODE })}
          />
          <OperationButton
            operation='='
            special={true}
            dispatch={dispatch}
            onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          />
        </div>
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Calculator;
