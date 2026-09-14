import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window) {
      return;
    }

    let targetX = -100;
    let targetY = -100;
    let currentRingX = -100;
    let currentRingY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const updateRing = () => {
      currentRingX += (targetX - currentRingX) * 0.16;
      currentRingY += (targetY - currentRingY) * 0.16;
      setRingPos({ x: currentRingX, y: currentRingY });
      animId = requestAnimationFrame(updateRing);
    };

    animId = requestAnimationFrame(updateRing);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const checkHover = () => {
      const interactiveEls = document.querySelectorAll(
        'a, button, input, textarea, .work-card, .hscroll-card, .stat-card, [role="button"]'
      );
      interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    checkHover();
    const observer = new MutationObserver(checkHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      observer.disconnect();
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference bg-white transition-transform duration-100 ease-out ${
          isHovering ? 'w-4 h-4 -translate-x-2 -translate-y-2' : 'w-2 h-2 -translate-x-1 -translate-y-1'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
        aria-hidden="true"
      />
      {/* Outer trailing ring */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full mix-blend-difference border border-white/60 transition-all duration-300 ease-out ${
          isHovering
            ? 'w-16 h-16 border-violet-400 scale-110 bg-violet-500/10'
            : 'w-10 h-10 border-white/40 scale-100'
        }`}
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`,
        }}
        aria-hidden="true"
      />
    </>
  );
}
