'use client';
import { useEffect, useRef, ReactNode, CSSProperties } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: 0 | 1 | 2 | 3 | 4;
}

const delayMap: Record<number, string> = {
  0: '',
  1: 'reveal-delay-1',
  2: 'reveal-delay-2',
  3: 'reveal-delay-3',
  4: 'reveal-delay-4',
};

export default function ScrollReveal({ children, className = '', style, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={style}
      className={`reveal ${delayMap[delay]} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
