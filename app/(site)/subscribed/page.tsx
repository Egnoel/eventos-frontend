'use client'
import React from 'react'
import { fetchWrapper, Event } from '@/app/functions/fetch';
import { useState, useEffect } from 'react';
import CardWithDecorativeImage from '../components/Card';

const page = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const getEvents = async () => {
    const data = await fetchWrapper<Event[]>(`events/registrations`);

    setEvents(data);
    console.log(data);
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div className="flex flex-row flex-wrap w-full gap-10">
    {events.map((event, key) => (
      
      <CardWithDecorativeImage key={key} event={event} />
    ))}
  </div>
  )
}

export default page