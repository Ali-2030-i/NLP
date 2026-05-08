import React, { useEffect, useRef } from 'react';

export default function DataStreamBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'_(),.;:?!\\|{}<>[]^~';
    const charArray = chars.split('');
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    let lastTime = 0;
    const interval = 50;

    const draw = (time) => {
      if (time - lastTime > interval) {
        ctx.fillStyle = 'rgba(2, 6, 23, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text = charArray[Math.floor(Math.random() * charArray.length)];
          
          if (Math.random() > 0.5) {
              ctx.fillStyle = 'rgba(99, 102, 241, 0.08)';
          } else {
              ctx.fillStyle = 'rgba(34, 211, 238, 0.08)';
          }

          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ backgroundColor: '#020617' }}
    />
  );
}
