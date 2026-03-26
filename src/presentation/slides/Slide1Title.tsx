import { motion } from 'framer-motion';

interface SlideProps {
  registerNavHandler?: (handler: (dir: 'prev' | 'next') => boolean) => void;
}

function DermAidMark() {
  return (
    <svg viewBox="0 0 64 64" style={{ width: 88, height: 88 }}>
      <defs>
        <linearGradient id="mark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#mark-grad)" />
      <rect x="27" y="16" width="10" height="32" rx="3" fill="#ffffff" />
      <rect x="16" y="27" width="32" height="10" rx="3" fill="#ffffff" />
    </svg>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.18 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Slide1Title(_: SlideProps) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 900, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      {/* Awesome Aurora Background Hook */}
      <div style={{ position: 'absolute', inset: -200, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 100, 0], y: [0, -50, 0], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: '10%', left: '20%', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 60%)', filter: 'blur(100px)' }} />
        <motion.div animate={{ scale: [1.2, 1, 1.2], x: [0, -100, 0], y: [0, 100, 0], opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: '30%', right: '10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 60%)', filter: 'blur(120px)' }} />
      </div>

      <motion.div variants={container} initial="hidden" animate="show" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Logo */}
        <motion.div variants={item} style={{ marginBottom: 36 }}>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 100 }}
            style={{ position: 'relative' }}
          >
            <DermAidMark />
            <div style={{ position: 'absolute', inset: -8, borderRadius: 24, background: 'rgba(37,99,235,0.15)', filter: 'blur(16px)', zIndex: -1 }} />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1 variants={item} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(72px, 12vw, 120px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 20 }}>
          DermAid
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={item} style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', color: 'var(--text-soft)', maxWidth: 640, lineHeight: 1.5, marginBottom: 48 }}>
          AI-Powered Skin Lesion Classification for Rural Healthcare
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{ width: 120, height: 2, background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', borderRadius: 1, marginBottom: 48 }}
        />

        {/* Quote */}
        <motion.blockquote variants={item} style={{ maxWidth: 560 }}>
          <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'var(--text-soft)', fontStyle: 'italic', lineHeight: 1.6 }}>
            "Democratizing dermatological expertise for 900 million rural Indians."
          </p>
          <footer style={{ marginTop: 16, fontSize: 14, color: 'var(--text-muted)' }}>
            -- Team Task 3 Q1
          </footer>
        </motion.blockquote>
      </motion.div>
    </div>
  );
}
