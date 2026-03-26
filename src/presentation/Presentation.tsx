import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Monitor } from 'lucide-react';
import {
  Slide1Title,
  Slide2RuralReality,
  Slide3CriticalGaps,
  Slide4DermAid,
  Slide5Architecture,
  Slide6Dataset,
  Slide7Challenges,
  Slide8Outcomes,
  Slide9Impact,
} from './slides/index.ts';

const SLIDE_STORAGE_KEY = 'dermaid-presentation-slide';

const SLIDES = [
  { id: 1, component: Slide1Title, title: 'DermAid' },
  { id: 2, component: Slide2RuralReality, title: 'Rural Reality' },
  { id: 3, component: Slide3CriticalGaps, title: 'Critical Gaps' },
  { id: 4, component: Slide4DermAid, title: 'Introducing DermAid' },
  { id: 5, component: Slide5Architecture, title: 'Architecture' },
  { id: 6, component: Slide6Dataset, title: 'Dataset & CV' },
  { id: 7, component: Slide7Challenges, title: 'Challenges' },
  { id: 8, component: Slide8Outcomes, title: 'Outcomes & Roadmap' },
  { id: 9, component: Slide9Impact, title: 'Impact & Vision' },
];

function FloatingShapes() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <div
        style={{
          position: 'absolute', top: '20%', left: '8%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        style={{
          position: 'absolute', top: '50%', right: '5%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.025) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: 'rgba(0,0,0,0.05)', zIndex: 100 }}>
      <motion.div
        style={{ height: '100%', background: 'linear-gradient(90deg, #2563eb, #7c3aed, #2563eb)', boxShadow: '0 0 10px rgba(37,99,235,0.8)' }}
        initial={{ width: 0 }}
        animate={{ width: `${((current + 1) / total) * 100}%` }}
        transition={{ duration: 0.6, ease: 'circOut' }}
      />
    </div>
  );
}

function SlideIndicator({ current, total, onSelect }: { current: number; total: number; onSelect: (i: number) => void }) {
  return (
    <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 50, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onSelect(i)}
          animate={{ width: i === current ? 32 : 10 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          title={SLIDES[i].title}
          style={{
            height: 8, borderRadius: 4, border: 'none', cursor: 'pointer',
            background: i === current ? 'var(--accent)' : 'var(--border)',
          }}
        />
      ))}
    </div>
  );
}

function NavigationControls({
  onPrev, onNext, canGoPrev, canGoNext,
  isFullscreen, onToggleFullscreen, currentSlide, totalSlides,
}: {
  onPrev: () => void; onNext: () => void;
  canGoPrev: boolean; canGoNext: boolean;
  isFullscreen: boolean; onToggleFullscreen: () => void;
  currentSlide: number; totalSlides: number;
}) {
  const btnBase: React.CSSProperties = {
    padding: 10, borderRadius: 10,
    background: 'var(--surface)', backdropFilter: 'blur(8px)',
    border: '1px solid var(--border)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s', cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  };

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, display: 'flex', alignItems: 'center', gap: 8, zIndex: 50 }}>
      <span style={{ fontSize: 13, color: 'var(--text-muted)', marginRight: 6, fontFamily: 'var(--font-mono)' }}>
        {currentSlide + 1} / {totalSlides}
      </span>
      <button onClick={onPrev} disabled={!canGoPrev} style={{ ...btnBase, color: canGoPrev ? 'var(--text-soft)' : 'var(--border)', opacity: canGoPrev ? 1 : 0.4, cursor: canGoPrev ? 'pointer' : 'not-allowed' }}>
        <ChevronLeft size={18} />
      </button>
      <button onClick={onNext} disabled={!canGoNext} style={{ ...btnBase, color: canGoNext ? 'var(--text-soft)' : 'var(--border)', opacity: canGoNext ? 1 : 0.4, cursor: canGoNext ? 'pointer' : 'not-allowed' }}>
        <ChevronRight size={18} />
      </button>
      <button onClick={onToggleFullscreen} style={{ ...btnBase, color: 'var(--text-soft)' }}>
        {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
      </button>
    </div>
  );
}

function MobileWarning() {
  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      zIndex: 9999,
      padding: 24
    }}>
      <div style={{ 
        maxWidth: 400, 
        textAlign: 'center', 
        color: 'white' 
      }}>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}
        >
          <Monitor size={64} strokeWidth={1.5} />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ 
            fontSize: 28, 
            fontWeight: 700, 
            marginBottom: 16,
            fontFamily: 'var(--font-display)'
          }}
        >
          Desktop Required
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ 
            fontSize: 16, 
            lineHeight: 1.6, 
            opacity: 0.95 
          }}
        >
          This presentation is optimized for desktop viewing. Please open this link on a desktop or laptop computer for the best experience.
        </motion.p>
      </div>
    </div>
  );
}

function FullscreenPrompt({ onEnterFullscreen, onDismiss }: { onEnterFullscreen: () => void; onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9998,
        padding: 24
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          background: 'white',
          borderRadius: 24,
          padding: 48,
          maxWidth: 500,
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}
        >
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
          }}>
            <Maximize2 size={36} color="white" strokeWidth={2.5} />
          </div>
        </motion.div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28,
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: 16
        }}>
          Experience in Fullscreen
        </h2>

        <p style={{
          fontSize: 16,
          lineHeight: 1.6,
          color: 'var(--text-soft)',
          marginBottom: 32
        }}>
          For the best viewing experience, we recommend viewing this presentation in fullscreen mode. Enjoy immersive animations and distraction-free content.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnterFullscreen}
            style={{
              padding: '14px 32px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              color: 'white',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <Maximize2 size={18} />
            Enter Fullscreen
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDismiss}
            style={{
              padding: '14px 32px',
              borderRadius: 12,
              border: '2px solid var(--border)',
              background: 'transparent',
              color: 'var(--text-soft)',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Skip
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(() => {
    const saved = localStorage.getItem(SLIDE_STORAGE_KEY);
    return saved ? Math.min(parseInt(saved, 10), SLIDES.length - 1) : 0;
  });
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideNavHandlerRef = useRef<((direction: 'prev' | 'next') => boolean) | null>(null);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload all images
  useEffect(() => {
    const imagesToPreload = [
      '/atypical_nevus.png',
      '/benign_mole.png',
      '/suspected_melanoma.png',
    ];

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    imagesToPreload.forEach(src => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesPreloaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesPreloaded(true);
        }
      };
      img.src = src;
    });

    // Set preloaded to true after 3 seconds even if images haven't loaded
    const timeout = setTimeout(() => setImagesPreloaded(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  // Show fullscreen prompt after images are preloaded
  useEffect(() => {
    if (!isMobile && imagesPreloaded && !document.fullscreenElement) {
      const timer = setTimeout(() => {
        setShowFullscreenPrompt(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isMobile, imagesPreloaded]);

  const handleEnterFullscreen = useCallback(() => {
    setShowFullscreenPrompt(false);
    containerRef.current?.requestFullscreen().catch(() => {
      // Silently fail if fullscreen is not supported or blocked
    });
  }, []);

  const handleDismissPrompt = useCallback(() => {
    setShowFullscreenPrompt(false);
  }, []);

  useEffect(() => { localStorage.setItem(SLIDE_STORAGE_KEY, currentSlide.toString()); }, [currentSlide]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) { setDirection(1); setCurrentSlide(prev => prev + 1); }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) { setDirection(-1); setCurrentSlide(prev => prev - 1); }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight': case ' ':
          e.preventDefault();
          if (slideNavHandlerRef.current && slideNavHandlerRef.current('next')) return;
          nextSlide(); break;
        case 'ArrowLeft':
          e.preventDefault();
          if (slideNavHandlerRef.current && slideNavHandlerRef.current('prev')) return;
          prevSlide(); break;
        case 'f': case 'F': e.preventDefault(); toggleFullscreen(); break;
        case 'Escape': if (isFullscreen) document.exitFullscreen(); break;
        default: { const num = parseInt(e.key); if (num >= 1 && num <= SLIDES.length) goToSlide(num - 1); }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, isFullscreen]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) { containerRef.current?.requestFullscreen(); setIsFullscreen(true); }
    else { document.exitFullscreen(); setIsFullscreen(false); }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  useEffect(() => { slideNavHandlerRef.current = null; }, [currentSlide]);

  const registerNavHandler = useCallback((handler: (direction: 'prev' | 'next') => boolean) => {
    slideNavHandlerRef.current = handler;
  }, []);

  const CurrentSlideComponent = SLIDES[currentSlide].component;

  // Show mobile warning on mobile devices
  if (isMobile) {
    return <MobileWarning />;
  }

  return (
    <>
      <AnimatePresence>
        {showFullscreenPrompt && (
          <FullscreenPrompt 
            onEnterFullscreen={handleEnterFullscreen}
            onDismiss={handleDismissPrompt}
          />
        )}
      </AnimatePresence>

      <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100vh', background: 'var(--bg)', backgroundColor: '#fafafa', backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.08) 1px, transparent 0)', backgroundSize: '24px 24px', overflow: 'hidden' }}>
      <FloatingShapes />
      <NavigationControls onPrev={prevSlide} onNext={nextSlide} canGoPrev={currentSlide > 0} canGoNext={currentSlide < SLIDES.length - 1} isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} currentSlide={currentSlide} totalSlides={SLIDES.length} />
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: direction * 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -80 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 36px 44px' }}
        >
          <CurrentSlideComponent registerNavHandler={registerNavHandler} />
        </motion.div>
      </AnimatePresence>
      <SlideIndicator current={currentSlide} total={SLIDES.length} onSelect={goToSlide} />
      <ProgressBar current={currentSlide} total={SLIDES.length} />
      <div style={{ position: 'fixed', bottom: 24, right: 24, fontSize: 11, color: 'var(--text-muted)', zIndex: 40, fontFamily: 'var(--font-mono)' }}>
        Arrow keys navigate // F fullscreen // 1-9 jump
      </div>
    </div>
    </>
  );
}
