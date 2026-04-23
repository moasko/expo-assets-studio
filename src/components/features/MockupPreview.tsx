import { useMemo } from 'react';
import { Smartphone, Mail, Globe, Music, Camera, Calendar, Settings, Wifi, Battery } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';

const WALLPAPERS = [
  'https://picsum.photos/id/10/800/1600',
  'https://picsum.photos/id/22/800/1600',
  'https://picsum.photos/id/29/800/1600',
  'https://picsum.photos/id/37/800/1600',
  'https://picsum.photos/id/48/800/1600',
  'https://picsum.photos/id/54/800/1600',
];

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
    logoScale,
    showSafeArea
  } = useStudio();

  const randomWallpaper = useMemo(() => WALLPAPERS[Math.floor(Math.random() * WALLPAPERS.length)], []);

  const isIOS = previewDevice === 'ios';
  const currentBg = theme === 'light' ? bgColor : darkBgColor;
  const now = new Date();
  const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div className="relative">
      {/* Shadow glow */}
      <div className="absolute inset-0 rounded-[44px] bg-[#0066ff]/[0.04] blur-3xl translate-y-8 scale-[0.9]" />

      {/* Phone Frame */}
      <div className={`relative w-[300px] h-[620px] bg-[#0a0a0a] transition-all duration-500 overflow-hidden ${isIOS ? 'rounded-[40px] p-[10px]' : 'rounded-[32px] p-[8px]'
        }`}>
        {/* Bezel effects - replaced shines with solid thin borders */}
        <div className="absolute inset-[1px] rounded-[inherit] border border-white/[0.08] pointer-events-none z-10" />

        {/* Screen */}
        <div className={`w-full h-full bg-white overflow-hidden relative ${isIOS ? 'rounded-[30px]' : 'rounded-[24px]'
          }`}>
          {/* Dynamic Island / Camera */}
          {isIOS ? (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-30 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-[#1a1a1c] rounded-full border border-[#2a2a2c] ml-6" />
            </div>
          ) : (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#2a2a2c] rounded-full z-30 border-2 border-[#1a1a1c]" />
          )}

          {assetType === 'icon' || assetType === 'adaptive-icon' ? (
            /* ── Home Screen ── */
            <div className={`w-full h-full flex flex-col relative transition-all duration-500 bg-[#09090b] ${theme === 'dark' ? 'brightness-[0.75] contrast-[1.1]' : ''
              }`} style={{
                backgroundImage: `url(${randomWallpaper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
              {/* Status Bar */}
              <div className="h-12 flex items-end justify-between px-7 pb-1 z-20">
                <span className="text-[12px] font-semibold text-white/95 tabular-nums drop-shadow-sm">
                  {timeStr}
                </span>
                <div className="flex items-center gap-1.5">
                  <Wifi size={12} className="text-white/80" />
                  <Battery size={14} className="text-white/80" />
                </div>
              </div>

              {/* Widget */}
              <div className="px-4 pt-5 pb-2">
                <div className="w-full bg-white/[0.12] backdrop-blur-xl rounded-2xl p-3.5 border border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/[0.15] rounded-xl flex items-center justify-center text-white/90">
                      <Calendar size={17} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-white/60 tracking-wide">
                        {now.toLocaleDateString('en-US', { weekday: 'long' })}
                      </p>
                      <p className="text-[14px] font-semibold text-white/95 leading-tight">
                        {now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* App Grid */}
              <div className="flex-1 px-5 pt-5">
                <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                  <SystemApp name="Mail" icon={Mail} color="#007AFF" isIOS={isIOS} />
                  <SystemApp name="Photos" icon={Camera} color="#FF9500" isIOS={isIOS} />
                  <SystemApp name="Safari" icon={Globe} color="#5AC8FA" isIOS={isIOS} />
                  <SystemApp name="Music" icon={Music} color="#FF2D55" isIOS={isIOS} />

                  {/* Target App */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-full aspect-square shadow-2xl overflow-hidden flex items-center justify-center transition-all duration-500 relative ${isIOS ? 'rounded-[22%]' : 'rounded-full'
                        }`}
                      style={{ backgroundColor: currentBg }}
                    >
                      <img
                        src={logoUrl || ""}
                        className="object-contain z-10 drop-shadow-sm"
                        style={{ width: `${logoScale}%`, height: `${logoScale}%` }}
                        alt="Logo"
                      />
                      {showSafeArea && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute inset-[10%] border border-[#22c55e]/50 rounded-full" />
                          <div className="absolute inset-0 border border-[#22c55e]/20" />
                          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#22c55e]/20" />
                          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#22c55e]/20" />
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-white/90 font-semibold truncate w-full text-center drop-shadow-md">
                      Your App
                    </span>
                  </div>

                  <SystemApp name="Settings" icon={Settings} color="#8E8E93" isIOS={isIOS} />
                </div>
              </div>

              {/* Dock */}
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

              {/* Home indicator */}
              {isIOS && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full" />
              )}
            </div>
          ) : (
            /* ── Splash Screen ── */
            <div
              className="w-full h-full flex items-center justify-center relative transition-colors duration-500"
              style={{ backgroundColor: currentBg }}
            >
              <img
                src={logoUrl || ""}
                className="object-contain drop-shadow-sm"
                style={{ width: `${logoScale}%`, height: `${logoScale}%` }}
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
