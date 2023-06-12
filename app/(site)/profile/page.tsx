'use client';
import Avatar from './Avatar';
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MyEvents from './MyEvents';
import CreateEvent from './CreateEvent';

const Profile = () => {
  const params = useSearchParams();
  const [selectedTab1, setSelectedTab1] = useState(true);
  const [selectedTab2, setSelectedTab2] = useState(false);
  const [selectedTab3, setSelectedTab3] = useState(false);
  const tab1 = useCallback(() => {
    setSelectedTab1(true);
    setSelectedTab2(false);
    setSelectedTab3(false);
  }, []);

  const tab2 = useCallback(() => {
    setSelectedTab1(false);
    setSelectedTab2(true);
    setSelectedTab3(false);
  }, []);
  const tab3 = useCallback(() => {
    setSelectedTab1(false);
    setSelectedTab2(false);
    setSelectedTab3(true);
  }, []);

  useEffect(() => {
    if (params.get('tab') === 'novo') {
      tab3();
    } else if (params.get('tab') === 'my') {
      tab1();
    }
  }, [params, tab3]);

  return (
    <div className="flex flex-row items-center gap-10 px-10 py-10">
      <Avatar />
      <div className="w-4/5 h-[85vh]  rounded-xl flex flex-col px-5 py-5 gap-5">
        <div className="flex flex-row justify-center w-full gap-10 bg-white rounded-xl h-[45px] items-center">
          <p
            className={`${
              selectedTab1 ? 'border-b-[2px] border-red-400' : ''
            } cursor-pointer`}
            onClick={selectedTab1 ? () => {} : tab1}
          >
            Meus Eventos
          </p>
          <p
            className={`${
              selectedTab2 ? 'border-b-[2px] border-red-400' : ''
            } cursor-pointer`}
            onClick={selectedTab2 ? () => {} : tab2}
          >
            Favoritos
          </p>
          <p
            className={`${
              selectedTab3 ? 'border-b-[2px] border-red-400' : ''
            } cursor-pointer`}
            onClick={selectedTab3 ? () => {} : tab3}
          >
            Novo
          </p>
        </div>
        {selectedTab1 && (
          <div id="my">
            <MyEvents />
          </div>
        )}
        {selectedTab2 && <div>Favoritos</div>}
        {selectedTab3 && (
          <div id="novo">
            <CreateEvent />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
