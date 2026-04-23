import { TooltipProps } from '../../types';

export const Tooltip = ({ children, text, position = 'right', className = "" }: TooltipProps) => {
  if (!text) return <>{children}</>;

  return (
    <div className={`group relative inline-flex items-center ${className}`}>
      {children}
      <div className={`absolute pointer-events-none z-[100] ${
        position === 'right' ? 'left-full ml-2.5 top-1/2 -translate-y-1/2' : 
        position === 'top' ? 'bottom-full mb-2.5 left-1/2 -translate-x-1/2' :
        'top-full mt-2.5 left-1/2 -translate-x-1/2'
      }`}>
        <div className="relative px-2.5 py-1.5 bg-[#fafafa] text-[#09090b] text-[11px] font-medium rounded-lg shadow-xl shadow-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap max-w-[200px] leading-snug text-center">
          {text}
          {position === 'right' && <div className="absolute right-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-[#fafafa]" />}
          {position === 'top' && <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#fafafa]" />}
          {position === 'bottom' && <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-b-[#fafafa]" />}
        </div>
      </div>
    </div>
  );
};
