import React, { useState } from 'react';
import { DEFAULT_LOGO_URL } from '../types';

interface RatnaafinLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const RatnaafinLogo: React.FC<RatnaafinLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);

  // Height mappings for pristine rendering across header and modals
  const sizeClasses = {
    sm: 'h-8 max-h-8 max-w-[170px]',
    md: 'h-10 max-h-10 max-w-[220px]',
    lg: 'h-13 max-h-13 max-w-[280px]',
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={imgError ? '/ratnaafin_logo.png' : DEFAULT_LOGO_URL}
        alt="Ratnaafin - NBFC for Business Owners"
        crossOrigin="anonymous"
        className={`${sizeClasses} w-auto object-contain shrink-0`}
        onError={() => setImgError(true)}
        loading="eager"
      />
    </div>
  );
};

export const RatnaafinIconOnly: React.FC<{ size?: number; className?: string }> = ({
  size = 38,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden rounded-md ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={imgError ? '/ratnaafin_logo.png' : DEFAULT_LOGO_URL}
        alt="Ratnaafin"
        crossOrigin="anonymous"
        className="w-full h-full object-contain"
        onError={() => setImgError(true)}
      />
    </div>
  );
};
