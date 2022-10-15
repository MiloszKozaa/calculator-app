import { ResultTypes } from '../types/App.types';
import './Result.css'

const Result = ({ result }: ResultTypes) => {
  return <div className='result'>{result}</div>;
};

export default Result;
