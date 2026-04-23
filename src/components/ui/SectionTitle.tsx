import { SectionTitleProps } from '../../types';

export const SectionTitle = ({ children, className = "" }: SectionTitleProps) => (
  <h2 className={`text-[11px] font-medium text-[#71717a] uppercase tracking-wider mb-2.5 ${className}`}>
    {children}
  </h2>
);
