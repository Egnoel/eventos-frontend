import { HeartIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Event, fetchWrapper } from '@/app/functions/fetch';

const Event: React.FC<{ event: Event }> = ({
  event: {
    category,
    creator,
    description,
    eventDate,
    eventTime,
    eventpic,
    id,
    title,
  },
}) => {
  return (
    <div
      style={{ backgroundImage: `url(${eventpic})` }}
      className="flex flex-col px-5 py-5 justify-between h-[350px] w-[270px] rounded-xl bg-no-repeat bg-cover bg-center  bg-fixed"
    >
      <div className="flex flex-row justify-between">
        <div className="flex items-center justify-center w-20 h-8 text-white bg-red-400 rounded-xl ">
          {category}
        </div>
        <div className="flex flex-row items-center gap-6 ">
          <div className="flex items-center justify-center w-8 h-8 bg-red-400 rounded-full">
            <TrashIcon className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center justify-center w-8 h-8 bg-red-400 rounded-full">
            <PencilIcon className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-2 py-2 bg-white rounded-xl">
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-sm font-light text-gray-400">
          {creator.firstName} {creator.lastName}
        </div>
        <div className="text-sm font-light text-gray-400">
          {eventDate} {eventTime}{' '}
        </div>
      </div>
    </div>
  );
};

export default Event;
