import React from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { User } from '@/app/functions/fetch';

const Avatar:React.FC<{user:User}> = ({user:{
  firstName,_id,createdEvents,lastName,email,favorites,pic,signedEvents
}}) => {
  return (
    <div className="relative flex flex-col w-1/5 px-5 py-5 bg-white rounded-xl">
      <div className="absolute cursor-pointer top-3 right-3">
        <PencilIcon className="w-5 h-5 text-blue-500" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Image
          src={pic}
          alt="user avatar"
          className="object-cover rounded-full "
          width="150"
          height={'150'}
        />
        <p className="font-semibold">@{firstName.toLowerCase()}</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span>{firstName} {lastName}</span>
        <span>{email}</span>
      </div>
      <div className="flex justify-end mt-4">
        <button>SignOut</button>
      </div>
    </div>
  );
};

export default Avatar;
