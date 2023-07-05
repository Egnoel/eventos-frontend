'use client';
import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { Event, User, UserProps, fetchWrapper } from '@/app/functions/fetch';
import axios from 'axios';
import { toast } from 'react-toastify';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>();

  const getEvents = async () => {
    if (token) {
      const data = await fetchWrapper<Event[]>('events/');
      setEvents(data);
      console.log(data);
    } 
  };

  const handleFavoriteClick = async (eventId: string) => {
    if (user) {
      try {
        const {user, message} = await fetchWrapper<UserProps>(`user/addFav/${eventId}`, {
          method: 'PUT',
        });
        if(user._id !== user._id){
          throw new Error("Invalid user data");
        }
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));

        console.log(user);
        console.log(message);
      } catch (error: any) {
        console.log(error);
        console.log('Ocorreu um erro ao adicionar o evento aos favoritos.');
      }
    }
  };

  const handleRemoveFavoriteClick = async (eventId: string) => {
    if (user) {
      try {
        const {user, message} = await fetchWrapper<UserProps>(`user/removeFav/${eventId}`, {
          method: 'PUT',
        });
        if(user._id !== user._id){
          throw new Error("Invalid user data");
        }
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));

        console.log(user);
        console.log(message);
      } catch (error: any) {
        console.log(error);
        console.log('Ocorreu um erro ao remover o evento dos favoritos.');
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
  }, [token, user]);
  
  useEffect(() => {
    const storedToken: string | null = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      console.log(storedToken);
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
