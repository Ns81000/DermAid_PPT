import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Smartphone, Globe, Zap, GitBranch, Hospital, Users } from 'lucide-react';

interface SlideProps {
  registerNavHandler?: (handler: (dir: 'prev' | 'next') => boolean) => void;
}

type View = 'benefits' | 'scale' | 'closing';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - start) / 1800, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
    };
    const delay = setTimeout(() => { rafRef.current = requestAnimationFrame(animate); }, 400);
    return () => { clearTimeout(delay); cancelAnimationFrame(rafRef.current); };
  }, [target]);
  return <>{count.toLocaleString()}{suffix}</>;
}

const benefits = [
  { icon: WifiOff, title: '100% Offline Operation', desc: 'Eliminates connectivity dependency completely', color: '#2563eb' },
  { icon: Smartphone, title: 'Standard Smartphones', desc: 'Replaces $500+ dermoscopes -- any Android device works', color: '#059669' },
  { icon: Globe, title: 'Plain-Language Outputs', desc: 'Guides non-specialists with actionable referral decisions', color: '#7c3aed' },
  { icon: Zap, title: 'Bilingual Support', desc: 'Referral decisions in both English and Hindi', color: '#d97706' },
];

const scalePaths = [
  { icon: GitBranch, title: 'Expand Conditions', desc: 'Additional skin conditions and wound types beyond initial scope', color: '#2563eb' },
  { icon: Hospital, title: 'Gov Integration', desc: 'Integrate with national health information systems', color: '#4f46e5' },
  { icon: Hospital, title: '150,000+ PHCs', desc: 'Deploy across all Primary Health Centres nationwide', color: '#059669' },
  { icon: Users, title: 'ASHA Workers', desc: 'Adapt for use by ASHA workers nationwide', color: '#d97706' },
];

const pillars = [
  { label: 'Accessibility', desc: 'Democratizes dermatological expertise for 900 million rural Indians', color: '#2563eb', border: 'rgba(37,99,235,0.15)' },
  { label: 'Accuracy', desc: 'Reduces diagnostic errors through AI-assisted decision support with 90% sensitivity', color: '#059669', border: 'rgba(5,150,105,0.15)' },
  { label: 'Speed', desc: 'Delivers instant referrals without hours-long specialist travel from rural areas', color: '#d97706', border: 'rgba(217,119,6,0.15)' },
];

export default function Slide9Impact({ registerNavHandler }: SlideProps) {
  const [view, setView] = useState<View>('benefits');

  const handleInternalNav = useCallback((dir: 'prev' | 'next'): boolean => {
    if (dir === 'next') {
      if (view === 'benefits') { setView('scale'); return true; }
      if (view === 'scale') { setView('closing'); return true; }
    }
    if (dir === 'prev') {
      if (view === 'closing') { setView('scale'); return true; }
      if (view === 'scale') { setView('benefits'); return true; }
    }
    return false;
  }, [view]);

  useEffect(() => { registerNavHandler?.(handleInternalNav); }, [registerNavHandler, handleInternalNav]);

  const tabs: { id: View; label: string }[] = [
    { id: 'benefits', label: 'Immediate Benefits' },
    { id: 'scale', label: 'Scalability' },
    { id: 'closing', label: 'Core Pillars' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', maxWidth: 1152 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 32 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>The Vision</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: 'var(--text)', marginTop: 8, lineHeight: 1.1 }}>Potential Impact & Future Vision</h2>
      </motion.div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 36 }}>
        {tabs.map(tab => (
          <motion.button key={tab.id} onClick={() => setView(tab.id)} 
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
            padding: '11px 24px', borderRadius: 40, fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.25s',
            background: view === tab.id ? 'var(--accent)' : 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            color: view === tab.id ? '#fff' : 'var(--text-soft)',
            border: view === tab.id ? '2px solid transparent' : '2px solid rgba(0,0,0,0.1)',
            boxShadow: view === tab.id ? '0 8px 16px -4px rgba(37,99,235,0.3)' : '0 2px 4px rgba(0,0,0,0.02)',
          }}>
            {tab.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {view === 'benefits' && (
          <motion.div key="benefits" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.4 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }}
                    whileHover={{ y: -4, scale: 1.01, boxShadow: `0 12px 24px -10px ${b.color}40` }}
                    style={{ position: 'relative', overflow: 'hidden', display: 'flex', gap: 20, padding: '28px', borderRadius: 20, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: `2px solid ${b.color}18`, alignItems: 'flex-start', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', transition: 'box-shadow 0.3s ease' }}>
                    <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: -20, left: -20, width: 120, height: 120, borderRadius: '50%', background: `${b.color}15`, filter: 'blur(20px)', pointerEvents: 'none' }} />
                    <div style={{ position: 'relative', zIndex: 1, width: 52, height: 52, borderRadius: 14, background: `${b.color}0a`, border: `2px solid ${b.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={24} style={{ color: b.color }} />
                    </div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{b.title}</h3>
                      <p style={{ fontSize: 15, color: 'var(--text-soft)', lineHeight: 1.6 }}>{b.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {view === 'scale' && (
          <motion.div key="scale" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
              {/* Left: hero stat */}
              <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 12px 30px -10px rgba(5,150,105,0.2)' }}
                style={{ padding: 40, borderRadius: 20, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '2px solid rgba(5,150,105,0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.3s ease' }}>
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.4, 0.15] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', bottom: -50, right: -50, width: 250, height: 250, borderRadius: '50%', background: 'rgba(5,150,105,0.08)', filter: 'blur(35px)' }} />
                
                {/* Immersive Shimmer Pass */}
                <motion.div
                  animate={{ left: ['-100%', '200%', '200%'] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear', times: [0, 0.4, 1] }} 
                  style={{ position: 'absolute', top: 0, bottom: 0, width: '50%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)', transform: 'skewX(-20deg)', pointerEvents: 'none', zIndex: 10 }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--correct)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>National Reach</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px, 8vw, 84px)', fontWeight: 800, color: '#059669', lineHeight: 1, position: 'relative', display: 'inline-block' }}>
                    <AnimatedCounter target={150000} suffix="+" />
                  </div>
                  <p style={{ fontSize: 18, color: 'var(--text-soft)', marginTop: 16, lineHeight: 1.5 }}>
                    Primary Health Centres across India represent the potential deployment scale for DermAid.
                  </p>
                </div>
              </motion.div>
              {/* Right: scale paths stacked */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {scalePaths.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
                      whileHover={{ x: -8, boxShadow: `0 8px 16px -8px ${p.color}40` }}
                      style={{ display: 'flex', gap: 18, alignItems: 'center', padding: '20px 24px', borderRadius: 16, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: `2px solid ${p.color}15`, boxShadow: '0 2px 4px -1px rgba(0,0,0,0.02)', transition: 'box-shadow 0.3s ease' }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${p.color}08`, border: `2px solid ${p.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={22} style={{ color: p.color }} />
                      </div>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{p.title}</h3>
                        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>{p.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {view === 'closing' && (
          <motion.div key="closing" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
            {/* Three pillars as numbered steps */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 36 }}>
              {pillars.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.15 }}
                  whileHover={{ y: -6, scale: 1.02, boxShadow: `0 20px 40px -10px ${p.color}30` }}
                  style={{ padding: '32px 28px', borderRadius: 20, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: `2px solid ${p.border}`, position: 'relative', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', transition: 'box-shadow 0.3s ease' }}>
                  <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: `${p.color}15`, filter: 'blur(25px)', pointerEvents: 'none' }} />
                  <div style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: p.color, marginBottom: 16, letterSpacing: '0.05em' }}>{`0${i + 1}`}</div>
                  <div style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: p.color, marginBottom: 14, lineHeight: 1 }}>{p.label}</div>
                  <p style={{ position: 'relative', zIndex: 1, fontSize: 15, color: 'var(--text-soft)', lineHeight: 1.7 }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Closing */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.01, boxShadow: '0 20px 40px -10px rgba(37,99,235,0.15)' }}
              style={{ textAlign: 'center', padding: '40px 56px', borderRadius: 24, background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', border: '2px solid rgba(37,99,235,0.12)', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.04)', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}>
              <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 100%, rgba(37,99,235,0.2) 0%, transparent 60%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: 48, height: 2, background: 'var(--accent)', borderRadius: 1, margin: '0 auto 28px', opacity: 0.5 }} />
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2.2vw, 24px)', color: 'var(--text)', fontStyle: 'italic', fontWeight: 500, marginBottom: 24, lineHeight: 1.6, position: 'relative' }}>
                  "Democratizing dermatological expertise for 900 million rural Indians -- one smartphone, one diagnosis at a time."
                </p>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 24 }}>Thank you for your attention.</p>
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: '0 12px 24px -6px rgba(37,99,235,0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ boxShadow: ['0 8px 16px -4px rgba(37,99,235,0.4)', '0 8px 16px -4px rgba(37,99,235,0.8)', '0 8px 16px -4px rgba(37,99,235,0.4)'] }}
                  transition={{ boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
                  style={{ display: 'inline-block', padding: '14px 40px', borderRadius: 16, background: 'linear-gradient(135deg, var(--accent) 0%, #1d4ed8 100%)', color: '#fff', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, border: '2px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}>
                  Questions?
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
        {tabs.map(t => (
          <motion.div key={t.id} onClick={() => setView(t.id)} animate={{ width: t.id === view ? 32 : 10 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{ height: 6, borderRadius: 3, background: t.id === view ? 'var(--accent)' : 'var(--border)', cursor: 'pointer' }} />
        ))}
      </div>
    </motion.div>
  );
}
