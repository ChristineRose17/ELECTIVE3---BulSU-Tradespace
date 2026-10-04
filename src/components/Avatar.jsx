import React from 'react';

export default function Avatar({ name = 'Juan Dela Cruz', size = 'md', className = '', style = {} }) {
  const getInitials = (n) => {
    if (!n) return 'U';
    const parts = n.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(name);

  const sizeStyles = {
    sm: { width: '28px', height: '28px', fontSize: '11px' },
    md: { width: '38px', height: '38px', fontSize: '13px' },
    lg: { width: '48px', height: '48px', fontSize: '16px' },
    xl: { width: '84px', height: '84px', fontSize: '28px' },
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;

  return (
    <div
      className={`tradespace-avatar ${className}`}
      style={{
        ...currentSize,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #7b1113 0%, #961b1e 100%)',
        color: '#ffffff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        letterSpacing: '0.04em',
        boxShadow: '0 2px 6px rgba(123, 17, 19, 0.25)',
        border: '2px solid #f59e0b',
        flexShrink: 0,
        userSelect: 'none',
        ...style,
      }}
      aria-label={name}
      title={name}
    >
      <span>{initials}</span>
    </div>
  );
}
