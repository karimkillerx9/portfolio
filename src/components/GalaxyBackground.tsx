import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  baseOpacity: number;
  vx: number;
  vy: number;
  twinkleSpeed: number;
  twinklePhase: number;
  parallaxDepth: number;
  baseX: number;
  baseY: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  life: number;
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const shootingStarsRef = useRef<ShootingStar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const stars: Star[] = [];
    const starCount = 800;

    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const parallaxDepth = Math.random() * 0.8 + 0.2;

      stars.push({
        x,
        y,
        radius: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.4 + 0.2,
        baseOpacity: Math.random() * 0.4 + 0.2,
        vx: 0,
        vy: 0,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        parallaxDepth,
        baseX: x,
        baseY: y,
      });
    }

    let animationFrameId: number;
    let scrollY = window.scrollY;
    let time = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + scrollY };
    };

    const createShootingStar = () => {
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * (canvas.height * 0.6);
      const speed = Math.random() * 8 + 10;
      const angle = Math.random() * 0.4 + 0.2;

      shootingStarsRef.current.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: Math.random() * 60 + 40,
        opacity: 1,
        life: 1,
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    const drawGradientBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0e27');
      gradient.addColorStop(0.3, '#1a1f3a');
      gradient.addColorStop(0.6, '#0f1425');
      gradient.addColorStop(1, '#020610');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const radialGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 3,
        0,
        canvas.width / 2,
        canvas.height / 3,
        Math.max(canvas.width, canvas.height) * 0.8
      );
      radialGradient.addColorStop(0, 'rgba(139, 92, 246, 0.08)');
      radialGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      time++;

      drawGradientBackground();

      const mouseInfluence = 0.15;

      stars.forEach((star, index) => {
        const mouseDx = (mouseRef.current.x - star.x) * mouseInfluence * 0.001;
        const mouseDy = (mouseRef.current.y - star.y) * mouseInfluence * 0.001;

        const driftX = Math.sin(time * 0.0002 + index) * 0.3 * star.parallaxDepth;
        const driftY = Math.cos(time * 0.00015 + index * 0.5) * 0.2 * star.parallaxDepth;

        star.x = star.baseX + driftX + mouseDx * 50;
        star.y = star.baseY + driftY + mouseDy * 50;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.4 + 0.6;
        star.opacity = star.baseOpacity * twinkle;

        const screenY = star.y - scrollY * star.parallaxDepth;
        if (screenY < -50 || screenY > window.innerHeight + 50) return;

        const glow = ctx.createRadialGradient(
          star.x,
          screenY,
          0,
          star.x,
          screenY,
          star.radius * 3
        );
        glow.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.8})`);
        glow.addColorStop(0.4, `rgba(200, 180, 255, ${star.opacity * 0.4})`);
        glow.addColorStop(1, 'rgba(168, 85, 247, 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(star.x, screenY, star.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, screenY, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      if (Math.random() < 0.003) {
        createShootingStar();
      }

      shootingStarsRef.current.forEach((shootingStar, index) => {
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;
        shootingStar.life -= 0.02;
        shootingStar.opacity = shootingStar.life;

        if (shootingStar.life <= 0) {
          shootingStarsRef.current.splice(index, 1);
          return;
        }

        const screenY = shootingStar.y - scrollY;
        if (screenY < -100 || screenY > window.innerHeight + 100) {
          shootingStarsRef.current.splice(index, 1);
          return;
        }

        const gradient = ctx.createLinearGradient(
          shootingStar.x,
          screenY,
          shootingStar.x - shootingStar.vx * shootingStar.length,
          screenY - shootingStar.vy * shootingStar.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
        gradient.addColorStop(0.5, `rgba(168, 85, 247, ${shootingStar.opacity * 0.6})`);
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, screenY);
        ctx.lineTo(
          shootingStar.x - shootingStar.vx * shootingStar.length,
          screenY - shootingStar.vy * shootingStar.length
        );
        ctx.stroke();

        const glowGradient = ctx.createRadialGradient(
          shootingStar.x,
          screenY,
          0,
          shootingStar.x,
          screenY,
          8
        );
        glowGradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity * 0.8})`);
        glowGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(shootingStar.x, screenY, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full pointer-events-none"
      style={{ zIndex: 0, height: '100vh' }}
    />
  );
}
