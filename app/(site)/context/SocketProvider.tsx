'use client';

import React, {
  createContext,
  useMemo,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const socketContext = createContext({});

export const useSocket = () => {
  const socket = useContext(socketContext);
  return socket;
};

export const SocketProvider = (props: { children?: ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
    }
  }, []);
  const socket: Socket = useMemo(() => io('http://localhost:8000'), []);
  return (
    <socketContext.Provider value={socket}>
      {props.children}
    </socketContext.Provider>
  );
};
