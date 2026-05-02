import { useRef, WheelEvent } from 'react';
import { Grid3x3, Apple, Smartphone, FileImage, Upload, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStudio } from '../../context/StudioContext';
import { MockupPreview } from '../features/MockupPreview';
import { ScreenshotPreview } from '../features/ScreenshotPreview';

const DIMENSIONS: Record<string, string> = {
  'icon': '1024 × 1024',
  'splash': '2048 × 2048',
  'adaptive-foreground': '1024 × 1024',
  'favicon': '48 × 48',
};

export const Workspace = () => {
  const { 
    assetType, 
    logoUrl, 
    previewDevice, setPreviewDevice, 
    fileInputRef,
    appMode,
    screenshots,
    activeScreenshotId,
    setActiveScreenshotId,
    addScreenshot,
    updateScreenshotConfig
  } = useStudio();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: WheelEvent) => {
    if (appMode === 'screenshots' && scrollContainerRef.current) {
      // If scrolling vertically, move horizontally
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  const isAssets = appMode === 'assets';
  const activeScreenshot = screenshots?.find(s => s.id === activeScreenshotId) || screenshots?.[0];
  const activeIndex = screenshots?.findIndex(s => s.id === activeScreenshotId) ?? 0;

  return (
    <main className="flex-1 bg-[#09090b] overflow-hidden flex flex-col relative">
      {/* ── Toolbar ── */}
      <div className="h-11 bg-[#18181b]/80 backdrop-blur-md border-b border-[#27272a] flex items-center justify-between px-5 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Grid3x3 size={13} className="text-[#71717a]" />
            <span className="text-[12px] font-medium text-[#a1a1aa]">
              {isAssets ? 'Asset Canvas' : 'Screenshot Canvas'}
            </span>
          </div>
          {isAssets ? (
            <span className="text-[11px] font-mono font-medium text-[#fafafa] bg-[#27272a] px-2 py-1 rounded-md tabular-nums">
              {DIMENSIONS[assetType] || '1024 × 1024'} px
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-medium text-[#fafafa] bg-[#27272a] px-2 py-1 rounded-md tabular-nums">
                1290 × 2796 px
              </span>
              <span className="text-[10px] font-mono text-[#52525b] bg-[#27272a] px-1.5 py-0.5 rounded">
                Slide {activeIndex + 1}/{screenshots?.length || 0}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <span className="text-[11px] text-[#71717a] font-medium">Live</span>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="flex bg-[#27272a] p-[3px] rounded-lg relative">
          <motion.div
            className="absolute bg-[#0066ff] rounded-[7px] h-[calc(100%-6px)] top-[3px]"
            initial={false}
            animate={{
              left: (isAssets ? previewDevice : activeScreenshot?.deviceType || 'ios') === 'ios' ? '3px' : 'calc(50% + 1px)',
              width: 'calc(50% - 4px)'
            }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
          <button
            onClick={() => isAssets ? setPreviewDevice('ios') : updateScreenshotConfig({ deviceType: 'ios' })}
            className={`px-4 py-1.5 relative z-10 rounded-[7px] text-[12px] font-medium transition-colors flex items-center gap-2 ${
              (isAssets ? previewDevice : activeScreenshot?.deviceType || 'ios') === 'ios' ? 'text-white' : 'text-[#71717a]'
            }`}
          >
            <Apple size={12} /> iOS
          </button>
          <button
            onClick={() => isAssets ? setPreviewDevice('android') : updateScreenshotConfig({ deviceType: 'android' })}
            className={`px-4 py-1.5 relative z-10 rounded-[7px] text-[12px] font-medium transition-colors flex items-center gap-2 ${
              (isAssets ? previewDevice : activeScreenshot?.deviceType || 'ios') === 'android' ? 'text-white' : 'text-[#71717a]'
            }`}
          >
            <Smartphone size={12} /> Android
          </button>
        </div>
      </div>

      {/* ── Preview Area ── */}
      <div 
        ref={scrollContainerRef}
        onWheel={handleWheel}
        className={`flex-1 overflow-auto relative ${
          isAssets ? 'p-12 flex items-center justify-center' : ''
        }`}
      >
        {/* Subtle grid pattern for screenshot mode */}
        {!isAssets && (
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />
        )}

        <AnimatePresence mode="wait">
          {isAssets ? (
            !logoUrl ? (
              <motion.div
                key="empty-assets"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
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
                key="preview-assets"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="flex flex-col items-center relative z-10"
              >
                <MockupPreview />
              </motion.div>
            )
          ) : (
            <motion.div
              key="preview-screenshots-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 w-full h-full flex items-center"
            >
              <div className="flex flex-nowrap items-center gap-2 px-20 py-10 min-w-full">
                {screenshots.map((s, idx) => (
                  <div 
                    key={s.id}
                    onClick={() => setActiveScreenshotId(s.id)}
                    className={`relative shrink-0 transition-all duration-300 cursor-pointer group ${
                      s.id === activeScreenshotId 
                      ? 'z-20' 
                      : 'opacity-80 hover:opacity-100 hover:scale-[1.01]'
                    }`}
                  >
                    {/* Selection Indicator */}
                    {s.id === activeScreenshotId && (
                      <div className="absolute -inset-1 border-2 border-orange-500 rounded-[18px] pointer-events-none z-30" />
                    )}
                    
                    <div className="w-[280px] aspect-[9/19.5] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-white/[0.06]">
                      {/* We need to pass the specific screenshot to Preview if it's not active, 
                          but currently ScreenshotPreview uses context. 
                          I'll refactor ScreenshotPreview to accept an optional screenshot prop. */}
                      <ScreenshotPreview screenshotId={s.id} />
                    </div>
                  </div>
                ))}

                {/* Add New Slide Button */}
                <button 
                  onClick={addScreenshot}
                  className="w-[280px] aspect-[9/19.5] shrink-0 rounded-2xl border-2 border-dashed border-[#27272a] bg-[#18181b]/30 hover:bg-[#18181b]/50 hover:border-[#3f3f46] transition-all duration-200 flex flex-col items-center justify-center gap-4 text-[#52525b] hover:text-[#71717a] group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#27272a]/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Upload size={24} strokeWidth={1.5} className="rotate-45" />
                  </div>
                  <span className="text-[13px] font-semibold">Add New Slide</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};
