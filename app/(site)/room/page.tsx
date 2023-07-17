import React from 'react';

const Room = () => {
  return <div className='flex flex-row w-full h-full gap-5 px-5 py-5'>
    <div className='w-4/5 bg-slate-500'>Player</div>
    <div className='w-1/5 bg-slate-300'>Chat</div>
  </div>;
};

export default Room;
