import { useState } from 'react';
import CloseIcon from '../icons/header/CloseIcon';

export default function ServerAlert() {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className='fixed top-4 right-4 z-50'>
      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          className='bg-red-600 text-white px-3 py-2 rounded-full shadow-lg text-sm font-semibold hover:bg-red-500 transition'
        >
          Server Offline
        </button>
      ) : (
        <div className='bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg max-w-xs'>
          <div className='flex items-start justify-between'>
            <div>
              <p className='font-semibold'>Server Disconnected</p>
              <p className='text-sm'>The server is currently unreachable.</p>
              <p className='text-sm'>Try to refresh the browser.</p>
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
