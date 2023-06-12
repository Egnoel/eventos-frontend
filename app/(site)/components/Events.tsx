'use client';
import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { Event, fetchWrapper } from '@/app/functions/fetch';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const getEvents = async () => {
    const data = await fetchWrapper<Event[]>('events/');

    setEvents(data);
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div className="flex flex-col h-full gap-4 py-10 pl-10 pr-10 bg-white rounded-xl">
      <p className="text-lg font-bold text-black">Eventos Recentes</p>
      <div className="flex flex-col gap-3">
        {events.map((event, key) => (
          <EventCard key={key} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
