"use client"
import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className='absolute top-4 left-4 text-center text-5xl font-semibold'>
      <h2>{time.toLocaleTimeString()}</h2>
    </div>
  );
};

export default Clock;