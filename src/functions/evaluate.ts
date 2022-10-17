export const evaluate = ({ previousOperand, currentOperand, operation }: any) => {
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