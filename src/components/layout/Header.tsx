import { Hexagon, RotateCcw, ExternalLink, Check, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStudio } from '../../context/StudioContext';
import { IconButton } from '../ui/IconButton';
import { Tooltip } from '../ui/Tooltip';

export const Header = () => {
  const { 
    notification, 
    resetStudio 
  } = useStudio();

  return (
    <header className="h-[52px] border-b border-[#27272a] bg-[#09090b]/90 backdrop-blur-xl px-5 flex items-center justify-between sticky top-0 z-50">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#fafafa] rounded-[10px] flex items-center justify-center text-[#09090b] shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 19.5L12 2.5L22 19.5H2Z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold text-[#fafafa] leading-tight">
            Asset Studio
          </span>
          <span className="text-[11px] text-[#71717a] leading-tight">
            Expo Engine · v2.5
          </span>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-2">
        <AnimatePresence>
          {notification && (
            <motion.div 
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium flex items-center gap-2 ${
                notification.type === 'success' 
                  ? 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20' 
                  : 'bg-[#27272a] text-[#a1a1aa] border border-[#3f3f46]'
              }`}
            >
              {notification.type === 'success' ? <Check size={13} strokeWidth={2.5} /> : <Info size={13} />}
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-5 w-px bg-[#27272a] mx-1" />

        <IconButton 
          icon={RotateCcw} 
          onClick={resetStudio} 
          tooltip="Reset all settings"
          label="Reset"
        />

        <Tooltip text="Expo docs" position="bottom">
          <a 
            href="https://docs.expo.dev/guides/app-icons/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a] transition-all duration-150"
          >
            <ExternalLink size={13} />
            <span>Docs</span>
          </a>
        </Tooltip>
      </div>
    </header>
  );
};
