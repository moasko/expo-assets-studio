import { IconButtonProps } from '../../types';
import { Tooltip } from './Tooltip';

export const IconButton = ({ icon: Icon, onClick, active, label, tooltip }: IconButtonProps) => (
  <Tooltip text={tooltip || ""} position="bottom">
    <button
      onClick={onClick}
      aria-label={tooltip || label || "Action button"}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 ${
        active 
        ? 'bg-[#0066ff] text-white shadow-sm shadow-[#0066ff]/20' 
        : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a]'
      }`}
    >
      <Icon size={14} strokeWidth={2} />
      {label && <span>{label}</span>}
    </button>
  </Tooltip>
);
