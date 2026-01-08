import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  floatOffsetX: number;
  floatOffsetY: number;
  floatSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function InteractiveStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);

  const lastSizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize last size
    lastSizeRef.current = { w: window.innerWidth, h: window.innerHeight };

    const updateCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Prevent divide by zero or scaling on first run if not needed
      if (lastSizeRef.current.w === 0 || lastSizeRef.current.h === 0) {
        lastSizeRef.current = { w: width, h: height };
      }

      const scaleX = width / lastSizeRef.current.w;
      const scaleY = height / lastSizeRef.current.h;

      canvas.width = width;
      canvas.height = height;

      // Rescale stars proportionally to maintain distribution
      starsRef.current.forEach(star => {
        star.x *= scaleX;
        star.y *= scaleY;
        star.originalX *= scaleX;
        star.originalY *= scaleY;
      });

      lastSizeRef.current = { w: width, h: height };
    };

    // Initial resize to set canvas attributes
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize stars with original positions
    // Reduce star count on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 60 : 120;
    starsRef.current = Array.from({ length: starCount }, () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x,
        y,
        originalX: x,
        originalY: y,
        vx: 0,
        vy: 0,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        floatOffsetX: 0,
        floatOffsetY: 0,
        floatSpeed: Math.random() * 0.003 + 0.001,
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateCanvasSize);

    let time = 0;

    const animate = () => {
      time++;

      // Pure black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- Background Stars ---
      const repelDistance = 150;
      const repelAmount = 30;

      starsRef.current.forEach((star, index) => {
        // Autonomous floating animation
        star.floatOffsetX = Math.sin(time * star.floatSpeed + index) * 0.8;
        star.floatOffsetY = Math.cos(time * star.floatSpeed * 0.8 + index) * 0.8;

        // Calculate target position
        let targetX = star.originalX + star.floatOffsetX;
        let targetY = star.originalY + star.floatOffsetY;

        // Mouse interaction
        const dx = targetX - mouseRef.current.x;
        const dy = targetY - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repelDistance && distance > 0) {
          const pushStrength = (repelDistance - distance) / repelDistance;
          const angle = Math.atan2(dy, dx);
          targetX += Math.cos(angle) * repelAmount * pushStrength;
          targetY += Math.sin(angle) * repelAmount * pushStrength;
        }

        // Smoothly move towards target position - very slow for no bouncing
        const smoothing = 0.01; // Reduced from 0.02 for even smoother movement
        star.x += (targetX - star.x) * smoothing;
        star.y += (targetY - star.y) * smoothing;

        // Wrap around screen
        if (star.x < -10) star.x = canvas.width + 10;
        if (star.x > canvas.width + 10) star.x = -10;
        if (star.y < -10) star.y = canvas.height + 10;
        if (star.y > canvas.height + 10) star.y = -10;
      });

      // Draw constellation lines between nearby stars
      const connectionDistance = 120;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < starsRef.current.length; i++) {
        for (let j = i + 1; j < starsRef.current.length; j++) {
          const star1 = starsRef.current[i];
          const star2 = starsRef.current[j];

          const dx = star1.x - star2.x;
          const dy = star1.y - star2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.15;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(star1.x, star1.y);
            ctx.lineTo(star2.x, star2.y);
            ctx.stroke();
          }
        }
      }

      // Draw stars
      starsRef.current.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- Shooting Stars ---
      if (Math.random() < 0.003 && shootingStarsRef.current.length < 2) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height * 0.5;
        const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 10 + 15;

        shootingStarsRef.current.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          length: Math.random() * 50 + 50,
          opacity: 0,
          life: 0,
          maxLife: 100
        });
      }

      // Update and draw shooting stars
      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const ss = shootingStarsRef.current[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life++;

        // Fade in then out
        if (ss.life < 10) {
          ss.opacity = ss.life / 10;
        } else if (ss.life > ss.maxLife - 20) {
          ss.opacity = (ss.maxLife - ss.life) / 20;
        }

        // Draw shooting star trail
        const gradient = ctx.createLinearGradient(
          ss.x, ss.y,
          ss.x - ss.vx * (ss.length / 20),
          ss.y - ss.vy * (ss.length / 20)
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx, ss.y - ss.vy);
        ctx.stroke();

        // Remove dead stars
        if (ss.life >= ss.maxLife || ss.x > canvas.width || ss.y > canvas.height) {
          shootingStarsRef.current.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
