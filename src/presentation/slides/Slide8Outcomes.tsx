import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Activity } from 'lucide-react';

interface SlideProps {
  registerNavHandler?: (handler: (dir: 'prev' | 'next') => boolean) => void;
}

function AnimatedMeter({ value, color, label }: { value: number; color: string; label: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 400); return () => clearTimeout(t); }, []);
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 15, color: 'var(--text-soft)' }}>{label}</span>
        <span style={{ fontSize: 18, fontWeight: 700, color, fontFamily: 'var(--font-mono)' }}>{value}%</span>
      </div>
      <div style={{ height: 12, borderRadius: 6, background: 'var(--bg-2)', overflow: 'hidden' }}>
        <motion.div initial={{ width: 0 }} animate={{ width: mounted ? `${value}%` : 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          style={{ height: '100%', borderRadius: 6, background: `linear-gradient(90deg, ${color}99, ${color})` }} />
      </div>
    </div>
  );
}

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - start) / 1600, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
    };
    const delay = setTimeout(() => { rafRef.current = requestAnimationFrame(animate); }, 500);
    return () => { clearTimeout(delay); cancelAnimationFrame(rafRef.current); };
  }, [target]);
  return <>{prefix}{count}{suffix}</>;
}

const roadmapPhases = [
  { phase: 'Phase 1', timeline: 'Weeks 1-2', deliverable: 'Clean data pipeline and fine-tune baseline EfficientNet-B3', color: '#2563eb' },
  { phase: 'Phase 2', timeline: 'Weeks 2-3', deliverable: 'Integrate imbalance handling and validate Grad-CAM heatmaps', color: '#d97706' },
  { phase: 'Phase 3', timeline: 'Weeks 3-4', deliverable: 'TFLite quantization, referral logic, and Android prototype', color: '#059669' },
];

export default function Slide8Outcomes(_: SlideProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', maxWidth: 1152 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 40 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--correct)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Results & Timeline</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: 'var(--text)', marginTop: 8, lineHeight: 1.1 }}>Expected Outcomes & Roadmap</h2>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            whileHover={{ y: -6, boxShadow: '0 20px 40px -10px rgba(37,99,235,0.2)' }}
            style={{ position: 'relative', overflow: 'hidden', padding: 32, borderRadius: 20, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '2px solid rgba(37,99,235,0.15)', flex: 1, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', transition: 'box-shadow 0.3s ease' }}>
            {/* Ambient Glow */}
            <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.4, 0.15] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(37,99,235,0.08)', filter: 'blur(35px)', pointerEvents: 'none' }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>Performance Targets</div>
              <AnimatedMeter value={87} color="#2563eb" label="AUC-ROC Score (target >= 0.87)" />
              <AnimatedMeter value={82} color="#4f46e5" label="Balanced Accuracy" />
              <AnimatedMeter value={90} color="#d97706" label="Melanoma Sensitivity (critical)" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
            whileHover={{ y: -6, boxShadow: '0 20px 40px -10px rgba(5,150,105,0.2)' }}
            style={{ position: 'relative', overflow: 'hidden', padding: 24, borderRadius: 20, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '2px solid rgba(5,150,105,0.15)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', transition: 'box-shadow 0.3s ease' }}>
            {/* Ambient Glow */}
            <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.4, 0.15] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }} style={{ position: 'absolute', bottom: -50, left: -50, width: 180, height: 180, borderRadius: '50%', background: 'rgba(5,150,105,0.08)', filter: 'blur(30px)', pointerEvents: 'none' }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--correct)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Projected Impact</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[{ icon: Activity, label: 'Fewer Missed Diagnoses', value: 70, suffix: '%', prefix: 'Up to ', color: '#059669' },
                  { icon: Target, label: 'Fewer Unnecessary Referrals', value: 40, suffix: '%', prefix: 'Up to ', color: '#d97706' }].map(stat => {
                  const Icon = stat.icon;
                  return (
                    <motion.div whileHover={{ scale: 1.05 }} key={stat.label} style={{ padding: 18, borderRadius: 16, background: 'rgba(255,255,255,0.4)', border: `2px solid ${stat.color}20`, textAlign: 'center' }}>
                      <Icon size={20} style={{ color: stat.color, marginBottom: 8 }} />
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: stat.color }}>
                        <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.4 }}>{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          whileHover={{ boxShadow: '0 12px 30px -10px rgba(0,0,0,0.08)' }}
          style={{ position: 'relative', overflow: 'hidden', padding: 32, borderRadius: 20, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '2px solid var(--border)', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', transition: 'box-shadow 0.3s ease' }}>
          {/* Ambient Glow */}
          <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.4, 0.15] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }} style={{ position: 'absolute', top: '50%', right: -50, transform: 'translateY(-50%)', width: 250, height: 250, borderRadius: '50%', background: 'rgba(217,119,6,0.08)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--accent-warm)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>4-Week Development Roadmap</div>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 12, marginBottom: 12 }}>
              <div />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                {['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'].map(w => (
                  <div key={w} style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{w}</div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {roadmapPhases.map((phase, i) => (
                <motion.div key={phase.phase} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.15 }}
                  whileHover={{ x: 8 }}
                  style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 12, marginBottom: 24, alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: phase.color, fontFamily: 'var(--font-mono)' }}>{phase.phase}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{phase.timeline}</div>
                  </div>
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 10 }}>
                      {[0, 1, 2, 3].map(w => {
                        const active = (i === 0 && w < 2) || (i === 1 && w >= 1 && w < 3) || (i === 2 && w >= 2);
                        return (
                          <motion.div key={w} initial={{ scaleX: 0 }} animate={{ scaleX: active ? 1 : 0, boxShadow: active ? `0 0 10px ${phase.color}80` : 'none' }}
                            transition={{ delay: 0.6 + i * 0.15 + w * 0.05, duration: 0.4, ease: 'easeOut' }}
                            style={{ height: 18, borderRadius: 4, background: active ? phase.color : 'var(--bg-2)', border: `2px solid ${active ? phase.color + '40' : 'var(--border)'}`, transformOrigin: 'left' }} />
                        );
                      })}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.5 }}>{phase.deliverable}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: '14px 20px', borderRadius: 14, background: 'rgba(217,119,6,0.06)', border: '2px solid rgba(217,119,6,0.12)' }}>
              <p style={{ fontSize: 14, color: 'var(--text-soft)' }}>
                <span style={{ color: '#d97706', fontWeight: 600 }}>Priority metric:</span> 90% melanoma sensitivity -- missing a cancer is far more costly than a false positive.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
