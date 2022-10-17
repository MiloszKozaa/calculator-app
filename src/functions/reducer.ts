import { ACTIONS } from '../App.actions';
import { evaluate } from './evaluate';

export const reducer = (state: any, { type, payload }: any) => {
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
      if (payload.digit === '.' && !state.currentOperand) {
        return {
          ...state,
          currentOperand: `0${payload.digit}`,
        };
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
      return {
        darkMode: state.darkMode,
      };
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
