import React from 'react';
import Banner from './components/Banner';
import Events from './components/Events';
import Filter from './components/Filter';
import CreateEventBanner from './components/CreateEventBanner';

const Home = () => {
  return (
    <div className="flex flex-row items-center gap-10 px-10 py-10">
      <div className="flex flex-col w-4/5 h-full gap-5">
        <Banner />
        <Events />
      </div>
      <div className="flex flex-col w-1/5 gap-10 ">
        <Filter />
        <CreateEventBanner />
      </div>
    </div>
  );
};

export default Home;
