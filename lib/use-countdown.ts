"use client";

import { useEffect, useState } from "react";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type CountdownState = {
  /** `false` até o primeiro tick no cliente — evita divergência de hidratação. */
  mounted: boolean;
  /** `true` quando a data alvo já passou. */
  finished: boolean;
  timeLeft: TimeLeft;
};

const ZERO: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function diff(target: number): { timeLeft: TimeLeft; finished: boolean } {
  const delta = target - Date.now();

  if (Number.isNaN(target)) return { timeLeft: ZERO, finished: false };
  if (delta <= 0) return { timeLeft: ZERO, finished: true };

  return {
    finished: false,
    timeLeft: {
      days: Math.floor(delta / 86_400_000),
      hours: Math.floor((delta / 3_600_000) % 24),
      minutes: Math.floor((delta / 60_000) % 60),
      seconds: Math.floor((delta / 1_000) % 60),
    },
  };
}

/**
 * Contagem regressiva até `isoDate`.
 *
 * @param isoDate Data alvo em ISO 8601 com fuso, ex.: "2026-09-12T02:22:00-03:00".
 */
export function useCountdown(isoDate: string): CountdownState {
  const [state, setState] = useState<CountdownState>({
    mounted: false,
    finished: false,
    timeLeft: ZERO,
  });

  useEffect(() => {
    const target = new Date(isoDate).getTime();

    if (Number.isNaN(target)) {
      console.warn(
        `[AFTER 702] Data inválida em siteConfig.eventDate: "${isoDate}". ` +
          `Use o formato ISO 8601, ex.: "2026-09-12T02:22:00-03:00".`
      );
      setState({ mounted: true, finished: false, timeLeft: ZERO });
      return;
    }

    const tick = () => setState({ mounted: true, ...diff(target) });

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [isoDate]);

  return state;
}
