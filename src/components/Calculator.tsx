import { formatOperand } from '../functions/formatOperand';
import OperationButton from './OperationButton';
import LightModeButton from './LightModeButton';
import { reducer } from '../functions/reducer';
import ActionButton from './ActionButton';
import NumberButton from './NumberButton';
import { ACTIONS } from '../App.actions';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { useReducer } from 'react';
import Preview from './Preview';
import Result from './Result';
import './Calculator.css';

const Calculator = () => {
  const [
    { previousOperand, currentOperand, operation, copied, darkMode },
    dispatch,
  ] = useReducer(reducer, {});

  return (
    <div className={!darkMode ? 'Calculator_dark' : 'Calculator_light'}>
      <Header darkMode={!darkMode} />
      <div className={!darkMode ? 'wrapper_dark' : 'wrapper_light'}>
        <div className='screen'>
          <Preview
            preview={formatOperand(previousOperand)}
            operation={operation}
          />
          <Result result={formatOperand(currentOperand)} />
        </div>
        <div className={!darkMode ? 'buttons_dark' : 'buttons_light'}>
          <ActionButton
            name='AC'
            special={true}
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          />
          <ActionButton
            name='back'
            darkMode={!darkMode}
            onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
          />
          <ActionButton
            name='copy'
            isCopied={copied}
            darkMode={!darkMode}
            onClick={() => dispatch({ type: ACTIONS.COPY })}
          />
          <OperationButton
            operation='÷'
            dispatch={dispatch}
            darkMode={!darkMode}
          />
          <NumberButton digit='7' dispatch={dispatch} darkMode={!darkMode} />
          <NumberButton digit='8' dispatch={dispatch} darkMode={!darkMode} />
          <NumberButton digit='9' dispatch={dispatch} darkMode={!darkMode} />
          <OperationButton
            operation='×'
            dispatch={dispatch}
            darkMode={!darkMode}
          />
          <NumberButton digit='4' dispatch={dispatch} darkMode={!darkMode} />
          <NumberButton digit='5' dispatch={dispatch} darkMode={!darkMode} />
          <NumberButton digit='6' dispatch={dispatch} darkMode={!darkMode} />
          <OperationButton
            operation='-'
            dispatch={dispatch}
            darkMode={!darkMode}
          />
          <NumberButton digit='1' dispatch={dispatch} darkMode={!darkMode} />
          <NumberButton digit='2' dispatch={dispatch} darkMode={!darkMode} />
          <NumberButton digit='3' dispatch={dispatch} darkMode={!darkMode} />
          <OperationButton
            operation='+'
            dispatch={dispatch}
            darkMode={!darkMode}
          />
          <NumberButton digit='.' dispatch={dispatch} darkMode={!darkMode} />
          <NumberButton digit='0' dispatch={dispatch} darkMode={!darkMode} />
          <LightModeButton
            darkMode={!darkMode}
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
      <Footer darkMode={!darkMode} />
    </div>
  );
};

export default Calculator;
