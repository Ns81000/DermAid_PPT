import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Brain, Layers, BarChart3, Wand2, Zap, ArrowRight } from 'lucide-react';

interface SlideProps {
  registerNavHandler?: (handler: (dir: 'prev' | 'next') => boolean) => void;
}

const datasets = [
  { name: 'ISIC 2024 (SLICE-3D)', images: '~400k', type: 'Primary Training', color: '#2563eb' },
  { name: 'ISIC 2019 / 2020', images: '~33k', type: 'Supplemental', color: '#4f46e5' },
  { name: 'Dermnet', images: '~23k', type: 'Diversity & Edge Cases', color: '#7c3aed' },
];

export default function Slide6Dataset(_: SlideProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 300); return () => clearTimeout(t); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', maxWidth: 1152 }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 28 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Data & Methodology</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: 'var(--text)', marginTop: 8, lineHeight: 1.1 }}>Dataset & Computer Vision Approach</h2>
      </motion.div>

      {/* Row 1: Datasets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 20 }}>
        {datasets.map((ds, i) => (
          <motion.div key={ds.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.1 }}
            whileHover={{ y: -6, scale: 1.02, boxShadow: `0 20px 40px -10px ${ds.color}40` }}
            style={{ padding: '24px', borderRadius: 20, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: `2px solid ${ds.color}15`, position: 'relative', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', transition: 'box-shadow 0.3s ease' }}>
            <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: `${ds.color}15`, filter: 'blur(25px)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, position: 'relative', zIndex: 1 }}>
              <Database size={18} style={{ color: ds.color }} />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: ds.color }}>{ds.type}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8, position: 'relative', zIndex: 1 }}>{ds.name}</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, position: 'relative', zIndex: 1 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 800, color: ds.color, lineHeight: 1 }}>{ds.images}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>images</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Row 2: Processing (Imbalance & Augmentation) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 1.2fr', gap: 20, marginBottom: 20 }}>
        
        {/* Left: Class imbalance visual */}
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          style={{ padding: 24, borderRadius: 20, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '2px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <BarChart3 size={18} style={{ color: '#dc2626' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#dc2626', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Class Imbalance Target</span>
            </div>
            <div style={{ fontSize: 11, padding: '4px 10px', borderRadius: 8, background: 'rgba(5,150,105,0.1)', color: '#059669', fontWeight: 700, textTransform: 'uppercase' }}>
              Mitigated via Focal Loss
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: 'var(--text-soft)', fontWeight: 600 }}>Benign Cases</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: '#2563eb' }}>~400,000+</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-2)', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: mounted ? '95%' : 0 }} transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }} style={{ height: '100%', borderRadius: 6, background: 'linear-gradient(90deg, #2563eb, #3b82f6)' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: 'var(--text-soft)', fontWeight: 600 }}>Malignant Cases</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: '#dc2626' }}>~30,000+</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-2)', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: mounted ? '8%' : 0 }} transition={{ duration: 1.2, delay: 0.7, ease: 'easeOut' }} style={{ height: '100%', borderRadius: 6, background: 'linear-gradient(90deg, #dc2626, #ef4444)' }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Data Augmentation */}
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
          style={{ padding: 24, borderRadius: 20, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '2px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Wand2 size={18} style={{ color: '#7c3aed' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#7c3aed', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Heavy Data Augmentation</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 12 }}>
            {[ { label: 'Color Jitter', c: '#dc2626' }, { label: 'Random Crop', c: '#059669' }, { label: 'Rotate/Flip', c: '#2563eb' }, { label: 'MixUp Engine', c: '#d97706' } ].map(aug => (
              <motion.div whileHover={{ y: -2, scale: 1.05 }} key={aug.label} style={{ padding: '12px 6px', borderRadius: 12, background: '#fff', border: `2px solid ${aug.c}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: aug.c }}>{aug.label}</span>
              </motion.div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            Albumentations pipeline simulates varying lighting and low-quality cameras found in rural Indian clinics to artificially expand edge cases.
          </p>
        </motion.div>
      </div>

      {/* Row 3: Pipeline horizontally */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        style={{ padding: '28px 32px', borderRadius: 24, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '2px solid rgba(16,185,129,0.15)', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.02)' }}
      >
        <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: -150, left: '50%', transform: 'translateX(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', filter: 'blur(45px)', pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Brain size={20} style={{ color: '#059669' }} />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#059669', letterSpacing: '0.08em', textTransform: 'uppercase' }}>End-to-End Inference Flow</span>
          </div>
          {/* Edge metric badge */}
          <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 12, background: 'rgba(16,185,129,0.1)', border: '2px solid rgba(16,185,129,0.25)', cursor: 'default' }}>
            <Zap size={16} style={{ color: '#059669' }} />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>~120ms Edge Inference</span>
          </motion.div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          {[
            { icon: Layers, label: 'Smartphone Photo', sub: '224x224 normalized input', color: '#2563eb' },
            { icon: Brain, label: 'EfficientNet-B3', sub: 'Visual feature extraction', color: '#4f46e5' },
            { icon: Database, label: 'Metadata Fusion', sub: 'Age + Sex + Body Site', color: '#d97706' },
            { icon: BarChart3, label: 'Severity Risk 1-5', sub: 'Actionable triaging output', color: '#059669' },
          ].map((step, i, arr) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={i}>
                <motion.div whileHover={{ y: -4, boxShadow: `0 16px 32px -10px ${step.color}20` }} style={{ flex: 1, padding: '16px 20px', borderRadius: 16, background: '#fff', border: `2px solid ${step.color}15`, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', transition: 'box-shadow 0.3s ease' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${step.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <Icon size={20} style={{ color: step.color }} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{step.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4, fontWeight: 500 }}>{step.sub}</div>
                </motion.div>

                {i < arr.length - 1 && (
                  <div style={{ width: 24, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                    <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                      <ArrowRight size={20} style={{ color: 'var(--border)' }} />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
