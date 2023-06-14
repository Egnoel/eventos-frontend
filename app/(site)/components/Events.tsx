'use client';
import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { Event, User, fetchWrapper } from '@/app/functions/fetch';
import axios from 'axios';
import { toast } from 'react-toastify';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>();

  const getEvents = async () => {
    const data = await fetchWrapper<Event[]>('events/');

    setEvents(data);
  };

  const handleFavoriteClick = async (eventId: string) => {
    if (user) {
      try {
        const { data } = await axios.post(
          `http://localhost:8000/api/user/favorites/${eventId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));

        console.log(data);
        toast.success('Evento adicionado aos favoritos!');
      } catch (error: any) {
        console.log(error);
        toast.error('Ocorreu um erro ao adicionar o evento aos favoritos.');
      }
    }
  };

  const handleRemoveFavoriteClick = async (eventId: string) => {
    if (user) {
      try {
        await axios.delete(
          `http://localhost:8000/api/user/favorites/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const updatedUser = {
          ...user,
          favorites: user.favorites.filter((id) => id !== eventId),
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success('Evento removido dos favoritos!');
      } catch (error: any) {
        console.log(error);
        toast.error('Ocorreu um erro ao remover o evento dos favoritos.');
      }
    }
  };

  useEffect(() => {
    const userString: string | null = localStorage.getItem('user');
    if (userString) {
      const parsedUser: User = JSON.parse(userString);
      setUser(parsedUser);
      console.log(parsedUser);
    }
  }, []);

  useEffect(() => {
    getEvents();
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  return (
    <div className="flex flex-col h-full gap-4 py-10 pl-10 pr-10 bg-white rounded-xl">
      <p className="text-lg font-bold text-black">Eventos Recentes</p>
      <div className="flex flex-col gap-3">
        {token &&
          events.map((event, key) => (
            <EventCard
              key={key}
              event={event}
              user={user || undefined}
              onFavoriteClick={handleFavoriteClick}
              onRemoveFavoriteClick={handleRemoveFavoriteClick}
            />
          ))}
      </div>
    </div>
  );
};

export default Events;
