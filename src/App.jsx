import React, { useState, useEffect } from 'react';
import SkipCard from './components/SkipCard';
import skipImage1 from './components/images/4-yarder.jpg';
import skipImage2 from './components/images/5-yarder-skip.jpg';
import skipImage3 from './components/images/6-yarder-skip.jpg';
import skipImage4 from './components/images/8-yarder-skip.jpg';
import skipImage5 from './components/images/10-yarder-skip.jpg';
import skipImage6 from './components/images/12-yarder-skip.jpg';
import skipImage7 from './components/images/14-yarder-skip.jpg';
import skipImage8 from './components/images/16-yarder-skip.jpg';
import skipImage9 from './components/images/20-yarder-skip.jpg';
import skipImage10 from './components/images/40-yarder-skip.jpg';
import {
  FiMapPin,
  FiTrash2,
  FiTruck,
  FiShield,
  FiCalendar,
  FiCreditCard,
} from 'react-icons/fi';

function App() {
  const [selectedSize, setSelectedSize] = useState(null); // no default selection
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

const skipOptions = [
  { size: 4, hirePeriod: '14 day', price: 211, image: skipImage1 ,notAllowed:false},
  { size: 5, hirePeriod: '14 day', price: 241, image: skipImage2 ,notAllowed:false},
  { size: 6, hirePeriod: '14 day', price: 264, image: skipImage3 ,notAllowed:false},
  { size: 8, hirePeriod: '14 day', price: 295, image: skipImage4 ,notAllowed:false},
  { size: 10, hirePeriod: '14 day', price: 356, image: skipImage5 ,notAllowed:true},
  { size: 12, hirePeriod: '14 day', price: 390, image: skipImage6 ,notAllowed:true},
  { size: 14, hirePeriod: '14 day', price: 434, image: skipImage7 ,notAllowed:true},
  { size: 16, hirePeriod: '7 day', price: 510, image: skipImage8 ,notAllowed:true},
  { size: 20, hirePeriod: '14 day', price: 802, image: skipImage9 ,notAllowed:true},
  { size: 40, hirePeriod: '14 day', price: 877, image: skipImage10 ,notAllowed:true},
];

  const steps = [
    { icon: <FiMapPin />, label: 'Postcode', active: true },
    { icon: <FiTrash2 />, label: 'Waste Type', active: true },
    { icon: <FiTruck />, label: 'Select Skip', active: true },
    { icon: <FiShield />, label: 'Permit Check', active: false },
    { icon: <FiCalendar />, label: 'Choose Date', active: false },
    { icon: <FiCreditCard />, label: 'Payment', active: false },
  ];

  // Smooth cursor follower setup
  useEffect(() => {
    const handleMouseMove = (e) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;

    const follow = () => {
      setCursorPos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;

        return {
          x: prev.x + dx * 0.1,
          y: prev.y + dy * 0.1,
        };
      });

      animationFrameId = requestAnimationFrame(follow);
    };

    follow();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetPos]);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0f0f0f, #1f1f1f)',
        minHeight: '100vh',
        width: '100vw',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Stepper */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {steps.map((step, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: step.active ? '#3fa9f5' : '#666',
              fontSize: '14px',
              cursor: step.active ? 'pointer' : 'not-allowed',
              opacity: step.active ? 1 : 0.5,
            }}
            title={step.active ? '' : 'This step is disabled'}
          >
            {step.icon}
            <span>{step.label}</span>
            {idx < steps.length - 1 && (
              <div
                style={{
                  width: '24px',
                  height: '2px',
                  backgroundColor: step.active ? '#3fa9f5' : '#333',
                  margin: '0 8px',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Heading */}
      <h1
        style={{
          color: '#fff',
          marginBottom: '10px',
          textAlign: 'center',
          fontSize: '36px',
          fontWeight: '700',
        }}
      >
        Select Your Ideal Skip
      </h1>
      <p
        style={{
          color: '#bbb',
          fontSize: '16px',
          marginBottom: '40px',
          textAlign: 'center',
          maxWidth: '500px',
        }}
      >
        Choose the perfect skip size for your project. Fast delivery. No hassle.
      </p>

      {/* Skip Card Grid */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '28px',
          maxWidth: '1200px',
          width: '100%',
          paddingBottom: '140px',
        }}
      >
        {skipOptions.map((skip) => (
          <SkipCard
            key={skip.size}
            {...skip}
            selected={selectedSize === skip.size}
            onSelect={() => setSelectedSize(skip.size)}
          />
        ))}
      </div>

      {/* Cursor Follower */}
      <div
        style={{
          position: 'fixed',
          top: cursorPos.y,
          left: cursorPos.x,
          width: '16px',
          height: '16px',
          backgroundColor: '#3fa9f5',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          boxShadow: '0 0 12px rgba(63, 169, 245, 0.6)',
        }}
      ></div>

      {/* Bottom Bar (Only if a card is selected) */}
      {selectedSize !== null && (
        <div
          style={{
            // height: '5%',
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: 'black',
            borderTop: '1px solid #333',
            padding: '14px 28px',
            zIndex: 1000,
          }}
        >
          {/* Disclaimer */}
          <p
            style={{
              fontSize: '13px',
              color: '#999',
              textAlign: 'center',
              marginBottom: '12px',
            }}
          >
            Imagery and information shown throughout this website may not reflect the exact shape or size
            specification, colours may vary, options and/or accessories may be featured at additional cost.
          </p>

          {/* Info + Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              rowGap: '12px',
              padding: '12px',
              width: '90%',
              margin: '0 auto',
              borderRadius: '10px',
            }}
          >
            {/* Skip Info */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '16px',
                color: '#fff',
                fontSize: '16px',
              }}
            >
              <span>{selectedSize} Yard Skip</span>
              <span style={{ color: '#3fa9f5', fontWeight: 'bold', fontSize: '20px' }}>
                £{skipOptions.find((s) => s.size === selectedSize)?.price}
              </span>
              <span style={{ color: '#aaa', fontSize: '14px' }}>
                {skipOptions.find((s) => s.size === selectedSize)?.hirePeriod} hire
              </span>
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#333',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Back
              </button>
              <button
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#0072ff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                Continue <span style={{ fontSize: '18px' }}>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;