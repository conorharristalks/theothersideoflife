import React from 'react';

interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export function ContentWrapper({ children, className = "", ref }: ContentWrapperProps) {
  return (
    <div ref={ref} className={`bg-primary-light w-full ${className}`}>
      {children}
    </div>
  );
}
