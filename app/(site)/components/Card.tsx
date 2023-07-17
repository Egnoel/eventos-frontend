'use client';

import { Button,Card } from 'flowbite-react';
import Image from 'next/image';
import {  TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Event } from '@/app/functions/fetch';
import React from 'react';

const CardWithDecorativeImage: React.FC<{ event: Event }> = ({
    event: {
      category,
      creator,
      description,
      eventDate,
      eventTime,
      eventpic,
      _id,
      title,
    },
  }) =>{
  return (
   
<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a>
        <img className="rounded-t-lg" src={eventpic} alt="" />
    </a>
    <div className="p-5">
        <a >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> {description}. </p>
        <a href={`/${_id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Saiba Mais
             <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>

  )
}

export default CardWithDecorativeImage

