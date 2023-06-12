'use clint';
import { fetchWrapper } from '@/app/functions/fetch';
import Event from './Event';
import { useState, useEffect } from 'react';

const MyEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const getEvents = async () => {
    const data = await fetchWrapper<Event[]>('events/');

    setEvents(data);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="flex flex-row flex-wrap w-full gap-10">
      {events.map((event, key) => (
        <Event key={key} event={event} />
      ))}
    </div>
  );
};

export default MyEvents;
