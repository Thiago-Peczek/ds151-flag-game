import { useState, useEffect } from 'react';

export function useCronometro(segundosIniciais, onZero) {
  const [tempo, setTempo] = useState(segundosIniciais);

  useEffect(() => {
    if (tempo <= 0) {
      if (onZero) onZero();
      return;
    }
    const intervalo = setInterval(() => setTempo((t) => t - 1), 1000);
    return () => clearInterval(intervalo);
  }, [tempo, onZero]);

  return tempo;
}
