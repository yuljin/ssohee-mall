"use client";

import { useEffect, useMemo, useState } from "react";

type RemainingTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ended: boolean;
};

function getRemainingTime(target: string): RemainingTime {
  const difference = new Date(target).getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  }

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
    ended: false,
  };
}

export function Countdown({ target }: { target: string }) {
  const initial = useMemo(() => getRemainingTime(target), [target]);
  const [remaining, setRemaining] = useState(initial);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(getRemainingTime(target));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [target]);

  if (remaining.ended) {
    return <p className="countdown-ended">이번 드롭이 마감되었습니다.</p>;
  }

  return (
    <div className="countdown" aria-label="주문 마감까지 남은 시간">
      <TimeUnit value={remaining.days} label="일" />
      <span className="time-divider">:</span>
      <TimeUnit value={remaining.hours} label="시간" />
      <span className="time-divider">:</span>
      <TimeUnit value={remaining.minutes} label="분" />
      <span className="time-divider">:</span>
      <TimeUnit value={remaining.seconds} label="초" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <span className="time-unit">
      <strong>{String(value).padStart(2, "0")}</strong>
      <small>{label}</small>
    </span>
  );
}
