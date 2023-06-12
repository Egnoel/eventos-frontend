'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const CreateEventBanner = () => {
  const route = useRouter();
  return (
    <div className="flex flex-col gap-5 px-4 py-4 bg-white rounded-xl h-[350px] items-center">
      <h1 className="text-2xl font-bold">Quer criar um evento?</h1>

      <button
        className="w-24 h-8 text-white bg-red-400 rounded-xl"
        onClick={() => {
          route.push('/profile?tab=novo');
        }}
      >
        Saiba Como
      </button>

      <Image
        src={'/images/undraw_online_wishes_dlmr.svg'}
        alt="Event"
        width={200}
        height={100}
        className="object-cover rounded-xl"
      />
    </div>
  );
};

export default CreateEventBanner;
