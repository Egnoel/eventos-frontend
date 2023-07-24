'use client'
import React, { useEffect, useState, useRef } from 'react';
import { isBrowser } from 'react-device-detect';
import { useParams } from 'next/navigation'
import io, {Socket} from 'socket.io-client';
import ReactPlayer from 'react-player/lazy'
import ReactHlsPlayer from 'react-hls-player';
import { User, fetchWrapper } from '@/app/functions/fetch';
import { useRouter } from 'next/navigation'
import Image from 'next/image';

const Room = () => {
  const params = useParams()
  const { roomId } = params
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null);
  const [url,setUrl] = useState('')
  const [user, setUser] = useState<User>();
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (roomId) {
      const newSocket = io('http://localhost:8000');
      setSocket(newSocket);

      newSocket.on('messageReceived', (message: string) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      newSocket.on('transmissionStopped', () => {
        router.push(`/${roomId}`);
      });

      // Apenas adicionamos o socket à sala quando o componente é montado
      newSocket.emit('joinRoom', roomId as string);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [roomId]);

  useEffect(() => {
    setUrl(`http://localhost:8080/live/${roomId}/index.m3u8`);
    
  }, [url]);
  

  useEffect(() => {
    const userString: string | null = localStorage.getItem('user');
    if (userString) {
      const parsedUser: User = JSON.parse(userString);
      setUser(parsedUser);
      console.log(parsedUser)
    }
  }, []);

  const sendMessage = () => {
    if (socket && roomId && newMessage) {
      // Usamos o socket que já foi criado anteriormente
      socket.emit('sendMessage', roomId as string, newMessage);
      setNewMessage('');
    }
  };
  const hlsPlayerProps = {
    src: `http://localhost:8080/live/${roomId}/index.m3u8`,
    autoPlay: true,
    playerRef: videoRef,
  };
  
  const handleStopTransmission = async() => {     
    try {
      await fetchWrapper<String>(`events/stopLive/${roomId}`, {method: 'POST'})
      if (socket) {
        socket.emit("stopTransmission", roomId as string); // Envia o evento de interrupção da transmissão para o servidor
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className='relative flex flex-row w-full h-full gap-5 px-5 py-5 mt-2'>
      <div className='w-4/5 bg-slate-500'>
      <ReactHlsPlayer playerRef={videoRef} src={url} autoPlay controls width={'100%'} muted />
        
      </div>
     
      <div className='w-1/5 bg-slate-300 max-h-[490px]  '>
        <div className='flex flex-col w-full h-full gap-2 px-3 py-2 overflow-auto'>
          {messages.map((message, index) => (
             <div key={index} className='flex flex-row items-center'>
             <div className='mr-2'>
               <Image
                 src={user? user.pic : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
                 alt="Sender Profile"
                 width={20}
                 height={20}
                 className='rounded-full'
               />
             </div>
             <div className='flex flex-col'>
               <p className='font-bold'>
                {user? `${user.firstName} ${user.lastName}` : ""}
               </p>
               <p>{message}</p>
             </div>
           </div>
          ))}
        </div>
        <div className='flex flex-row items-center justify-center gap-2 py-2'>
          <input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder='Digite sua mensagem...'
            className='rounded-md outline-none'
          />
          <button type='button' onClick={sendMessage}>
            Enviar
          </button>
        </div>
      </div>
     {
      user && user.createdEvents && user.createdEvents.includes(roomId) &&  <button type='button' onClick={handleStopTransmission} className='absolute top-[-15px] right-0 w-36 h-8 text-white bg-red-400 rounded-xl z-10' >Stop Transmission</button>
     }
    </div>
  );
};

export default Room;
