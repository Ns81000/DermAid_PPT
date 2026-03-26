import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface SlideProps {
  registerNavHandler?: (handler: (dir: 'prev' | 'next') => boolean) => void;
}

const pipelineSteps = [
  { id: 'data', label: 'Data Preprocessing', detail: 'Image normalization and augmentation via Albumentations for domain shift mitigation', color: '#2563eb' },
  { id: 'model', label: 'Model Training', detail: 'EfficientNet-B0/B3 backbone with custom CNN head and compound scaling', color: '#4f46e5' },
  { id: 'explain', label: 'Grad-CAM', detail: 'Visual heatmaps on input images for clinical transparency and trust', color: '#7c3aed' },
  { id: 'export', label: 'TFLite Export', detail: 'INT8 post-training quantization -- under 25 MB model size', color: '#9333ea' },
  { id: 'deploy', label: 'On-Device', detail: '100% offline Android deployment with local image processing', color: '#059669' },
];

export default function Slide5Architecture(_: SlideProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseRef = useRef<number>(0);

  const handleStepClick = (i: number) => {
    setActiveStep(i);
    setIsPaused(true);
    clearTimeout(pauseRef.current);
    pauseRef.current = window.setTimeout(() => setIsPaused(false), 25000);
  };

  useEffect(() => () => clearTimeout(pauseRef.current), []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setActiveStep(p => (p + 1) % pipelineSteps.length), 1800);
    return () => clearInterval(id);
  }, [isPaused]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', maxWidth: 1300, alignSelf: 'flex-start' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 36 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Engineering</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 700, color: 'var(--text)', marginTop: 6, lineHeight: 1.1 }}>Technical Architecture</h2>
      </motion.div>

      {/* Horizontal pipeline */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        style={{ display: 'flex', alignItems: 'flex-start', gap: 0, marginBottom: 28, position: 'relative', minHeight: 120 }}>
        {pipelineSteps.map((step, i) => {
          const isActive = i === activeStep;
          const isPast = i < activeStep;
          return (
            <div key={step.id} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <motion.button onClick={() => handleStepClick(i)}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.06 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 4px' }}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5, boxShadow: `0 0 16px ${step.color}60` }}
                  animate={{ scale: isActive ? 1.15 : 1, boxShadow: isActive ? `0 0 24px ${step.color}40` : 'none' }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isActive ? step.color : isPast ? '#059669' : 'var(--surface)',
                    border: `2px solid ${isActive ? step.color : isPast ? '#059669' : 'var(--border)'}`,
                    transition: 'background 0.3s, border-color 0.3s',
                  }}>
                  {isPast && !isActive ? (
                    <CheckCircle2 size={16} style={{ color: '#fff' }} />
                  ) : (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: isActive ? '#fff' : 'var(--text-muted)' }}>{String(i + 1).padStart(2, '0')}</span>
                  )}
                </motion.div>
                <div style={{ textAlign: 'center', minHeight: 50 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: isActive ? step.color : 'var(--text-soft)', fontFamily: 'var(--font-display)', transition: 'color 0.2s', lineHeight: 1.3 }}>{step.label}</div>
                  <motion.p
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, marginTop: 4, pointerEvents: isActive ? 'auto' : 'none' }}>
                    {step.detail}
                  </motion.p>
                </div>
              </motion.button>
              {i < pipelineSteps.length - 1 && (
                <ArrowRight size={16} style={{ color: 'var(--border-light)', flexShrink: 0, marginTop: -20 }} />
              )}
            </div>
          );
        })}
      </motion.div>

      {/* Cards row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* Left column: EfficientNet + Training Config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* EfficientNet architecture card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            whileHover={{ y: -4, boxShadow: '0 12px 24px -10px rgba(0,0,0,0.08)' }}
            style={{ position: 'relative', overflow: 'hidden', padding: 32, borderRadius: 20, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '2px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', transition: 'box-shadow 0.3s ease' }}>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>EfficientNet-B0/B3 Architecture</div>

            {/* Flow nodes */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
              {[
                { label: '224x224', sub: 'Input', color: '#2563eb' },
                { label: 'MBConv x7', sub: 'Feature Blocks', color: '#4f46e5' },
                { label: 'GAP', sub: 'Avg Pool', color: '#7c3aed' },
                { label: 'Dense', sub: 'Classify', color: '#059669' },
              ].map((node, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <motion.div whileHover={{ y: -3, scale: 1.05, boxShadow: `0 4px 12px -4px ${node.color}40` }}
                    style={{ padding: '10px 14px', borderRadius: 10, background: `${node.color}0a`, border: `2px solid ${node.color}25`, textAlign: 'center', cursor: 'default' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: node.color, fontFamily: 'var(--font-mono)' }}>{node.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{node.sub}</div>
                  </motion.div>
                  {i < 3 && <ArrowRight size={14} style={{ color: 'var(--border-light)', flexShrink: 0 }} />}
                </div>
              ))}
            </div>

            <p style={{ fontSize: 15, color: 'var(--text-soft)', lineHeight: 1.7, marginBottom: 20 }}>
              Compound scaling balances depth, width, and resolution. MBConv blocks extract borders, colour patterns, and texture asymmetry -- critical for lesion classification.
            </p>

            {/* Key stats */}
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'Parameters', value: '12M', color: '#2563eb' },
                { label: 'Input Size', value: '224px', color: '#4f46e5' },
                { label: 'Target AUC', value: '0.87+', color: '#059669' },
              ].map(m => (
                <div key={m.label} style={{ flex: 1, padding: '12px 10px', borderRadius: 12, background: 'var(--bg)', border: '2px solid var(--border)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: m.color }}>{m.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{m.label}</div>
                </div>
              ))}
            </div>
            </div>
          </motion.div>

          {/* Training Configuration card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            whileHover={{ y: -4, boxShadow: '0 8px 24px -10px rgba(37,99,235,0.15)' }}
            style={{ padding: '18px 24px', borderRadius: 16, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '2px solid rgba(37,99,235,0.12)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', transition: 'box-shadow 0.3s ease' }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#2563eb', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Training Configuration</div>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'Optimizer', value: 'Adam', color: '#2563eb' },
                { label: 'LR Schedule', value: 'Cosine', color: '#4f46e5' },
                { label: 'Epochs', value: '50', color: '#7c3aed' },
                { label: 'Batch Size', value: '32', color: '#059669' },
              ].map(m => (
                <div key={m.label} style={{ flex: 1, padding: '10px 8px', borderRadius: 10, background: `${m.color}06`, border: `2px solid ${m.color}15`, textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: m.color }}>{m.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column: Mobile + Explainability */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Mobile optimization */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            whileHover={{ y: -4, boxShadow: '0 12px 24px -10px rgba(5,150,105,0.15)' }}
            style={{ padding: 28, borderRadius: 20, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '2px solid rgba(5,150,105,0.15)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', transition: 'box-shadow 0.3s ease' }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--correct)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Mobile Optimization</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
              {[
                { label: 'INT8 Quantization', color: '#059669' },
                { label: '< 25 MB Model', color: '#059669' },
                { label: '100% Offline', color: '#2563eb' },
                { label: 'Android Deploy', color: '#2563eb' },
                { label: 'TensorFlow Lite', color: '#d97706' },
              ].map(b => (
                <span key={b.label} style={{ padding: '8px 16px', borderRadius: 10, background: `${b.color}0a`, border: `2px solid ${b.color}20`, fontSize: 13, color: b.color, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{b.label}</span>
              ))}
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Model is quantized to INT8 for efficient on-device inference on low-end Android devices without any network dependency.
            </p>
          </motion.div>

          {/* Explainability card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            whileHover={{ y: -4, boxShadow: '0 12px 24px -10px rgba(124,58,237,0.15)' }}
            style={{ padding: 28, borderRadius: 20, background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '2px solid rgba(124,58,237,0.15)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', flex: 1, transition: 'box-shadow 0.3s ease' }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#7c3aed', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Grad-CAM Explainability</div>
            <p style={{ fontSize: 15, color: 'var(--text-soft)', lineHeight: 1.7, marginBottom: 16 }}>
              Visual attention heatmaps show exactly which regions of the lesion the model focused on, building trust with health workers and enabling clinical validation.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'Transparency', desc: 'See model reasoning', color: '#7c3aed' },
                { label: 'Validation', desc: 'Clinician verification', color: '#4f46e5' },
              ].map(item => (
                <div key={item.label} style={{ flex: 1, padding: '12px 14px', borderRadius: 12, background: `${item.color}06`, border: `2px solid ${item.color}15` }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: item.color, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
