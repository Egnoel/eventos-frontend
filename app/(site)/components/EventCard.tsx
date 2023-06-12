'use client';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Event, fetchWrapper } from '@/app/functions/fetch';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

const EventCard: React.FC<{ event: Event }> = ({
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
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = useCallback(async () => {
    console.log(id);
    try {
      await fetchWrapper(`user/favorites/${id}`, {
        method: 'POST',
      });
      setIsFavorite(true);
      toast.success('Evento adicionado aos favoritos!');
    } catch (error: any) {
      console.log(error.response.data); // Tratamento de erros, se necessário
      toast.error('Ocorreu um erro ao adicionar o evento aos favoritos.');
    }
  }, [id]);

  const handleRemoveFavoriteClick = useCallback(async () => {
    console.log(id);
    try {
      await fetchWrapper(`user/favorites/${id}`, {
        method: 'DELETE',
      });
      setIsFavorite(false);
      toast.success('Evento removido dos favoritos!');
    } catch (error: any) {
      console.log(error.response.data); // Tratamento de erros, se necessário
      toast.error('Ocorreu um erro ao remover o evento dos favoritos.');
    }
  }, [id]);
  return (
    <div className="flex flex-row w-full gap-12 px-5 py-5 bg-white border border-white shadow-xl rounded-xl hover:shadow-2xl h-[180px]">
      <div className="relative">
        <div className="w-[200px] h-[150px]">
          <Image
            src={eventpic}
            alt="Event"
            className="object-fill rounded-xl"
            fill
          />
        </div>

        <div className="absolute top-1/3 left-[-50px] bg-red-400 text-center rounded-xl w-[90px] text-white">
          <p className="text-sm font-light"> {eventDate} </p>
          <p> {eventTime} </p>
        </div>
      </div>
      <div className="flex flex-col flex-wrap w-[700px] gap-4">
        <h2 className="font-bold">{title}</h2>
        <p className="text-sm font-light text-gray-400">{description}</p>
        <div className="flex flex-row items-center gap-3">
          <p>{creator.firstName}</p> {id}
          <p>{creator.lastName}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-end  w-[125px] relative ml-6">
        <div className="absolute top-1 right-1">
          {isFavorite ? (
            <HeartIcon
              className="w-6 h-6 text-red-500 cursor-pointer"
              onClick={handleRemoveFavoriteClick}
            />
          ) : (
            <HeartIcon
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={handleFavoriteClick}
            />
          )}
        </div>
        <div className="flex flex-col text-center">
          <button
            className="w-24 h-8 text-white bg-red-400 rounded-xl "
            type="button"
          >
            Saiba Mais
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
