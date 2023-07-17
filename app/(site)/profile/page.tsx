'use client';
import Avatar from './Avatar';
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MyEvents from './MyEvents';
import CreateEvent from './CreateEvent';
import { User, fetchWrapper } from '@/app/functions/fetch';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const params = useSearchParams();
  const [selectedTab1, setSelectedTab1] = useState(true);
  const [selectedTab2, setSelectedTab2] = useState(false);

  const tab1 = useCallback(() => {
    setSelectedTab1(true);
    setSelectedTab2(false);

  }, []);

  const tab2 = useCallback(() => {
    setSelectedTab1(false);
    setSelectedTab2(true);

  }, []);


  useEffect(() => {
    if (params.get('tab') === 'novo') {
      tab2();
    } else if (params.get('tab') === 'my') {
      tab1();
    }
  }, [params, tab2]);

  const getUser = async ()=>{
    const user = await fetchWrapper<User>('user/user');
    setUser(user);
  }

  useEffect(() => {
    getUser();
  },[]);

  return (
    <div className="flex flex-row items-center gap-10 px-10 py-10">
      {user && (<Avatar user={user} />)}
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
            Novo
          </p>
        </div>
        {selectedTab1 && (
          <div id="my">
            <MyEvents page="created" />
          </div>
        )}
       
        {selectedTab2 && (
          <div id="novo">
            <CreateEvent />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
