import React, { useState, useEffect } from 'react';

interface CountdownProps {
  eventDate: string;
  eventTime: string;
}

const Countdown: React.FC<CountdownProps> = ({ eventDate, eventTime }) => {
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const eventDateTime = new Date(`${eventDate} ${eventTime}`).getTime();
      const distance = eventDateTime - now;

      if (distance < 0) {
        // Evento já ocorreu
        clearInterval(interval);
        setCountdown('Evento concluído');
      } else {
        // Calcula o tempo restante
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(
          `${days}d ${hours}h ${minutes}m ${seconds}s`
        );
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [eventDate, eventTime]);

  return <div>{countdown}</div>;
};

export default Countdown;
