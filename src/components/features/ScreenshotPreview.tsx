import { useMemo } from 'react';
import { useStudio } from '../../context/StudioContext';
import { Wifi, Battery, Signal } from 'lucide-react';
import iphoneMockup from '@/assets/iphone17.png';

export const ScreenshotPreview = ({ screenshotId }: { screenshotId?: string }) => {
  const { screenshots, activeScreenshotId } = useStudio();
  const idToUse = screenshotId || activeScreenshotId;
  const activeScreenshot = screenshots.find(s => s.id === idToUse) || screenshots[0];
  
  if (!activeScreenshot) return null;
  
  const isIOS = activeScreenshot.deviceType === 'ios';



  const textContent = (
    <div className={`flex flex-col gap-3 px-8 ${activeScreenshot.layout === 'center' ? 'text-center items-center' : 'text-center items-center'}`}>
      {activeScreenshot.showTitle && (
        <h1 
          className="font-extrabold leading-[1.1] tracking-tight max-w-[360px]" 
          style={{ 
            color: activeScreenshot.titleColor, 
            fontSize: `${activeScreenshot.fontSize}px`,
            fontFamily: activeScreenshot.fontFamily,
            textShadow: '0 2px 20px rgba(0,0,0,0.15)'
          }}
        >
          {activeScreenshot.title}
        </h1>
      )}
      {activeScreenshot.showSubtitle && (
        <p 
          className="font-medium leading-relaxed max-w-[320px]" 
          style={{ 
            color: activeScreenshot.subtitleColor,
            fontSize: `${Math.max(14, activeScreenshot.fontSize * 0.45)}px`,
            fontFamily: activeScreenshot.fontFamily,
            textShadow: '0 1px 10px rgba(0,0,0,0.1)'
          }}
        >
          {activeScreenshot.subtitle}
        </p>
      )}
    </div>
  );

  const deviceMockup = (
    <div 
      className="relative w-[220px] flex-shrink-0 transition-all duration-300 ease-out"
      style={{ 
        transform: `scale(${activeScreenshot.deviceScale / 100}) rotate(${activeScreenshot.deviceRotation}deg) translateX(${activeScreenshot.deviceOffsetX}px) translateY(${activeScreenshot.deviceOffsetY}px)`,
        zIndex: 20
      }}
    >
      {/* Device shadow */}
      {activeScreenshot.showShadow && (
        <div className="absolute inset-0 translate-y-8 blur-3xl opacity-50 rounded-[40px]" 
             style={{ background: 'rgba(0,0,0,0.8)' }} />
      )}
      
      {/* Device frame */}
      <div className={`relative shadow-2xl overflow-hidden ${
        isIOS ? 'rounded-[38px] p-[6px]' : 'bg-[#1a1a1a] rounded-[28px] p-[6px]'
      }`}>
        {isIOS && (
          <img src={iphoneMockup} className="absolute inset-0 w-full h-full object-fill z-30 pointer-events-none" alt="iPhone Frame" />
        )}
        {/* Inner bezel highlight */}
        <div className="absolute inset-[1px] rounded-[inherit] border border-white/[0.08] pointer-events-none z-20" />
        
        {/* Screen */}
        <div className={`relative bg-[#000] overflow-hidden aspect-[9/19.5] ${
          isIOS ? 'rounded-[32px]' : 'rounded-[22px]'
        }`}>
          {/* Status Bar */}
          {activeScreenshot.showStatusBar && (
            <div className="absolute top-0 w-full h-10 flex items-end justify-end px-6 pb-1.5 z-20">
              <div className="flex items-center gap-1.5">
                <Signal size={10} className="text-white/80" />
                <Wifi size={11} className="text-white/80" />
                <div className="flex items-center gap-1">
                  <span className="text-[8px] font-medium text-white/70">{activeScreenshot.statusBattery}%</span>
                  <Battery size={11} className="text-white/80" />
                </div>
              </div>
            </div>
          )}

          {/* Android punch-hole */}
          {!isIOS && (
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#1a1a1c] rounded-full z-30 border-2 border-[#111]" />
          )}

          {/* Screenshot Image */}
          {activeScreenshot.screenshotUrl ? (
            <img src={activeScreenshot.screenshotUrl} className="w-full h-full object-cover" alt="App screenshot" />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-[#18181b] to-[#09090b] flex flex-col items-center justify-center gap-3">
              {/* Fake app UI skeleton */}
              <div className="w-[85%] space-y-3 mt-10">
                <div className="h-3 bg-white/[0.06] rounded-full w-3/4 mx-auto" />
                <div className="h-3 bg-white/[0.04] rounded-full w-1/2 mx-auto" />
                <div className="mt-6 space-y-2">
                  <div className="h-20 bg-white/[0.03] rounded-xl" />
                  <div className="h-20 bg-white/[0.03] rounded-xl" />
                  <div className="h-12 bg-white/[0.03] rounded-xl" />
                </div>
              </div>
              <span className="text-[10px] text-[#3f3f46] font-medium mt-2">No screenshot</span>
            </div>
          )}

          {/* iOS home indicator */}
          {isIOS && (
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full z-20" />
          )}

          {/* Android nav bar */}
          {!isIOS && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-6 z-20">
              <div className="w-4 h-4 border-2 border-white/15 rounded-sm" />
              <div className="w-4 h-4 border-2 border-white/15 rounded-full" />
              <div className="w-4 h-1.5 border-2 border-white/15 rounded-full mt-1" />
            </div>
          )}

          {/* Glass Reflection Overlay */}
          {activeScreenshot.showReflection && (
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-white/[0.15] pointer-events-none z-40" />
          )}
        </div>
      </div>
    </div>
  );

  const renderLayout = () => {
    switch (activeScreenshot.layout) {
      case 'top':
        return (
          <div className="flex flex-col items-center h-full pt-10 gap-6 overflow-hidden">
            {textContent}
            <div className="flex-1 flex items-start pt-2">
              {deviceMockup}
            </div>
          </div>
        );
      case 'bottom':
        return (
          <div className="flex flex-col items-center h-full pb-10 gap-6 overflow-hidden">
            <div className="flex-1 flex items-end pb-2">
              {deviceMockup}
            </div>
            {textContent}
          </div>
        );
      case 'center':
      default:
        return (
          <div className="flex flex-col items-center justify-center gap-8 h-full overflow-hidden">
            {textContent}
            {deviceMockup}
          </div>
        );
    }
  };

  return (
    <div 
      id={`screenshot-canvas-${activeScreenshot.id}`}
      className="w-full h-full rounded-2xl shadow-2xl overflow-hidden relative transition-all duration-500"
      style={{ 
        backgroundColor: activeScreenshot.bgColor, 
        backgroundImage: activeScreenshot.bgImageUrl 
          ? `url(${activeScreenshot.bgImageUrl})` 
          : (activeScreenshot.bgGradient !== 'none' ? activeScreenshot.bgGradient : 'none'),
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
       {/* Background decorative elements */}
       <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
       <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-black/[0.08] rounded-full blur-3xl pointer-events-none" />
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
       
       <div className="relative z-10 w-full h-full">
         {renderLayout()}
       </div>
    </div>
  );
};
