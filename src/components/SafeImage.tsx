import { useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackInitials?: string;
  fallbackLabel?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackInitials,
  fallbackLabel,
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-slate-100 text-slate-600 select-none ${className}`}
      >
        {fallbackInitials ? (
          <span className="font-display font-semibold text-base tracking-tight text-slate-700">
            {fallbackInitials}
          </span>
        ) : (
          <div className="flex flex-col items-center gap-1.5 px-3 text-center">
            <GraduationCap className="w-6 h-6 text-blue-600" aria-hidden="true" />
            {fallbackLabel && (
              <span className="text-xs font-medium text-slate-600">{fallbackLabel}</span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
