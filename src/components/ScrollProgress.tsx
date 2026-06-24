'use client';
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setWidth((el.scrollTop / (el.scrollHeight - window.innerHeight)) * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{ width: `${width}%`, background: 'var(--stone-2)' }}
      className="fixed top-0 left-0 h-[2px] z-[9999] transition-[width] duration-75"
    />
  );
}
