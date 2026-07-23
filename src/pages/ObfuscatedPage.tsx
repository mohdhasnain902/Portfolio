import { useEffect, useRef } from 'react';
import { initObfuscated } from '../components/loading-splash/obfuscatedBoot';

const ObfuscatedPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.width = canvas.clientWidth || window.innerWidth;
      canvas.height = canvas.clientHeight || window.innerHeight;
      initObfuscated(canvas);
    } catch (e) {
      console.error('[OBFUSCATED_PAGE_ERROR]', e);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'crosshair',
      }}
    />
  );
};

export default ObfuscatedPage;
