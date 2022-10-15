import { PreviewTypes } from '../types/App.types';
import './Preview.css';

const preview = ({ preview, operation }: PreviewTypes) => {
  return (
    <div className='preview'>
      <div className='number'>{preview}</div>
      <div className='operator' style={preview ? { marginLeft: '10px' } : {}}>
        {operation}
      </div>
    </div>
  );
};

export default preview;
