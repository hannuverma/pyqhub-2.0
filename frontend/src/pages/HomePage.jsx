import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  useGSAP(
    () => {
      gsap.from('.hero-title', {
        y: 100,
        duration: 1,
        opacity: 0,
        ease: 'power2.out',
      });
      gsap.from('.hero-subtitle', {
        y: -10,
        duration: 1,
        delay: 0.5,
        opacity: 0,
        ease: 'power2.out',
      });
      gsap.from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 1,
        ease: 'power2.out',
      });
      gsap.from('.scroll-indicator', {
        opacity: 0,
        duration: 0.6,
        delay: 1.4,
        ease: 'power2.out',
      });
    },
    { scope: heroRef }
  );

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 30 && !hasNavigated.current) {
        hasNavigated.current = true;

        const tl = gsap.timeline({
          onComplete: () => navigate('/papers'),
        });

        // Fade out scroll indicator first
        tl.to('.scroll-indicator', {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease: 'power2.in',
        });

        // Stagger the main content sliding up and fading
        tl.to(
          '.hero-title',
          {
            y: -60,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in',
          },
          0.05
        );

        tl.to(
          '.hero-subtitle',
          {
            y: -40,
            opacity: 0,
            duration: 0.45,
            ease: 'power3.in',
          },
          0.15
        );

        tl.to(
          '.hero-cta',
          {
            y: -30,
            opacity: 0,
            duration: 0.4,
            ease: 'power3.in',
          },
          0.25
        );
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [navigate]);

  return (
    <div ref={heroRef} className="home-hero">
      {/* <div className="w-[95vw] h-[90vh] home-img-div relative rounded-[80px] overflow-hidden">
        <h1 className="hero-title text-[10vw] bg-[#C68C46] text-white px-10 py-4 rounded-tr-3xl font-bold inline-block absolute bottom-0">
          PYQ's
        </h1>
        <h2 className="hero-subtitle text-[3vw] bg-[#C68C46] text-white px-10 py-4 rounded-bl-3xl font-bold inline-block absolute top-0 right-0">
          Your shortcut to exam success: PYQs
        </h2>
        <Link
          to="/papers"
          className="hero-cta absolute bottom-8 right-8 bg-white text-[#C68C46] font-bold px-6 py-3 rounded-full text-lg shadow-lg hover:scale-105 transition-transform"
        >
          Browse Papers →
        </Link>
      </div> */}
      <h1 className="hero-title home-hero-title">
        Find Previous Year{' '}
        <span className="home-hero-accent">Question Papers </span> Instantly
      </h1>
      <p className="hero-subtitle home-hero-subtitle">
        We bridge the gap between cluttered resources and organized academic
        success
      </p>
      <Link to="/papers" className="hero-cta home-hero-cta">
        Browse Papers →
      </Link>

      <div className="scroll-indicator">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 13l5 5 5-5" />
          <path d="M7 6l5 5 5-5" />
        </svg>
        <span>Scroll to explore</span>
      </div>
    </div>
  );
};

export default HomePage;
