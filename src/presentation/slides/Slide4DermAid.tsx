import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Tag, Globe, Scan } from 'lucide-react';

interface SlideProps {
  registerNavHandler?: (handler: (dir: 'prev' | 'next') => boolean) => void;
}

const PHONE_STATES = [
  { id: 'benign', condition: 'Benign Mole', risk: 'Low Risk', desc: '"No immediate referral needed. Recommend monitoring for changes in size or colour."', color: '#059669', bg: '#05966915', image: '/benign_mole.png' },
  { id: 'monitor', condition: 'Atypical Nevus', risk: 'Medium Risk', desc: '"Recommend follow-up evaluation in 3 months. Monitor for asymmetry."', color: '#d97706', bg: '#d9770615', image: '/atypical_nevus.png' },
  { id: 'urgent', condition: 'Suspected Melanoma', risk: 'High Risk', desc: '"Immediate specialist referral strongly advised. Red flags detected."', color: '#dc2626', bg: '#dc262625', image: '/suspected_melanoma.png' }
];

const FEATURES = [
  { label: 'Condition Category', desc: 'Confidence indicator with plain-language labels understood by patients and non-specialists alike.', color: '#2563eb', icon: Tag },
  { label: 'Severity Score', desc: '1-5 objective score mapped to standard colour coding (Green / Yellow / Red) for rapid triaging.', color: '#059669', icon: Activity },
  { label: 'Bilingual Output', desc: 'Native referral decisions generated in both English and Hindi to support local frontline health workers.', color: '#7c3aed', icon: Globe },
  { label: 'Visual Heatmap', desc: 'Optional Grad-CAM overlay showing the exact model focus area for transparency and interpretability.', color: '#d97706', icon: Scan },
];

function SeverityBadge({ level, color, label }: { level: number; color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 8, background: `${color}0d`, border: `2px solid ${color}30` }}>
      <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
      <span style={{ fontSize: 13, color, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{level} -- {label}</span>
    </div>
  );
}

export default function Slide4DermAid({ registerNavHandler }: SlideProps) {
  const [view, setView] = useState<'demo' | 'features'>('demo');
  const [phoneState, setPhoneState] = useState(0);

  useEffect(() => {
    if (view !== 'demo') return;
    const interval = setInterval(() => {
      setPhoneState((prev) => (prev + 1) % PHONE_STATES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [view]);

  useEffect(() => {
    if (registerNavHandler) {
      registerNavHandler((dir) => {
        if (dir === 'next' && view === 'demo') {
          setView('features');
          return true; // handled internally
        }
        if (dir === 'prev' && view === 'features') {
          setView('demo');
          return true; // handled internally
        }
        return false; // let presentation handle slide change
      });
    }
  }, [view, registerNavHandler]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', maxWidth: 1000, margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--text)' }}>Introducing DermAid</h2>
        <p style={{ fontSize: 18, color: 'var(--text-soft)', marginTop: 8 }}>Offline-first mobile AI -- classifying skin conditions rapidly on any smartphone</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
        <div style={{ display: 'flex', background: 'var(--border-light)', padding: 6, borderRadius: 20 }}>
          <button onClick={() => setView('demo')} style={{ padding: '8px 24px', borderRadius: 14, border: 'none', background: view === 'demo' ? '#fff' : 'transparent', color: view === 'demo' ? 'var(--text)' : 'var(--text-muted)', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: view === 'demo' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s' }}>
            Live Demo
          </button>
          <button onClick={() => setView('features')} style={{ padding: '8px 24px', borderRadius: 14, border: 'none', background: view === 'features' ? '#fff' : 'transparent', color: view === 'features' ? 'var(--text)' : 'var(--text-muted)', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: view === 'features' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s' }}>
            Core Capabilities
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'demo' ? (
          <motion.div key="demo" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) auto', gap: 64, alignItems: 'center' }}>
              
              {/* How it works details */}
              <div style={{ position: 'relative', overflow: 'hidden', padding: 40, borderRadius: 24, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '2px solid rgba(37,99,235,0.1)', boxShadow: '0 12px 24px -10px rgba(37,99,235,0.05)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 32 }}>Workflow</div>
                {[
                  { step: '01', text: 'Health worker snaps a lesion photo using a standard camera.' },
                  { step: '02', text: 'On-device AI securely classifies the condition instantly.' },
                  { step: '03', text: 'System outputs severity scale and actionable referral decision.' },
                ].map(s => (
                  <div key={s.step} style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--accent)', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{s.step}</span>
                    <p style={{ fontSize: 17, color: 'var(--text-soft)', lineHeight: 1.6 }}>{s.text}</p>
                  </div>
                ))}

                <div style={{ height: 1, background: 'var(--border)', margin: '32px 0' }} />
                
                <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.6, background: '#1d4ed810', padding: 16, borderRadius: 12 }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>100% Offline:</span> No dermoscope required, no internet dependency, zero cloud latency.
                </p>
              </div>

              {/* Dynamic 3D Phone Simulator */}
              <div style={{ display: 'flex', justifyContent: 'center', width: 280 }}>
                <motion.div 
                  layout
                  style={{ width: '100%', height: 560, padding: 8, borderRadius: 44, background: 'linear-gradient(145deg, #2a2a2a, #000)', border: '2px solid rgba(255,255,255,0.15)', boxShadow: `0 30px 60px -15px ${PHONE_STATES[phoneState].bg}, 0 10px 20px -5px rgba(0,0,0,0.5)`, position: 'relative', transition: 'box-shadow 0.8s ease' }}
                >
                  {/* Physical Buttons */}
                  <div style={{ position: 'absolute', left: -4, top: 100, width: 4, height: 32, background: '#333', borderRadius: '4px 0 0 4px' }} />
                  <div style={{ position: 'absolute', left: -4, top: 150, width: 4, height: 48, background: '#333', borderRadius: '4px 0 0 4px' }} />
                  <div style={{ position: 'absolute', right: -4, top: 130, width: 4, height: 48, background: '#333', borderRadius: '0 4px 4px 0' }} />
                  {/* Notch */}
                  <div style={{ position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)', width: 90, height: 26, borderRadius: 13, background: '#000', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#111', boxShadow: 'inset 0 0 4px rgba(255,255,255,0.1)' }} />
                  </div>

                  {/* Phone Screen Container */}
                  <div style={{ borderRadius: 36, background: '#fafafa', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    {/* Dynamic Ambient Header Glow */}
                    <AnimatePresence mode="wait">
                      <motion.div key={PHONE_STATES[phoneState].id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                        style={{ position: 'absolute', top: -100, left: -50, width: 400, height: 250, background: `radial-gradient(circle, ${PHONE_STATES[phoneState].color}40 0%, transparent 70%)` }} />
                    </AnimatePresence>
                    
                    {/* Screen UI Content */}
                    <div style={{ position: 'relative', zIndex: 1, padding: '50px 20px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 'auto', textAlign: 'center' }}>DermAid Beta</div>
                      
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ height: 180, borderRadius: 16, marginBottom: 12, position: 'relative', overflow: 'hidden', background: '#e5e7eb' }}>
                          <AnimatePresence mode="wait">
                            <motion.img 
                              key={PHONE_STATES[phoneState].id} 
                              initial={{ opacity: 0, scale: 1.05 }} 
                              animate={{ opacity: 1, scale: 1 }} 
                              exit={{ opacity: 0 }} 
                              transition={{ duration: 0.25 }}
                              src={PHONE_STATES[phoneState].image} 
                              alt={PHONE_STATES[phoneState].condition}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} 
                            />
                          </AnimatePresence>
                          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)', borderRadius: 16, pointerEvents: 'none' }} />
                        </div>
                        {/* Slide indicators inside phone UX */}
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                          <motion.div animate={{ scale: phoneState === 0 ? 1.2 : 1, opacity: phoneState === 0 ? 1 : 0.2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669' }} />
                          <motion.div animate={{ scale: phoneState === 1 ? 1.2 : 1, opacity: phoneState === 1 ? 1 : 0.2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#d97706' }} />
                          <motion.div animate={{ scale: phoneState === 2 ? 1.2 : 1, opacity: phoneState === 2 ? 1 : 0.2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#dc2626' }} />
                        </div>
                      </div>

                      {/* Animated Result Card */}
                      <AnimatePresence mode="wait">
                        <motion.div key={PHONE_STATES[phoneState].id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.18 }}
                          style={{ padding: 18, borderRadius: 20, background: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', border: `2px solid ${PHONE_STATES[phoneState].bg}` }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                            <div style={{ fontSize: 16, fontWeight: 800, color: '#111', fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>{PHONE_STATES[phoneState].condition}</div>
                            <span style={{ padding: '6px 10px', borderRadius: 8, background: PHONE_STATES[phoneState].bg, color: PHONE_STATES[phoneState].color, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', flexShrink: 0 }}>{PHONE_STATES[phoneState].risk}</span>
                          </div>
                          <div style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.5, fontWeight: 500 }}>
                            {PHONE_STATES[phoneState].desc}
                          </div>
                        </motion.div>
                      </AnimatePresence>

                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="features" initial={{ opacity: 0, scale: 0.98, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -15 }} transition={{ duration: 0.25 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -6, boxShadow: `0 20px 40px -10px ${f.color}20` }}
                    style={{ padding: 36, borderRadius: 24, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: `2px solid ${f.color}15`, position: 'relative', overflow: 'hidden' }}>
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 8, repeat: Infinity }} style={{ position: 'absolute', top: -30, right: -30, width: 150, height: 150, borderRadius: '50%', background: `${f.color}20`, filter: 'blur(30px)', pointerEvents: 'none' }} />
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                      <Icon size={24} style={{ color: f.color }} />
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12, fontFamily: 'var(--font-display)' }}>{f.label}</h3>
                    <p style={{ fontSize: 16, color: 'var(--text-soft)', lineHeight: 1.6 }}>{f.desc}</p>
                    
                    {/* Extra visuals for specific features */}
                    {i === 1 && (
                      <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
                        <SeverityBadge level={1} color="#059669" label="Low" />
                        <SeverityBadge level={3} color="#d97706" label="Med" />
                        <SeverityBadge level={5} color="#dc2626" label="High" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
