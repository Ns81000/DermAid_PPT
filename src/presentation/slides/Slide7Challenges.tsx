import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface SlideProps {
  registerNavHandler?: (handler: (dir: 'prev' | 'next') => boolean) => void;
}

const challenges = [
  {
    id: 'domain', title: 'Challenge 1: Domain Shift',
    problem: 'Smartphone photos in rural clinics suffer from motion blur, poor lighting, and varying focal distances that differ significantly from clean clinical datasets used for training.',
    mitigations: [
      { label: 'Synthetic Degradation Training', desc: 'Albumentations library adds synthetic noise, blur, and lighting variation during training -- simulating real-world rural clinic conditions.', color: '#059669' },
      { label: 'Quality Validation Module', desc: 'Pre-inference validation uses Laplacian Variance to detect blur and reject poor-quality photos before processing.', color: '#2563eb' },
    ],
  },
  {
    id: 'imbalance', title: 'Challenge 2: Class Imbalance',
    problem: 'The model naturally biases toward predicting "Benign" due to extreme dataset imbalance -- a dangerous failure mode for cancer screening.',
    mitigations: [
      { label: 'Focal Loss', desc: 'Down-weights well-classified examples and focuses training on hard, rare malignant cases that matter most.', color: '#059669' },
      { label: 'Weighted Sampling', desc: 'Weighted random sampling ensures balanced representation of rare malignant cases in every training batch.', color: '#2563eb' },
      { label: 'Threshold Calibration', desc: 'Post-training calibration aggressively prioritizes melanoma sensitivity over specificity.', color: '#d97706' },
    ],
  },
];

export default function Slide7Challenges({ registerNavHandler }: SlideProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleInternalNav = useCallback((dir: 'prev' | 'next'): boolean => {
    if (dir === 'next' && activeTab === 0) { setActiveTab(1); return true; }
    if (dir === 'prev' && activeTab === 1) { setActiveTab(0); return true; }
    return false;
  }, [activeTab]);

  useEffect(() => { registerNavHandler?.(handleInternalNav); }, [registerNavHandler, handleInternalNav]);

  const challenge = challenges[activeTab];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', maxWidth: 1152 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 36 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#dc2626', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Engineering Obstacles</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: 'var(--text)', marginTop: 8, lineHeight: 1.1 }}>Key Challenges & Mitigations</h2>
      </motion.div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 36 }}>
        {challenges.map((c, i) => (
          <motion.button key={c.id} onClick={() => setActiveTab(i)} 
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: '12px 28px', borderRadius: 40, fontSize: 15, fontWeight: 500, border: activeTab === i ? '2px solid var(--accent)' : '2px solid rgba(0,0,0,0.1)', cursor: 'pointer', background: activeTab === i ? 'var(--accent)' : 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', color: activeTab === i ? '#fff' : 'var(--text-soft)', boxShadow: activeTab === i ? '0 8px 16px -4px rgba(37,99,235,0.3)' : '0 2px 4px rgba(0,0,0,0.02)', transition: 'background 0.3s, color 0.3s, border-color 0.3s' }}>
            {i === 0 ? 'Domain Shift' : 'Class Imbalance'}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, x: activeTab === 0 ? -30 : 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: activeTab === 0 ? 30 : -30 }} transition={{ duration: 0.4 }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            whileHover={{ y: -2, boxShadow: '0 12px 24px -10px rgba(220,38,38,0.15)' }}
            style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '24px 28px', borderRadius: 20, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '2px solid rgba(220,38,38,0.12)', marginBottom: 28, position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.3s ease' }}>
            {/* pulse warning glow */}
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: -30, left: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(220,38,38,0.2)', filter: 'blur(25px)', pointerEvents: 'none' }} />
            
            <AlertTriangle size={24} style={{ color: '#dc2626', flexShrink: 0, marginTop: 2 }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#dc2626', marginBottom: 8 }}>Problem</div>
              <p style={{ fontSize: 16, color: 'var(--text-soft)', lineHeight: 1.7 }}>{challenge.problem}</p>
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${challenge.mitigations.length}, 1fr)`, gap: 20 }}>
            {challenge.mitigations.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.12 }}
                whileHover={{ y: -6, scale: 1.02, boxShadow: `0 20px 40px -10px ${m.color}30` }}
                style={{ padding: 28, borderRadius: 20, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: `2px solid ${m.color}20`, position: 'relative', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', transition: 'box-shadow 0.3s ease' }}>
                <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `${m.color}15`, filter: 'blur(20px)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, position: 'relative', zIndex: 1 }}>
                  <ShieldCheck size={20} style={{ color: m.color }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: m.color }}>Mitigation {i + 1}</h3>
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 10, position: 'relative', zIndex: 1 }}>{m.label}</div>
                <p style={{ fontSize: 15, color: 'var(--text-soft)', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>{m.desc}</p>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: 28, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 8 }}>
            {challenges.map((_, i) => (
              <motion.div key={i} animate={{ width: i === activeTab ? 32 : 10 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{ height: 6, borderRadius: 3, background: i === activeTab ? 'var(--accent)' : 'var(--border)' }} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
