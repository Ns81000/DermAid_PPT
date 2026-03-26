import { motion } from 'framer-motion';
import { WifiOff, DollarSign, AlertCircle, Globe } from 'lucide-react';

interface SlideProps {
  registerNavHandler?: (handler: (dir: 'prev' | 'next') => boolean) => void;
}

const gaps = [
  {
    icon: WifiOff, title: 'Connectivity Dependency',
    description: 'Most apps require 4G/5G networks, which remain unreliable in rural areas with limited infrastructure.',
    stat: '4G/5G Required', statLabel: 'but unavailable in rural PHCs',
    color: '#2563eb', bgColor: 'rgba(37,99,235,0.06)', borderColor: 'rgba(37,99,235,0.15)',
    visualColor: 'bg-blue-100', visualBorder: 'border-blue-200', visualText: 'text-blue-500',
  },
  {
    icon: DollarSign, title: 'Hardware Costs',
    description: 'Clinical dermoscopes cost $500-$5,000 per unit, creating insurmountable financial barriers for underfunded PHCs.',
    stat: '$500 - $5,000', statLabel: 'per dermoscope unit',
    color: '#d97706', bgColor: 'rgba(217,119,6,0.06)', borderColor: 'rgba(217,119,6,0.15)',
    visualColor: 'bg-amber-100', visualBorder: 'border-amber-200', visualText: 'text-amber-600',
  },
  {
    icon: AlertCircle, title: 'Non-Actionable Outputs',
    description: 'Existing tools return complex labels like "Melanocytic Nevi" without clear guidance on what action to take next.',
    stat: '"Melanocytic Nevi"', statLabel: 'unclear to non-specialists',
    color: '#dc2626', bgColor: 'rgba(220,38,38,0.06)', borderColor: 'rgba(220,38,38,0.12)',
    visualColor: 'bg-red-100', visualBorder: 'border-red-200', visualText: 'text-red-500',
  },
  {
    icon: Globe, title: 'Bias & Language Gap',
    description: 'Interfaces are English-only and models trained on lighter skin tones (Fitzpatrick Type I-III).',
    stat: 'Type I-III Only', statLabel: 'Fitzpatrick training bias',
    color: '#7c3aed', bgColor: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.15)',
    visualColor: 'bg-purple-100', visualBorder: 'border-purple-200', visualText: 'text-purple-500',
  },
];

export default function Slide3CriticalGaps(_: SlideProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', maxWidth: 1152 }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 48 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--accent-warm)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Why Existing Solutions Fail
        </span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: 'var(--text)', marginTop: 8, lineHeight: 1.1 }}>
          Critical Gaps in Current Solutions
        </h2>
      </motion.div>

      {/* 2x2 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {gaps.map((gap, i) => {
          const Icon = gap.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.015, boxShadow: `0 20px 40px -10px ${gap.borderColor}` }}
              style={{
                position: 'relative', padding: 32,
                borderRadius: 20, overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: `2px solid ${gap.borderColor}`,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -2px rgba(0,0,0,0.02)',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              {/* Glow */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: gap.bgColor, filter: 'blur(25px)', pointerEvents: 'none' }}
              />

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, position: 'relative', zIndex: 1 }}>
                {/* Icon */}
                <motion.div
                  animate={{ rotate: [0, 4, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  style={{ flexShrink: 0, width: 56, height: 56, borderRadius: 16, background: gap.bgColor, border: `2px solid ${gap.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Icon size={26} style={{ color: gap.color }} />
                </motion.div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
                    {gap.title}
                  </h3>
                  <p style={{ fontSize: 15, color: 'var(--text-soft)', lineHeight: 1.7, marginBottom: 16 }}>
                    {gap.description}
                  </p>

                  {/* Stat badge */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: 12, background: gap.bgColor, border: `2px solid ${gap.borderColor}` }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: gap.color }}>
                      {gap.stat}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                      -- {gap.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
