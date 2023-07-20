'use client'
import React, { useEffect, useState, useRef } from 'react';
import { isBrowser } from 'react-device-detect';
import { useParams } from 'next/navigation'
import io from 'socket.io-client';
import ReactPlayer from 'react-player/lazy'
import ReactHlsPlayer from 'react-hls-player';
import { fetchWrapper } from '@/app/functions/fetch';
import { useRouter } from 'next/navigation'

const Room = () => {
  const params = useParams()
  const { roomId } = params
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null);
  const [url,setUrl] = useState('')


  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (roomId) {
      const socket = io('http://localhost:8000');
      socket.emit('joinRoom', roomId as string);

      socket.on('messageReceived', (message: string) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [roomId]);

  useEffect(() => {
    setUrl(`http://localhost:8080/live/${roomId}/index.m3u8`)
  }, []);
  

  const sendMessage = () => {
    if (roomId && newMessage) {
      const socket = io('http://localhost:8000');
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
      router.push(`/${roomId}`);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-row w-full h-full gap-5 px-5 py-5'>
      <div className='w-4/5 bg-slate-500'>
      <ReactHlsPlayer playerRef={videoRef} src={url} autoPlay controls />
        
      </div>
     
      <div className='w-1/5 bg-slate-300'>
        <div className='flex flex-col w-full h-full gap-2 px-3 py-2'>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div className='flex flex-col items-center justify-center py-2'>
          <input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder='Digite sua mensagem...'
          />
          <button type='button' onClick={sendMessage}>
            Enviar
          </button>
        </div>
      </div>
      <button type='button' onClick={handleStopTransmission}>Stop</button>
    </div>
  );
};

export default Room;
