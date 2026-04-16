import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const heroRef = useRef(null);

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
    },
    { scope: heroRef }
  );

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
    </div>
  );
};

export default HomePage;
