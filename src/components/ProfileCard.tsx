'use client';
import React, { useRef, useCallback } from 'react';
import './ProfileCard.css';

interface ProfileCardProps {
  avatarUrl: string;
  name: string;
  title: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  onContactClick?: () => void;
  className?: string; // <-- added className
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl,
  name,
  title,
  handle,
  status = 'Available',
  contactText = 'Contact Me',
  showUserInfo = true,
  enableTilt = true,
  onContactClick,
  className = '', // <-- default empty string
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!enableTilt || !cardRef.current || !wrapRef.current) return;

      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const centerX = e.clientX - rect.left - rect.width / 2;
      const centerY = e.clientY - rect.top - rect.height / 2;

      card.style.transform = `rotateY(${centerX * 0.05}deg) rotateX(${
        -centerY * 0.05
      }deg)`;
    },
    [enableTilt]
  );

  const handlePointerLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper ${className}`} // <-- apply className here
      onPointerMove={handlePointerMove as any}
      onPointerLeave={handlePointerLeave as any}
    >
      <section ref={cardRef} className="pc-card">
        <div className="pc-content">
          <img src={avatarUrl} alt={`${name} avatar`} className="avatar" />
          <div className="pc-details">
            <h3>{name}</h3>
            <p>{title}</p>
            {showUserInfo && handle && <p className="pc-handle">@{handle}</p>}
            <p className="pc-status">{status}</p>
          </div>
          {showUserInfo && (
            <button className="pc-contact-btn" onClick={onContactClick}>
              {contactText}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default React.memo(ProfileCard);
