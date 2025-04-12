import { useState } from 'react';
import CloseIcon from '../icons/header/CloseIcon';

export default function SessionAlert({ session }) {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className='fixed top-4 left-4 z-50'>
      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          className='bg-blue-600 text-white px-3 py-2 rounded-full shadow-lg text-sm font-semibold hover:bg-blue-500 transition'
        >
          {session.toUpperCase()}
        </button>
      ) : (
        <div className='bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg max-w-xs'>
          <div className='flex items-start justify-between'>
            <div>
              <p className='font-semibold'>Current Session</p>
              <p className='text-sm'>{session}</p>
            </div>
            <button
              className='ml-4 font-bold text-white hover:text-gray-200 cursor-pointer'
              onClick={() => setMinimized(true)}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
