'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation'
import io from 'socket.io-client';
import Hls from 'hls.js';
import ReactHlsPlayer from 'react-hls-player';
import { fetchWrapper } from '@/app/functions/fetch';
import { useRouter } from 'next/navigation'

const Room = () => {
  const params = useParams()
  const { roomId } = params
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hls, setHls] = useState<Hls | null>(null);

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

  const initializeHls = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (Hls.isSupported()) {
        const newHls = new Hls();
        newHls.attachMedia(video);
        newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
          newHls.loadSource(`http://localhost:8080/live/${roomId}.flv`);
        });
        setHls(newHls);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = `http://localhost:8080/live/${roomId}.flv`;
      }
    }
  };

  useEffect(() => {
    initializeHls();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  const sendMessage = () => {
    if (roomId && newMessage) {
      const socket = io('http://localhost:8000');
      socket.emit('sendMessage', roomId as string, newMessage);
      setNewMessage('');
    }
  };
  const hlsPlayerProps = {
    src: `http://localhost:8080/live/${roomId}.flv`,
    autoPlay: true,
    playerRef: videoRef,
  };
  const handleStopTransmission = async() => {     
    try {
      await fetchWrapper<String>(`events/startLive/${roomId}`, {})
      router.push(`/${roomId}`);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-row w-full h-full gap-5 px-5 py-5'>
      <div className='w-4/5 bg-slate-500'>
        {hls ? (
          <video ref={videoRef} controls />
        ) : (
          <ReactHlsPlayer {...hlsPlayerProps} />
        )}
         <button type='button' onClick={handleStopTransmission}>Stop</button>
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
      b</div>
    </div>
  );
};

export default Room;
