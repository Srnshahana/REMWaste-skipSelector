import React, { useEffect, useState } from 'react';

function SkipCard({ size, hirePeriod, price, image, selected, onSelect, notAllowed }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <div
      onClick={onSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        backgroundColor: '#1d1d1d',
        color: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '360px',
        cursor: 'pointer',

        transform: visible
          ? hovered
            ? 'scale(1.04)'
            : selected
            ? 'scale(1.03)'
            : 'scale(1)'
          : 'scale(0.8)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.35s ease',
        boxShadow: selected
          ? '0 0 20px rgba(63, 169, 245, 0.7)'
          : hovered
          ? '0 10px 24px rgba(63, 169, 245, 0.4)'
          : '0 4px 16px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative' }}>
        <img
          src={image}
          alt={`${size} Yard Skip`}
          style={{
            width: '100%',
            height: '220px',
            objectFit: 'cover',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
          }}
        />

        {/* Size Tag */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: '#3fa9f5',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          }}
        >
          {size} Yards
        </div>

        {/* Not Allowed On The Road Badge */}
        {notAllowed && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              backgroundColor: '#000',
              color: '#FFD700',
              fontWeight: 'bold',
              fontSize: '12px',
              padding: '6px 10px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            }}
          >
            <span style={{ marginRight: '6px' }}>⚠️</span> Not Allowed On The Road
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
          {size} Yard Skip
        </h3>
        <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '12px' }}>
          {hirePeriod} hire period
        </p>
        <p
          style={{
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#00c6ff',
            marginBottom: '20px',
          }}
        >
          £{price}
        </p>

        <button
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            background: selected
              ? 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)'
              : '#2d2d2d',
            boxShadow: selected
              ? '0 4px 12px rgba(0, 198, 255, 0.5)'
              : 'none',
            transition: 'all 0.3s ease',
            letterSpacing: '0.3px',
          }}
        >
          {selected ? '✓ Selected' : 'Select This Skip'}
        </button>
      </div>
    </div>
  );
}

export default SkipCard;
