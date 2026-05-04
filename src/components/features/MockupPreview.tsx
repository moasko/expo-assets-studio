import { useMemo } from 'react';
import {
  Smartphone, Mail, Globe, Music, Camera, Calendar, Settings,
  Wifi, Battery, Search, ArrowLeft, MoreHorizontal, Bell
} from 'lucide-react';
import iphoneMockup from '@/assets/iphone17.png';
import { useStudio } from '../../context/StudioContext';
import { AndroidMask } from '../../types';

const WALLPAPERS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop',
];

const MASK_CLASSES: Record<AndroidMask, string> = {
  'circle': 'rounded-full',
  'squircle': 'rounded-[25%]',
  'rounded-rect': 'rounded-[15%]',
  'teardrop': 'rounded-t-full rounded-bl-full rounded-br-[15%]'
};

const SystemApp = ({ name, icon: Icon, color, isIOS }: { name: string; icon: any; color: string; isIOS: boolean }) => (
  <div className="flex flex-col items-center gap-1.5">
    <div
      className={`w-full aspect-square flex items-center justify-center shadow-lg ${isIOS ? 'rounded-[22%]' : 'rounded-full'
        }`}
      style={{
        backgroundColor: color,
      }}
    >
      <Icon size={isIOS ? 26 : 22} className="text-white/95 drop-shadow-sm" strokeWidth={1.8} />
    </div>
    <span className="text-[9px] text-white/80 font-medium truncate w-full text-center drop-shadow-md">
      {name}
    </span>
  </div>
);

export const MockupPreview = () => {
  const {
    assetType,
    logoUrl,
    previewDevice,
    theme,
    bgColor,
    darkBgColor,
    bgGradient,
    useGradient,
    logoScale,
    logoX,
    logoY,
    logoRotation,
    showShadow,
    shadowColor,
    shadowBlur,
    shadowX,
    shadowY,
    showBevel,
    showScore,
    scoreColor,
    scoreOpacity,
    showSafeArea,
    androidMask,
    splashResizeMode,
    splashImageWidth
  } = useStudio();

  const randomWallpaper = useMemo(() => WALLPAPERS[Math.floor(Math.random() * WALLPAPERS.length)], []);

  const isIOS = previewDevice === 'ios';
  const currentBg = theme === 'light' ? bgColor : darkBgColor;

  const renderScoreLines = () => {
    if (!showScore) return null;
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30" style={{ color: scoreColor }}>
        {/* Horizontal lines */}
        <div className="absolute top-1/4 w-full h-[1px] bg-current" />
        <div className="absolute top-1/2 w-full h-[1px] bg-current" />
        <div className="absolute top-3/4 w-full h-[1px] bg-current" />
        {/* Vertical lines */}
        <div className="absolute left-1/4 h-full w-[1px] bg-current" />
        <div className="absolute left-1/2 h-full w-[1px] bg-current" />
        <div className="absolute left-3/4 h-full w-[1px] bg-current" />
        {/* Diagonal lines */}
        <div className="absolute inset-0 border border-current rounded-full scale-[0.707]" />
      </div>
    );
  };

  const renderIconContent = () => {
    const isMonochrome = assetType === 'monochrome';
    const isNotification = assetType === 'notification';
    const isAdaptiveBack = assetType === 'adaptive-background';
    
    const backgroundStyle = (isMonochrome || isNotification) 
      ? { backgroundColor: '#27272a' }
      : useGradient 
        ? { backgroundImage: bgGradient }
        : { backgroundColor: currentBg };

    return (
      <div
        className={`w-full aspect-square shadow-2xl overflow-hidden flex items-center justify-center transition-all duration-500 relative ${isIOS ? 'rounded-[22%]' : MASK_CLASSES[androidMask]
          }`}
        style={{
          ...backgroundStyle,
          filter: isMonochrome ? 'grayscale(1)' : 'none'
        }}
      >
        {renderScoreLines()}

        {!isAdaptiveBack && (
          <div 
            className="relative z-10 transition-all duration-300 ease-out"
            style={{
              width: `${logoScale}%`,
              height: `${logoScale}%`,
              transform: `translate(${logoX}%, ${logoY}%) rotate(${logoRotation}deg)`,
              filter: `
                ${showShadow ? `drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor})` : ''}
                ${showBevel ? 'contrast(1.1) brightness(1.1) drop-shadow(0 -1px 1px rgba(255,255,255,0.3)) drop-shadow(0 1px 1px rgba(0,0,0,0.3))' : ''}
                ${isNotification ? 'brightness-0 invert' : ''}
              `
            }}
          >
            <img
              src={logoUrl || ""}
              className="w-full h-full object-contain"
              alt="Logo"
            />
          </div>
        )}
        
        {showSafeArea && (
          <div className="absolute inset-0 pointer-events-none z-20">
            <div className="absolute inset-[10%] border border-[#22c55e]/50 rounded-full" />
            <div className="absolute inset-0 border border-[#22c55e]/20" />
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#22c55e]/20" />
            <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#22c55e]/20" />
          </div>
        )}
      </div>
    );
  };


  if (previewDevice === 'web' || assetType === 'favicon' || assetType === 'web-icons') {
    return (
      <div className="w-[500px] bg-[#18181b] rounded-xl border border-[#27272a] shadow-2xl overflow-hidden">
        <div className="h-10 bg-[#27272a] flex items-center px-4 gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex-1 bg-[#18181b] h-6 rounded-md px-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm overflow-hidden bg-white/10 flex items-center justify-center">
              <img src={logoUrl || ""} className="w-full h-full object-contain" />
            </div>
            <span className="text-[10px] text-[#71717a] truncate">localhost:3000</span>
          </div>
        </div>
        <div className="h-[300px] bg-[#09090b] flex items-center justify-center flex-col gap-4">
          <div className="w-24 h-24 rounded-2xl bg-[#18181b] border border-[#27272a] flex items-center justify-center p-4">
            <img src={logoUrl || ""} className="w-full h-full object-contain" style={{ filter: assetType === 'monochrome' ? 'grayscale(1)' : 'none' }} />
          </div>
          <p className="text-[12px] text-[#a1a1aa] font-medium">Web Preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-[44px] bg-[#0066ff]/[0.04] blur-3xl translate-y-8 scale-[0.9]" />

      <div className={`relative w-[300px] h-[620px] transition-all duration-500 overflow-hidden ${isIOS ? 'rounded-[50px] p-[10px]' : 'bg-[#0a0a0a] rounded-[32px] p-[8px]'
        }`}>
        {isIOS && (
          <img src={iphoneMockup} className="absolute inset-0 w-full h-full object-fill z-20 pointer-events-none" alt="iPhone Frame" />
        )}

        <div className="absolute inset-[1px] rounded-[inherit] border border-white/[0.08] pointer-events-none z-10" />

        <div className={`w-full h-full bg-white overflow-hidden relative ${isIOS ? 'rounded-[40px]' : 'rounded-[24px]'
          }`}>
          {!isIOS && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#2a2a2c] rounded-full z-30 border-2 border-[#1a1a1c]" />
          )}

          {['icon', 'adaptive-foreground', 'monochrome', 'notification'].includes(assetType) ? (
            <div className={`w-full h-full flex flex-col relative transition-all duration-500 bg-[#09090b] ${theme === 'dark' ? 'brightness-[0.75] contrast-[1.1]' : ''
              }`} style={{
                backgroundImage: `url(${randomWallpaper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
              <div className="h-12 flex items-end justify-between px-7 pb-1 z-20">
                <div className="flex items-center gap-2">
                  {assetType === 'notification' && (
                    <div className="w-4 h-4 brightness-0 invert opacity-90">
                      <img src={logoUrl || ""} className="w-full h-full object-contain" />
                    </div>
                  )}
                </div>

              </div>



              <div className="flex-1 px-5 pt-5">
                <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                  <SystemApp name="Mail" icon={Mail} color="#007AFF" isIOS={isIOS} />
                  <SystemApp name="Photos" icon={Camera} color="#FF9500" isIOS={isIOS} />
                  <SystemApp name="Safari" icon={Globe} color="#5AC8FA" isIOS={isIOS} />
                  <SystemApp name="Music" icon={Music} color="#FF2D55" isIOS={isIOS} />

                  <div className="flex flex-col items-center gap-1.5">
                    {renderIconContent()}
                    <span className="text-[9px] text-white/90 font-semibold truncate w-full text-center drop-shadow-md">
                      Your App
                    </span>
                  </div>

                  <SystemApp name="Settings" icon={Settings} color="#8E8E93" isIOS={isIOS} />
                </div>
              </div>

              <div className="pb-6 px-4 mt-auto">
                <div className="w-full h-[60px] bg-white/[0.15] backdrop-blur-2xl rounded-2xl flex items-center justify-around px-4 border border-white/[0.08]">
                  {[
                    { icon: Mail },
                    { icon: Globe },
                    { icon: Music },
                    { icon: Smartphone },
                  ].map((item, i) => (
                    <div key={i} className={`w-10 h-10 flex items-center justify-center ${isIOS ? 'rounded-[22%]' : 'rounded-full'
                      } bg-white/[0.12]`}>
                      <item.icon size={18} className="text-white/75" strokeWidth={1.8} />
                    </div>
                  ))}
                </div>
              </div>

              {isIOS && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full" />
              )}
            </div>
          ) : (
            <div
              className="w-full h-full flex items-center justify-center relative transition-colors duration-500 overflow-hidden"
              style={{ backgroundColor: currentBg }}
            >
              <img
                src={logoUrl || ""}
                className={`drop-shadow-sm transition-all duration-300 ${splashResizeMode === 'cover' ? 'w-full h-full object-cover' : 'object-contain'
                  }`}
                style={{
                  width: splashResizeMode === 'contain' ? `${logoScale}%` : splashResizeMode === 'native' ? `${splashImageWidth}px` : '100%',
                  height: splashResizeMode === 'contain' ? `${logoScale}%` : splashResizeMode === 'native' ? 'auto' : '100%'
                }}
                alt="Splash"
              />
              {showSafeArea && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-[80%] h-[80%] border-2 border-dashed border-[#22c55e]/30 rounded-xl" />
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#22c55e]/20" />
                  <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#22c55e]/20" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

