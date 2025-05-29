import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export function Container({ children, className = "", ref }: ContainerProps) {
  return (
    <div className={`lg:px-[2vw] md:px-[2.5vw] px-[3.5vw] ${className}`}>
      <div ref={ref}>
        {children}
      </div>
    </div>
  );
}
