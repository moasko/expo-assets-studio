import { 
  FileImage, 
  Smartphone, 
  Layers, 
  Monitor, 
  Check, 
  Upload, 
  Sun, 
  Moon, 
  Eye, 
  EyeOff, 
  Package,
  Palette,
  Bell,
  Ghost,
  Box,
  Image as ImageIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { useStudio } from '../../context/StudioContext';
import { SectionTitle } from '../ui/SectionTitle';
import { AssetType } from '../../types';

const ASSET_OPTIONS: { type: AssetType; label: string; desc: string; icon: typeof FileImage }[] = [
  { type: 'icon', label: 'App Icon', desc: '1024x1024', icon: FileImage },
  { type: 'splash', label: 'Splash Screen', desc: '2048x2048', icon: Smartphone },
  { type: 'adaptive-foreground', label: 'Adaptive Foreground', desc: '1024x1024', icon: Layers },
  { type: 'monochrome', label: 'Monochrome Icon', desc: '1024x1024', icon: Ghost },
  { type: 'notification', label: 'Notification Icon', desc: '96x96', icon: Bell },
  { type: 'favicon', label: 'Favicon', desc: '48x48', icon: Monitor },
  { type: 'web-icons', label: 'Web Icons', desc: '192, 512', icon: Box },
];

export const Sidebar = () => {
  const { 
    assetType, setAssetType, 
    logoUrl, 
    theme, setTheme, 
    bgColor, setBgColor, 
    darkBgColor, setDarkBgColor,
    bgGradient, setBgGradient,
    useGradient, setUseGradient,
    logoScale, setLogoScale, 
    logoX, setLogoX,
    logoY, setLogoY,
    logoRotation, setLogoRotation,
    showShadow, setShowShadow,
    shadowColor, setShadowColor,
    shadowBlur, setShadowBlur,
    shadowX, setShadowX,
    shadowY, setShadowY,
    showBevel, setShowBevel,
    showScore, setShowScore,
    scoreColor, setScoreColor,
    scoreOpacity, setScoreOpacity,
    splashResizeMode, setSplashResizeMode,
    splashImageWidth, setSplashImageWidth,
    showSafeArea, setShowSafeArea, 
    downloadSingle, exportAll, 
    isExporting, 
    handleFileUpload,
    fileInputRef,
    suggestedColors
  } = useStudio();

  return (
    <aside className="w-[300px] border-r border-[#27272a] bg-[#18181b] flex flex-col shrink-0">
      <div className="flex-1 overflow-y-auto">
        {/* ── Asset Type ── */}
        <div className="p-4 pb-0">
          <SectionTitle>Asset type</SectionTitle>
          <div className="space-y-0.5">
            {ASSET_OPTIONS.map(({ type, label, desc, icon: Icon }) => {
              const isActive = assetType === type;
              return (
                <button
                  key={type}
                  onClick={() => setAssetType(type)}
                  className={`group w-full px-3 py-2 rounded-lg text-left transition-all duration-150 flex items-center gap-3 ${
                    isActive 
                    ? 'bg-[#27272a] text-[#fafafa]' 
                    : 'text-[#71717a] hover:text-[#a1a1aa] hover:bg-[#1f1f23]'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-[#0066ff]' : 'text-[#3f3f46] group-hover:text-[#52525b]'} />
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <span className="text-[13px] font-medium leading-tight">
                      {label}
                    </span>
                    <span className={`text-[10px] font-mono ${isActive ? 'text-[#a1a1aa]' : 'text-[#3f3f46]'}`}>
                      {desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-4 my-4 h-px bg-[#27272a]" />

        {/* ── Source Upload ── */}
        <div className="px-4">
          <SectionTitle>Source asset</SectionTitle>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`relative group w-full border border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 ${
              logoUrl 
              ? 'border-[#22c55e]/40 bg-[#22c55e]/5 hover:border-[#22c55e]/60' 
              : 'border-[#3f3f46] bg-[#27272a]/50 hover:bg-[#27272a] hover:border-[#52525b]'
            }`}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            {logoUrl ? (
              <>
                <div className="w-12 h-12 bg-[#18181b] rounded-xl shadow-sm border border-[#22c55e]/20 flex items-center justify-center overflow-hidden">
                  <img src={logoUrl} className="w-9 h-9 object-contain" alt="Source" />
                </div>
                <div className="text-center">
                  <p className="text-[12px] font-medium text-[#22c55e]">Asset loaded</p>
                  <p className="text-[11px] text-[#71717a] mt-0.5">Click to replace</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 bg-[#27272a] rounded-xl border border-[#3f3f46] flex items-center justify-center text-[#71717a] group-hover:text-[#a1a1aa] transition-colors">
                  <Upload size={18} strokeWidth={1.8} />
                </div>
                <div className="text-center">
                  <p className="text-[12px] font-medium text-[#a1a1aa] group-hover:text-[#fafafa] transition-colors">Upload logo</p>
                  <p className="text-[11px] text-[#71717a] mt-0.5">SVG or PNG recommended</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mx-4 my-4 h-px bg-[#27272a]" />

        {/* ── Configuration ── */}
        <div className="px-4 space-y-5 pb-4">
          {/* Theme Toggle */}
          <div>
            <SectionTitle>Theme</SectionTitle>
            <div className="flex bg-[#27272a] p-[3px] rounded-lg relative">
              <motion.div 
                className="absolute bg-[#3f3f46] rounded-[7px] h-[calc(100%-6px)] top-[3px]"
                initial={false}
                animate={{ 
                  left: theme === 'light' ? '3px' : 'calc(50% + 1px)',
                  width: 'calc(50% - 4px)'
                }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
              <button 
                onClick={() => setTheme('light')}
                className={`flex-1 relative z-10 py-2 rounded-[7px] text-[12px] font-medium transition-colors flex items-center justify-center gap-2 ${
                  theme === 'light' ? 'text-[#fafafa]' : 'text-[#71717a]'
                }`}
              >
                <Sun size={13} /> Light
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`flex-1 relative z-10 py-2 rounded-[7px] text-[12px] font-medium transition-colors flex items-center justify-center gap-2 ${
                  theme === 'dark' ? 'text-[#fafafa]' : 'text-[#71717a]'
                }`}
              >
                <Moon size={13} /> Dark
              </button>
            </div>
          </div>

          {/* Background Color */}
          {!['adaptive-foreground', 'notification', 'monochrome'].includes(assetType) && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                   <SectionTitle className="mb-0">Background</SectionTitle>
                   <button 
                    onClick={() => setUseGradient(!useGradient)}
                    className={`text-[10px] px-2 py-0.5 rounded-md transition-colors ${useGradient ? 'bg-[#0066ff] text-white' : 'bg-[#27272a] text-[#71717a]'}`}
                   >
                    Gradient
                   </button>
                </div>
                
                {useGradient ? (
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      value={bgGradient}
                      onChange={(e) => setBgGradient(e.target.value)}
                      className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-3 py-2 text-[12px] font-mono text-[#fafafa] focus:outline-none"
                    />
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {[
                        'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                        'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
                        'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                        'linear-gradient(135deg, #0066ff 0%, #00d2ff 100%)',
                      ].map((g, i) => (
                        <button 
                          key={i} 
                          onClick={() => setBgGradient(g)}
                          className="w-8 h-8 rounded-md shrink-0 border border-white/10" 
                          style={{ backgroundImage: g }} 
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-9 h-9 rounded-lg border border-[#3f3f46] overflow-hidden shrink-0 group cursor-pointer">
                        <input 
                          type="color" 
                          value={theme === 'light' ? bgColor : darkBgColor}
                          onChange={(e) => theme === 'light' ? setBgColor(e.target.value) : setDarkBgColor(e.target.value)}
                          className="absolute inset-[-10px] w-[200%] h-[200%] cursor-pointer"
                        />
                      </div>
                      <div className="flex-1 relative">
                        <input 
                          type="text" 
                          value={theme === 'light' ? bgColor : darkBgColor}
                          onChange={(e) => theme === 'light' ? setBgColor(e.target.value) : setDarkBgColor(e.target.value)}
                          className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-3 py-2 text-[12px] font-mono font-medium text-[#fafafa] focus:ring-2 focus:ring-[#0066ff]/25 focus:border-[#0066ff]/40 focus:outline-none uppercase transition-all"
                        />
                      </div>
                    </div>

                    {suggestedColors.length > 0 && (
                      <div className="flex items-center gap-2 mt-3 p-2.5 bg-[#27272a] rounded-lg">
                        <Palette size={12} className="text-[#71717a] shrink-0" />
                        <div className="flex gap-1.5 flex-1">
                          {suggestedColors.map((color, i) => (
                            <button
                              key={`${color}-${i}`}
                              onClick={() => theme === 'light' ? setBgColor(color) : setDarkBgColor(color)}
                              className={`w-6 h-6 rounded-md flex-shrink-0 transition-all duration-150 hover:scale-110 active:scale-95 ring-1 ring-white/[0.08] ${
                                (theme === 'light' ? bgColor : darkBgColor) === color 
                                  ? 'ring-2 ring-[#0066ff] ring-offset-1 ring-offset-[#27272a]' 
                                  : ''
                              }`}
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Logo Transform */}
          <div className="space-y-4 pt-2 border-t border-[#27272a]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <SectionTitle className="mb-0">Scale</SectionTitle>
                <span className="text-[11px] font-mono text-[#0066ff] tabular-nums">{logoScale}%</span>
              </div>
              <input type="range" min="10" max="150" value={logoScale} onChange={(e) => setLogoScale(parseInt(e.target.value))} className="w-full" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <SectionTitle className="mb-0 text-[10px]">Offset X</SectionTitle>
                  <span className="text-[10px] font-mono text-[#71717a]">{logoX}%</span>
                </div>
                <input type="range" min="-50" max="50" value={logoX} onChange={(e) => setLogoX(parseInt(e.target.value))} className="w-full" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <SectionTitle className="mb-0 text-[10px]">Offset Y</SectionTitle>
                  <span className="text-[10px] font-mono text-[#71717a]">{logoY}%</span>
                </div>
                <input type="range" min="-50" max="50" value={logoY} onChange={(e) => setLogoY(parseInt(e.target.value))} className="w-full" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <SectionTitle className="mb-0 text-[10px]">Rotation</SectionTitle>
                <span className="text-[10px] font-mono text-[#71717a]">{logoRotation}°</span>
              </div>
              <input type="range" min="-180" max="180" value={logoRotation} onChange={(e) => setLogoRotation(parseInt(e.target.value))} className="w-full" />
            </div>
          </div>

          {/* Effects */}
          <div className="space-y-3 pt-4 border-t border-[#27272a]">
            <SectionTitle>Effects</SectionTitle>
            
            <div className="space-y-3">
              <button 
                onClick={() => setShowShadow(!showShadow)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-[12px] transition-all ${showShadow ? 'bg-[#0066ff]/10 border-[#0066ff]/30 text-white' : 'bg-[#27272a]/50 border-[#3f3f46] text-[#71717a]'}`}
              >
                <span>Drop Shadow</span>
                <div className={`w-3 h-3 rounded-full ${showShadow ? 'bg-[#0066ff]' : 'bg-[#3f3f46]'}`} />
              </button>

              {showShadow && (
                <div className="grid grid-cols-2 gap-3 px-1">
                   <div>
                      <p className="text-[10px] text-[#71717a] mb-1">Blur</p>
                      <input type="range" min="0" max="50" value={shadowBlur} onChange={(e) => setShadowBlur(parseInt(e.target.value))} className="w-full h-1" />
                   </div>
                   <div>
                      <p className="text-[10px] text-[#71717a] mb-1">Color</p>
                      <input type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="w-full h-4 bg-transparent cursor-pointer" />
                   </div>
                </div>
              )}

              <button 
                onClick={() => setShowBevel(!showBevel)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-[12px] transition-all ${showBevel ? 'bg-[#0066ff]/10 border-[#0066ff]/30 text-white' : 'bg-[#27272a]/50 border-[#3f3f46] text-[#71717a]'}`}
              >
                <span>Bevel Effect</span>
                <div className={`w-3 h-3 rounded-full ${showBevel ? 'bg-[#0066ff]' : 'bg-[#3f3f46]'}`} />
              </button>

              <button 
                onClick={() => setShowScore(!showScore)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-[12px] transition-all ${showScore ? 'bg-[#0066ff]/10 border-[#0066ff]/30 text-white' : 'bg-[#27272a]/50 border-[#3f3f46] text-[#71717a]'}`}
              >
                <span>Score lines</span>
                <div className={`w-3 h-3 rounded-full ${showScore ? 'bg-[#0066ff]' : 'bg-[#3f3f46]'}`} />
              </button>
            </div>
          </div>


          {/* Splash Advanced Settings */}
          {assetType === 'splash' && (
            <div className="pt-2 space-y-4 border-t border-[#27272a]">
              <div>
                <SectionTitle>Resize Mode</SectionTitle>
                <select 
                  value={splashResizeMode}
                  onChange={(e) => setSplashResizeMode(e.target.value as any)}
                  className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-3 py-2 text-[12px] text-[#fafafa] focus:outline-none"
                >
                  <option value="contain">Contain</option>
                  <option value="cover">Cover</option>
                  <option value="native">Native</option>
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <SectionTitle className="mb-0">Image Width (SDK 50+)</SectionTitle>
                  <span className="text-[11px] font-mono font-semibold text-[#0066ff] bg-[#0066ff]/10 px-2 py-0.5 rounded-md">
                    {splashImageWidth}px
                  </span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="800" 
                  step="10"
                  value={splashImageWidth}
                  onChange={(e) => setSplashImageWidth(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Preview Overlay */}
          <div>
            <SectionTitle>Preview</SectionTitle>
            <button 
              onClick={() => setShowSafeArea(!showSafeArea)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all duration-150 text-[12px] font-medium ${
                showSafeArea 
                ? 'bg-[#0066ff]/8 text-[#fafafa] border-[#0066ff]/20' 
                : 'bg-[#27272a]/50 text-[#a1a1aa] border-[#3f3f46] hover:bg-[#27272a] hover:border-[#52525b]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {showSafeArea ? <Eye size={15} /> : <EyeOff size={15} />}
                Safe area overlay
              </div>
              <div className={`w-8 h-[18px] rounded-full transition-colors duration-200 relative ${
                showSafeArea ? 'bg-[#0066ff]' : 'bg-[#3f3f46]'
              }`}>
                <motion.div
                  className="absolute top-[2px] w-[14px] h-[14px] bg-white rounded-full shadow-sm"
                  animate={{ left: showSafeArea ? '16px' : '2px' }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Export Actions ── */}
      <div className="p-4 border-t border-[#27272a] bg-[#09090b] space-y-2.5">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => downloadSingle(false)}
            disabled={!logoUrl}
            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#27272a] border border-[#3f3f46] rounded-lg text-[12px] font-medium text-[#fafafa] hover:bg-[#3f3f46] hover:border-[#52525b] disabled:opacity-30 disabled:pointer-events-none transition-all duration-150"
          >
            <Sun size={14} /> Light
          </button>
          <button
            onClick={() => downloadSingle(true)}
            disabled={!logoUrl}
            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#27272a] border border-[#3f3f46] rounded-lg text-[12px] font-medium text-[#fafafa] hover:bg-[#3f3f46] hover:border-[#52525b] disabled:opacity-30 disabled:pointer-events-none transition-all duration-150"
          >
            <Moon size={14} /> Dark
          </button>
        </div>
        <button
          onClick={exportAll}
          disabled={!logoUrl || isExporting}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-[#0066ff] text-white rounded-xl text-[13px] font-semibold hover:bg-[#0052cc] disabled:opacity-30 disabled:pointer-events-none shadow-sm shadow-[#0066ff]/25 transition-all duration-150 active:scale-[0.98]"
        >
          {isExporting ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Package size={16} />
          )}
          {isExporting ? 'Generating...' : 'Export All Assets'}
        </button>
      </div>
    </aside>
  );
};

