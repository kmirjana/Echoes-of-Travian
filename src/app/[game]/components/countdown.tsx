import { formatFutureTimestamp } from 'app/utils/time';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

type CountdownProps = {
  endsAt: number;
  className?: string;
};

export const Countdown: React.FC<CountdownProps> = ({ endsAt, className }) => {
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
    }
    intervalId.current = setInterval(() => {
      setFormattedTime(formatFutureTimestamp(endsAt));
    }, 1000);

    return () => {
      clearInterval(intervalId.current!);
    };
  }, [endsAt]);

  return <span className={className}>{formattedTime}</span>;
};
