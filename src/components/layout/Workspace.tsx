import { Grid3x3, Apple, Smartphone, FileImage, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStudio } from '../../context/StudioContext';
import { MockupPreview } from '../features/MockupPreview';

const DIMENSIONS: Record<string, string> = {
  'icon': '1024 × 1024',
  'splash': '2048 × 2048',
  'adaptive-icon': '1024 × 1024',
  'favicon': '48 × 48',
};

export const Workspace = () => {
  const { 
    assetType, 
    logoUrl, 
    previewDevice, setPreviewDevice, 
    fileInputRef 
  } = useStudio();

  return (
    <main className="flex-1 bg-[#09090b] overflow-auto flex flex-col relative">
      {/* ── Toolbar ── */}
      <div className="h-11 bg-[#18181b]/80 backdrop-blur-md border-b border-[#27272a] flex items-center justify-between px-5 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Grid3x3 size={13} className="text-[#71717a]" />
            <span className="text-[12px] font-medium text-[#a1a1aa]">Canvas</span>
          </div>
          <span className="text-[11px] font-mono font-medium text-[#fafafa] bg-[#27272a] px-2 py-1 rounded-md tabular-nums">
            {DIMENSIONS[assetType] || '1024 × 1024'} px
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <span className="text-[11px] text-[#71717a] font-medium">Live</span>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="flex bg-[#27272a] p-[3px] rounded-lg relative">
          <motion.div 
            className="absolute bg-[#3f3f46] rounded-[7px] h-[calc(100%-6px)] top-[3px]"
            initial={false}
            animate={{ 
              left: previewDevice === 'ios' ? '3px' : 'calc(50% + 1px)',
              width: 'calc(50% - 4px)'
            }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
          <button 
            onClick={() => setPreviewDevice('ios')}
            className={`px-4 py-1.5 relative z-10 rounded-[7px] text-[12px] font-medium transition-colors flex items-center gap-2 ${
              previewDevice === 'ios' ? 'text-[#fafafa]' : 'text-[#71717a]'
            }`}
          >
            <Apple size={12} /> iOS
          </button>
          <button 
            onClick={() => setPreviewDevice('android')}
            className={`px-4 py-1.5 relative z-10 rounded-[7px] text-[12px] font-medium transition-colors flex items-center gap-2 ${
              previewDevice === 'android' ? 'text-[#fafafa]' : 'text-[#71717a]'
            }`}
          >
            <Smartphone size={12} /> Android
          </button>
        </div>
      </div>

      {/* ── Preview Area ── */}
      <div className="flex-1 flex items-center justify-center p-12 min-h-[700px] relative">
        {/* Removed dot grid */}

        <AnimatePresence mode="wait">
          {!logoUrl ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center justify-center text-center max-w-sm relative z-10"
            >
              <div className="w-20 h-20 bg-[#18181b] border border-[#27272a] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/20 relative">
                <FileImage size={30} className="text-[#3f3f46]" strokeWidth={1.5} />
                <div className="absolute -bottom-2.5 -right-2.5 w-8 h-8 bg-[#0066ff] rounded-xl flex items-center justify-center text-white shadow-md shadow-[#0066ff]/30">
                  <Upload size={14} strokeWidth={2.5} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-[#fafafa] mb-1.5">Upload your logo</h3>
              <p className="text-[13px] text-[#71717a] leading-relaxed mb-8 max-w-[280px]">
                Drop your source asset to generate production-ready Expo icons instantly.
              </p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-[#0066ff] text-white rounded-xl text-[13px] font-semibold hover:bg-[#0052cc] shadow-md shadow-[#0066ff]/25 transition-all duration-150 flex items-center gap-2.5 active:scale-[0.97]"
              >
                <Upload size={15} />
                Select Source Logo
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="preview"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center relative z-10"
            >
              <MockupPreview />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};
