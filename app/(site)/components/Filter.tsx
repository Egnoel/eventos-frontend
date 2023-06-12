import React from 'react';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/solid';

const Filter = () => {
  return (
    <div className="flex flex-col gap-4 px-4 py-10 bg-white rounded-xl h-[400px]">
      <h1 className="text-xl font-bold">Filter</h1>
      <div className="flex flex-row bg-gray-300 w-full h-[32px] rounded-xl items-center">
        <MagnifyingGlassIcon className="w-5 h-5" />
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-300 outline-none focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-2 text-sm font-light text-gray-400">
        <div className="flex flex-row justify-between">
          <span>C1</span>
          <XCircleIcon className="w-5 h-5 hover:cursor-pointer" />
        </div>
        <div className="flex flex-row justify-between">
          <span>C1</span>
          <XCircleIcon className="w-5 h-5 hover:cursor-pointer" />
        </div>
        <div className="flex flex-row justify-between">
          <span>C1</span>
          <XCircleIcon className="w-5 h-5 hover:cursor-pointer" />
        </div>
        <div className="flex flex-row justify-between">
          <span>C1</span>
          <XCircleIcon className="w-5 h-5 hover:cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button className="w-20 h-8 text-white bg-red-400 rounded-xl">
          Search
        </button>
      </div>
    </div>
  );
};

export default Filter;
