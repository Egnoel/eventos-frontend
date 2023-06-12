import { MusicalNoteIcon } from '@heroicons/react/24/solid';

const Categories = () => {
  return (
    <div className="flex flex-row items-center w-[200px] px-3  gap-2 justify-start bg-white rounded-xl">
      <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
        <MusicalNoteIcon className="w-6 h-6 " />
      </div>
      <div>
        <p className="text-xs text-gray-200">7 Eventos</p>
        <span className="text-lg font-bold">Pop</span>
      </div>
    </div>
  );
};

export default Categories;
