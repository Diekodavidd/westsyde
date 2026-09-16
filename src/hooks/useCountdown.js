import { useEffect, useState } from "react";

function useCountdown() {
  const target = new Date(2026, 8, 26, 19, 0, 0).getTime();

  const getTimeLeft = () => {
    const diff = Math.max(0, target - Date.now());

    return {
      diff,
      days: Math.floor(diff / 86400000),
      hours: Math.floor(diff / 3600000) % 24,
      minutes: Math.floor(diff / 60000) % 60,
      seconds: Math.floor(diff / 1000) % 60,
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
  };

  return {
    showCountdown: timeLeft.diff > 0,
    cdDays: pad(timeLeft.days),
    cdHours: pad(timeLeft.hours),
    cdMins: pad(timeLeft.minutes),
    cdSecs: pad(timeLeft.seconds),
  };
}

export default useCountdown;