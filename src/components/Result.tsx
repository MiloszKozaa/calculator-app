import { ResultTypes } from '../types/App.types';
import './Result.css';

const Result = ({ result }: ResultTypes) => {
  return (
    <div
      className='result'
      style={
        result && result.length > 20
          ? { fontSize: '20px' }
          : result && result.length > 15
          ? { fontSize: '25px' }
          : {}
      }>
      {result}
    </div>
  );
};

export default Result;
