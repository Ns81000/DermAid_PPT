import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, AlertTriangle } from 'lucide-react';

interface SlideProps {
  registerNavHandler?: (handler: (dir: 'prev' | 'next') => boolean) => void;
}

function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);
  return <>{count}{suffix}</>;
}

const stats = [
  {
    icon: Users, label: 'Who Is Affected',
    headline: '65', headlineSuffix: '%', headlineTarget: 65,
    sub: "of India's rural population -- served by community health workers and rural GPs with minimal diagnostic tools",
    color: '#2563eb', bgColor: 'rgba(37,99,235,0.06)', borderColor: 'rgba(37,99,235,0.15)',
  },
  {
    icon: MapPin, label: 'The Setting',
    headline: '4', headlineSuffix: '-8 hrs', headlineTarget: 4,
    sub: 'travel required for specialist care from Primary Health Centres with zero to one doctor on duty',
    color: '#d97706', bgColor: 'rgba(217,119,6,0.06)', borderColor: 'rgba(217,119,6,0.15)',
  },
  {
    icon: AlertTriangle, label: 'The Impact',
    headline: '20', headlineSuffix: '%', headlineTarget: 20,
    sub: 'melanoma survival rate when detected late -- down from 95%. Untreated wounds escalate into sepsis.',
    color: '#dc2626', bgColor: 'rgba(220,38,38,0.06)', borderColor: 'rgba(220,38,38,0.15)',
  },
];

export default function Slide2RuralReality(_: SlideProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', maxWidth: 1152 }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: 48, position: 'relative' }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          The Problem
        </span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: 'var(--text)', marginTop: 8, lineHeight: 1.1 }}>
          The Rural Healthcare Reality
        </h2>
      </motion.div>

      {/* Cards - wide with generous padding */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02, boxShadow: `0 20px 40px -10px ${stat.borderColor}` }}
              style={{
                position: 'relative', padding: 32,
                borderRadius: 20, overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: `2px solid ${stat.borderColor}`,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -2px rgba(0,0,0,0.02)',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              {/* Animated Colored corner glow */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7], rotate: [0, 90, 0] }}
                transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: stat.bgColor, filter: 'blur(30px)', pointerEvents: 'none' }}
              />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: 14, background: stat.bgColor, marginBottom: 24, border: `2px solid ${stat.borderColor}` }}
              >
                <Icon size={24} style={{ color: stat.color }} />
              </motion.div>

              {/* Label */}
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
                {stat.label}
              </div>

              {/* Big number */}
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 6vw, 72px)', fontWeight: 800, color: stat.color, lineHeight: 1, marginBottom: 8, position: 'relative', zIndex: 1 }}>
                <AnimatedCounter target={stat.headlineTarget} duration={1800} />
                <span style={{ fontSize: '45%', fontWeight: 600 }}>{stat.headlineSuffix}</span>
              </div>

              {/* Description */}
              <p style={{ fontSize: 15, color: 'var(--text-soft)', lineHeight: 1.7, marginTop: 12, position: 'relative', zIndex: 1 }}>
                {stat.sub}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.01 }}
        style={{ marginTop: 32, textAlign: 'center', padding: '20px 32px', borderRadius: 16, background: 'rgba(220,38,38,0.04)', border: '2px solid rgba(220,38,38,0.12)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', transition: 'transform 0.2s ease' }}
      >
        <p style={{ fontSize: 17, color: 'var(--text-soft)' }}>
          Late detection drops melanoma survival from{' '}
          <span style={{ color: 'var(--correct)', fontWeight: 700 }}>95%</span>
          {' '}to{' '}
          <span style={{ color: 'var(--critical)', fontWeight: 700 }}>20%</span>
          {' '}-- a gap that early AI-assisted diagnosis can close.
        </p>
      </motion.div>
    </motion.div>
  );
}
