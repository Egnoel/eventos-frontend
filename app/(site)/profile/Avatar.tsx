import React from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

const Avatar = () => {
  return (
    <div className="relative flex flex-col w-1/5 px-5 py-5 bg-white rounded-xl">
      <div className="absolute cursor-pointer top-3 right-3">
        <PencilIcon className="w-5 h-5 text-blue-500" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Image
          src="https://avatars.githubusercontent.com/u/70013986?s=400&u=ea2030c9484b35b134c82ea42c394a8d34c91566&v=4"
          alt="user avatar"
          className="object-cover rounded-full "
          width="150"
          height={'150'}
        />
        <p className="font-semibold">@egnoel</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span>Egnoel</span>
        <span>egnoel@hotmail.com</span>
      </div>
      <div className="flex justify-end mt-4">
        <button>SignOut</button>
      </div>
    </div>
  );
};

export default Avatar;
