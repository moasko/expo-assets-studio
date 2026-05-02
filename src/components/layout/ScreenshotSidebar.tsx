import {
  Plus,
  Copy,
  Trash2,
  Smartphone,
  Upload,
  AlignCenter,
  ChevronUp,
  ChevronDown,
  Layers,
  Type,
  Palette,
  ImageIcon,
  Apple,
  Download,
  Settings,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useStudio } from '../../context/StudioContext';
import { SectionTitle } from '../ui/SectionTitle';

const LAYOUT_OPTIONS = [
  { id: 'top', icon: ChevronUp, label: 'Top' },
  { id: 'center', icon: AlignCenter, label: 'Center' },
  { id: 'bottom', icon: ChevronDown, label: 'Bottom' },
] as const;

const GRADIENTS = [
  'linear-gradient(135deg, #0066ff 0%, #00d2ff 100%)',
  'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
  'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)',
  'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
  'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
  'linear-gradient(135deg, #18181b 0%, #3f3f46 100%)',
  'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
  'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
];

const FONTS = [
  'Inter',
  'Roboto',
  'Outfit',
  'Montserrat',
  'Playfair Display',
  'Bungee',
  'JetBrains Mono',
];

export const ScreenshotSidebar = () => {
  const {
    screenshots,
    activeScreenshotId,
    setActiveScreenshotId,
    addScreenshot,
    removeScreenshot,
    duplicateScreenshot,
    updateScreenshotConfig,
    syncAllScreenshots,
    handleScreenshotUpload,
    handleBgImageUpload,
    applyScreenshotToAll,
    applyBgToAll,
    applyTemplate,
    exportScreenshot,
    exportAllScreenshots,
    isExporting
  } = useStudio();

  const activeScreenshot = screenshots.find(s => s.id === activeScreenshotId) || screenshots[0];

  if (!activeScreenshot) return null;

  const TEMPLATES = [
    { id: 'minimal', label: 'Minimal', color: '#27272a' },
    { id: 'leaning', label: 'Leaning', color: '#0066ff' },
    { id: 'focus', label: 'Focus', color: '#7c3aed' },
    { id: '3d', label: '3D Look', color: '#f97316' },
  ];

  const activeIndex = screenshots.findIndex(s => s.id === activeScreenshotId);

  return (
    <aside className="w-[300px] border-r border-[#27272a] bg-[#18181b] flex flex-col shrink-0">
      <div className="flex-1 flex flex-col overflow-y-auto scrollbar-thin">
        {/* ── Templates ── */}
        <div className="px-4 pt-4 pb-2">
          <SectionTitle className="mb-3">Design Templates</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            {TEMPLATES.map(t => (
              <button
                key={t.id}
                onClick={() => applyTemplate(t.id)}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#27272a] border border-[#3f3f46] hover:border-[#0066ff]/50 transition-all text-left group"
              >
                <div className="w-8 h-8 rounded bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center shrink-0" style={{ backgroundColor: t.color }}>
                  <Layers size={14} className="text-white/80" />
                </div>
                <span className="text-[11px] font-medium text-[#a1a1aa] group-hover:text-[#fafafa]">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mx-4 my-2 h-px bg-[#27272a]" />

        {/* ── Screenshots Gallery ── */}
        <div className="p-4 pb-0">
          <div className="flex items-center justify-between mb-2.5">
            <SectionTitle className="mb-0">Slides</SectionTitle>
            <span className="text-[10px] font-mono text-[#52525b] bg-[#27272a] px-1.5 py-0.5 rounded">
              {activeIndex + 1} / {screenshots.length}
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-thin">
            {screenshots.map((s, index) => (
              <button
                key={s.id}
                onClick={() => setActiveScreenshotId(s.id)}
                className={`shrink-0 w-14 h-[88px] rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center relative overflow-hidden group ${activeScreenshotId === s.id
                    ? 'border-[#0066ff] shadow-lg shadow-[#0066ff]/15'
                    : 'border-[#27272a] bg-[#09090b] hover:border-[#3f3f46]'
                  }`}
                style={
                  activeScreenshotId === s.id
                    ? { background: s.bgGradient !== 'none' ? s.bgGradient : s.bgColor }
                    : { background: s.bgGradient !== 'none' ? s.bgGradient : s.bgColor, opacity: 0.6 }
                }
              >
                {s.screenshotUrl && (
                  <img src={s.screenshotUrl} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                )}
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <Smartphone size={14} className="text-white/70" />
                  <span className="text-[9px] font-bold text-white/90 drop-shadow-sm">{index + 1}</span>
                </div>
              </button>
            ))}
            <button
              onClick={addScreenshot}
              className="shrink-0 w-14 h-[88px] rounded-xl border-2 border-dashed border-[#27272a] hover:border-[#0066ff]/40 hover:bg-[#0066ff]/5 flex flex-col items-center justify-center gap-1 text-[#52525b] hover:text-[#0066ff] transition-all duration-200"
            >
              <Plus size={16} />
              <span className="text-[8px] font-medium">Add</span>
            </button>
          </div>

          <div className="flex gap-2 mt-1">
            <button
              onClick={() => duplicateScreenshot(activeScreenshotId)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#27272a] text-[#a1a1aa] rounded-lg text-[11px] font-medium hover:bg-[#3f3f46] hover:text-[#fafafa] transition-all duration-150 active:scale-[0.97]"
            >
              <Copy size={12} /> Duplicate
            </button>
            <button
              onClick={() => removeScreenshot(activeScreenshotId)}
              disabled={screenshots.length <= 1}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#27272a] text-[#a1a1aa] rounded-lg text-[11px] font-medium hover:bg-red-500/10 hover:text-red-400 transition-all duration-150 active:scale-[0.97] disabled:opacity-30 disabled:pointer-events-none"
            >
              <Trash2 size={12} /> Remove
            </button>
          </div>

          <button
            onClick={syncAllScreenshots}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2 bg-[#0066ff]/10 text-[#0066ff] rounded-lg text-[11px] font-semibold hover:bg-[#0066ff]/20 transition-all duration-150 border border-[#0066ff]/20"
          >
            <Layers size={13} /> Apply current style to all slides
          </button>
        </div>

        <div className="mx-4 my-4 h-px bg-[#27272a]" />

        {/* ── Content ── */}
        <div className="px-4 space-y-4">
          <SectionTitle>Content</SectionTitle>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] text-[#71717a] font-medium flex items-center gap-1.5">
                <Type size={11} className="text-[#52525b]" /> Headline
              </label>
              <button
                onClick={() => updateScreenshotConfig({ showTitle: !activeScreenshot.showTitle })}
                className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${activeScreenshot.showTitle ? 'text-[#0066ff] bg-[#0066ff]/10' : 'text-[#71717a] bg-[#27272a]'
                  }`}
              >
                {activeScreenshot.showTitle ? 'Visible' : 'Hidden'}
              </button>
            </div>
            <input
              type="text"
              value={activeScreenshot.title}
              onChange={(e) => updateScreenshotConfig({ title: e.target.value })}
              className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-3 py-2.5 text-[13px] text-[#fafafa] focus:ring-2 focus:ring-[#0066ff]/25 focus:border-[#0066ff]/40 focus:outline-none transition-all placeholder:text-[#3f3f46]"
              placeholder="Your killer headline"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] text-[#71717a] font-medium flex items-center gap-1.5">
                <Type size={11} className="text-[#52525b]" /> Subtitle
              </label>
              <button
                onClick={() => updateScreenshotConfig({ showSubtitle: !activeScreenshot.showSubtitle })}
                className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${activeScreenshot.showSubtitle ? 'text-[#0066ff] bg-[#0066ff]/10' : 'text-[#71717a] bg-[#27272a]'
                  }`}
              >
                {activeScreenshot.showSubtitle ? 'Visible' : 'Hidden'}
              </button>
            </div>
            <textarea
              value={activeScreenshot.subtitle}
              onChange={(e) => updateScreenshotConfig({ subtitle: e.target.value })}
              rows={2}
              className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-3 py-2.5 text-[13px] text-[#fafafa] focus:ring-2 focus:ring-[#0066ff]/25 focus:border-[#0066ff]/40 focus:outline-none resize-none transition-all placeholder:text-[#3f3f46]"
              placeholder="A brief description..."
            />
          </div>

          {/* Font Family */}
          <div>
            <SectionTitle className="mb-2">Font family</SectionTitle>
            <select
              value={activeScreenshot.fontFamily}
              onChange={(e) => updateScreenshotConfig({ fontFamily: e.target.value })}
              className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-3 py-2.5 text-[13px] text-[#fafafa] focus:ring-2 focus:ring-[#0066ff]/25 focus:border-[#0066ff]/40 focus:outline-none transition-all cursor-pointer"
            >
              {FONTS.map(font => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <SectionTitle className="mb-0">Font size</SectionTitle>
              <span className="text-[11px] font-mono font-semibold text-[#0066ff] bg-[#0066ff]/10 px-2 py-0.5 rounded-md tabular-nums">
                {activeScreenshot.fontSize}px
              </span>
            </div>
            <input
              type="range"
              min="18"
              max="56"
              value={activeScreenshot.fontSize}
              onChange={(e) => updateScreenshotConfig({ fontSize: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Text Colors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-[#71717a] font-medium mb-1.5 block">Title color</label>
              <div className="flex items-center gap-2 bg-[#27272a] border border-[#3f3f46] rounded-lg px-2.5 py-1.5">
                <div className="relative w-6 h-6 rounded-md overflow-hidden shrink-0 border border-white/10">
                  <input
                    type="color"
                    value={activeScreenshot.titleColor}
                    onChange={(e) => updateScreenshotConfig({ titleColor: e.target.value })}
                    className="absolute inset-[-10px] w-[200%] h-[200%] cursor-pointer"
                  />
                </div>
                <span className="text-[10px] font-mono text-[#a1a1aa] uppercase">{activeScreenshot.titleColor}</span>
              </div>
            </div>
            <div>
              <label className="text-[11px] text-[#71717a] font-medium mb-1.5 block">Sub color</label>
              <div className="flex items-center gap-2 bg-[#27272a] border border-[#3f3f46] rounded-lg px-2.5 py-1.5">
                <div className="relative w-6 h-6 rounded-md overflow-hidden shrink-0 border border-white/10">
                  <input
                    type="color"
                    value={activeScreenshot.subtitleColor}
                    onChange={(e) => updateScreenshotConfig({ subtitleColor: e.target.value })}
                    className="absolute inset-[-10px] w-[200%] h-[200%] cursor-pointer"
                  />
                </div>
                <span className="text-[10px] font-mono text-[#a1a1aa] uppercase">{activeScreenshot.subtitleColor}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-4 my-4 h-px bg-[#27272a]" />

        {/* ── Device & Image ── */}
        <div className="px-4 space-y-4">
          <SectionTitle>Device frame</SectionTitle>

          {/* Device Type Toggle */}
          <div className="flex bg-[#27272a] p-[3px] rounded-lg relative">
            <motion.div
              className="absolute bg-[#3f3f46] rounded-[7px] h-[calc(100%-6px)] top-[3px]"
              initial={false}
              animate={{
                left: activeScreenshot.deviceType === 'ios' ? '3px' : 'calc(50% + 1px)',
                width: 'calc(50% - 4px)'
              }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
            <button
              onClick={() => updateScreenshotConfig({ deviceType: 'ios' })}
              className={`flex-1 relative z-10 py-2 rounded-[7px] text-[12px] font-medium transition-colors flex items-center justify-center gap-2 ${activeScreenshot.deviceType === 'ios' ? 'text-[#fafafa]' : 'text-[#71717a]'
                }`}
            >
              <Apple size={13} /> iPhone
            </button>
            <button
              onClick={() => updateScreenshotConfig({ deviceType: 'android' })}
              className={`flex-1 relative z-10 py-2 rounded-[7px] text-[12px] font-medium transition-colors flex items-center justify-center gap-2 ${activeScreenshot.deviceType === 'android' ? 'text-[#fafafa]' : 'text-[#71717a]'
                }`}
            >
              <Smartphone size={13} /> Android
            </button>
          </div>

          {/* Screenshot Upload */}
          <div>
            <label className="text-[11px] text-[#71717a] font-medium mb-1.5 flex items-center gap-1.5">
              <ImageIcon size={11} className="text-[#52525b]" /> App screenshot
            </label>
            <div
              onClick={() => document.getElementById('screenshot-upload')?.click()}
              className={`relative group w-full border border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 ${activeScreenshot.screenshotUrl
                  ? 'border-[#22c55e]/40 bg-[#22c55e]/5 hover:border-[#22c55e]/60'
                  : 'border-[#3f3f46] bg-[#27272a]/50 hover:bg-[#27272a] hover:border-[#52525b]'
                }`}
            >
              <input
                id="screenshot-upload"
                type="file"
                accept="image/*"
                onChange={handleScreenshotUpload}
                className="hidden"
              />
              {activeScreenshot.screenshotUrl ? (
                <>
                  <div className="w-12 h-12 bg-[#18181b] rounded-xl shadow-sm border border-[#22c55e]/20 flex items-center justify-center overflow-hidden">
                    <img src={activeScreenshot.screenshotUrl} className="w-9 h-9 object-cover rounded-md" alt="Screenshot" />
                  </div>
                  <div className="text-center">
                    <p className="text-[12px] font-medium text-[#22c55e]">Screenshot loaded</p>
                    <p className="text-[11px] text-[#71717a] mt-0.5">Click to replace</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); applyScreenshotToAll(); }}
                      className="mt-2 text-[10px] bg-[#22c55e]/10 text-[#22c55e] px-2 py-1 rounded hover:bg-[#22c55e]/20 transition-colors"
                    >
                      Apply to all slides
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-[#27272a] rounded-xl border border-[#3f3f46] flex items-center justify-center text-[#71717a] group-hover:text-[#a1a1aa] transition-colors">
                    <Upload size={18} strokeWidth={1.8} />
                  </div>
                  <div className="text-center">
                    <p className="text-[12px] font-medium text-[#a1a1aa] group-hover:text-[#fafafa] transition-colors">Upload screenshot</p>
                    <p className="text-[11px] text-[#71717a] mt-0.5">PNG or JPG recommended</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mockup Scale */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <SectionTitle className="mb-0">Mockup scale</SectionTitle>
              <span className="text-[11px] font-mono font-semibold text-[#0066ff] bg-[#0066ff]/10 px-2 py-0.5 rounded-md tabular-nums">
                {activeScreenshot.deviceScale}%
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              value={activeScreenshot.deviceScale}
              onChange={(e) => updateScreenshotConfig({ deviceScale: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-[#27272a] rounded-lg appearance-none cursor-pointer accent-[#0066ff]"
            />
          </div>

          {/* Mockup Offset Y */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <SectionTitle className="mb-0">Vertical position</SectionTitle>
              <span className="text-[11px] font-mono font-semibold text-[#0066ff] bg-[#0066ff]/10 px-2 py-0.5 rounded-md tabular-nums">
                {activeScreenshot.deviceOffsetY > 0 ? '+' : ''}{activeScreenshot.deviceOffsetY}px
              </span>
            </div>
            <input
              type="range"
              min="-200"
              max="200"
              value={activeScreenshot.deviceOffsetY}
              onChange={(e) => updateScreenshotConfig({ deviceOffsetY: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-[#27272a] rounded-lg appearance-none cursor-pointer accent-[#0066ff]"
            />
          </div>

          {/* Mockup Offset X */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <SectionTitle className="mb-0">Horizontal position</SectionTitle>
              <span className="text-[11px] font-mono font-semibold text-[#0066ff] bg-[#0066ff]/10 px-2 py-0.5 rounded-md tabular-nums">
                {activeScreenshot.deviceOffsetX > 0 ? '+' : ''}{activeScreenshot.deviceOffsetX}px
              </span>
            </div>
            <input
              type="range"
              min="-200"
              max="200"
              value={activeScreenshot.deviceOffsetX}
              onChange={(e) => updateScreenshotConfig({ deviceOffsetX: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-[#27272a] rounded-lg appearance-none cursor-pointer accent-[#0066ff]"
            />
          </div>

          {/* Mockup Rotation */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <SectionTitle className="mb-0">Rotation</SectionTitle>
              <span className="text-[11px] font-mono font-semibold text-[#0066ff] bg-[#0066ff]/10 px-2 py-0.5 rounded-md tabular-nums">
                {activeScreenshot.deviceRotation}°
              </span>
            </div>
            <input
              type="range"
              min="-45"
              max="45"
              value={activeScreenshot.deviceRotation}
              onChange={(e) => updateScreenshotConfig({ deviceRotation: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-[#27272a] rounded-lg appearance-none cursor-pointer accent-[#0066ff]"
            />
          </div>

          {/* Status Bar Settings */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <label className="text-[11px] text-[#71717a] font-medium flex items-center gap-1.5">
                <Settings size={11} className="text-[#52525b]" /> Status bar
              </label>
              <button
                onClick={() => updateScreenshotConfig({ showStatusBar: !activeScreenshot.showStatusBar })}
                className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${activeScreenshot.showStatusBar ? 'text-[#0066ff] bg-[#0066ff]/10' : 'text-[#71717a] bg-[#27272a]'
                  }`}
              >
                {activeScreenshot.showStatusBar ? 'On' : 'Off'}
              </button>
            </div>

            {activeScreenshot.showStatusBar && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-[#52525b] mb-1 block">Time</label>
                  <input
                    type="text"
                    value={activeScreenshot.statusTime}
                    onChange={(e) => updateScreenshotConfig({ statusTime: e.target.value })}
                    className="w-full bg-[#18181b] border border-[#27272a] rounded-lg px-2 py-1.5 text-[11px] text-[#fafafa] font-mono"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#52525b] mb-1 block">Battery %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={activeScreenshot.statusBattery}
                    onChange={(e) => updateScreenshotConfig({ statusBattery: parseInt(e.target.value) || 100 })}
                    className="w-full bg-[#18181b] border border-[#27272a] rounded-lg px-2 py-1.5 text-[11px] text-[#fafafa] font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Visual Effects */}
          <div className="pt-2">
            <label className="text-[11px] text-[#71717a] font-medium mb-3 flex items-center gap-1.5">
              <Layers size={11} className="text-[#52525b]" /> Visual effects
            </label>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-[#18181b] border border-[#27272a] rounded-lg px-3 py-2">
                <span className="text-[11px] text-[#fafafa]">Screen reflection</span>
                <button
                  onClick={() => updateScreenshotConfig({ showReflection: !activeScreenshot.showReflection })}
                  className={`w-8 h-4 rounded-full relative transition-colors ${activeScreenshot.showReflection ? 'bg-[#0066ff]' : 'bg-[#3f3f46]'
                    }`}
                >
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${activeScreenshot.showReflection ? 'left-[18px]' : 'left-0.5'
                    }`} />
                </button>
              </div>
              <div className="flex items-center justify-between bg-[#18181b] border border-[#27272a] rounded-lg px-3 py-2">
                <span className="text-[11px] text-[#fafafa]">Device shadow</span>
                <button
                  onClick={() => updateScreenshotConfig({ showShadow: !activeScreenshot.showShadow })}
                  className={`w-8 h-4 rounded-full relative transition-colors ${activeScreenshot.showShadow ? 'bg-[#0066ff]' : 'bg-[#3f3f46]'
                    }`}
                >
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${activeScreenshot.showShadow ? 'left-[18px]' : 'left-0.5'
                    }`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-4 my-4 h-px bg-[#27272a]" />

        {/* ── Design ── */}
        <div className="px-4 space-y-5 pb-4">
          <SectionTitle>Background</SectionTitle>

          {/* Gradient Presets */}
          <div>
            <label className="text-[11px] text-[#71717a] font-medium mb-2 flex items-center gap-1.5">
              <Palette size={11} className="text-[#52525b]" /> Presets
            </label>
            <div className="grid grid-cols-5 gap-2">
              {GRADIENTS.map((grad, i) => (
                <button
                  key={i}
                  onClick={() => updateScreenshotConfig({ bgGradient: grad, bgColor: 'transparent' })}
                  className={`w-full aspect-square rounded-lg transition-all duration-200 ring-2 ring-offset-1 ring-offset-[#18181b] ${activeScreenshot.bgGradient === grad
                      ? 'ring-[#0066ff] scale-110 shadow-lg'
                      : 'ring-transparent hover:ring-white/20 hover:scale-105'
                    }`}
                  style={{ background: grad }}
                />
              ))}
            </div>
          </div>

          {/* Solid Color */}
          <div>
            <label className="text-[11px] text-[#71717a] font-medium mb-1.5 block">Solid color</label>
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-lg border border-[#3f3f46] overflow-hidden shrink-0 group cursor-pointer">
                <input
                  type="color"
                  value={activeScreenshot.bgColor}
                  onChange={(e) => updateScreenshotConfig({ bgColor: e.target.value, bgGradient: 'none' })}
                  className="absolute inset-[-10px] w-[200%] h-[200%] cursor-pointer"
                />
              </div>
              <input
                type="text"
                value={activeScreenshot.bgColor}
                onChange={(e) => updateScreenshotConfig({ bgColor: e.target.value, bgGradient: 'none' })}
                className="flex-1 bg-[#27272a] border border-[#3f3f46] rounded-lg px-3 py-2 text-[12px] font-mono font-medium text-[#fafafa] focus:ring-2 focus:ring-[#0066ff]/25 focus:border-[#0066ff]/40 focus:outline-none uppercase transition-all"
              />
            </div>
          </div>

          {/* Background Image */}
          <div>
            <label className="text-[11px] text-[#71717a] font-medium mb-1.5 flex items-center gap-1.5">
              <ImageIcon size={11} className="text-[#52525b]" /> Background image
            </label>
            <div
              onClick={() => document.getElementById('bg-image-upload')?.click()}
              className={`relative group w-full border border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${activeScreenshot.bgImageUrl
                  ? 'border-[#0066ff]/40 bg-[#0066ff]/5'
                  : 'border-[#3f3f46] bg-[#27272a]/30 hover:bg-[#27272a]'
                }`}
            >
              <input
                id="bg-image-upload"
                type="file"
                accept="image/*"
                onChange={handleBgImageUpload}
                className="hidden"
              />
              {activeScreenshot.bgImageUrl ? (
                <div className="flex items-center gap-3 w-full">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#3f3f46] shrink-0">
                    <img src={activeScreenshot.bgImageUrl} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-[#fafafa] truncate">Background active</p>
                    <div className="flex gap-3 mt-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); updateScreenshotConfig({ bgImageUrl: null }); }}
                        className="text-[10px] text-red-400 hover:text-red-300 transition-colors font-medium"
                      >
                        Remove
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); applyBgToAll(); }}
                        className="text-[10px] text-[#0066ff] hover:text-[#0066ff]/80 transition-colors font-semibold"
                      >
                        Apply to all slides
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[#71717a]">
                  <Upload size={14} />
                  <span className="text-[11px]">Upload custom BG</span>
                </div>
              )}
            </div>
          </div>

          {/* Layout Strategy */}
          <div>
            <SectionTitle>Layout</SectionTitle>
            <div className="flex bg-[#27272a] p-[3px] rounded-lg relative">
              <motion.div
                className="absolute bg-[#3f3f46] rounded-[7px] h-[calc(100%-6px)] top-[3px]"
                initial={false}
                animate={{
                  left: activeScreenshot.layout === 'top' ? '3px' : activeScreenshot.layout === 'center' ? 'calc(33.33% + 1px)' : 'calc(66.66% + 1px)',
                  width: 'calc(33.33% - 4px)'
                }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
              {LAYOUT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => updateScreenshotConfig({ layout: opt.id as any })}
                  className={`flex-1 relative z-10 py-2.5 flex flex-col items-center gap-1 rounded-[7px] transition-colors ${activeScreenshot.layout === opt.id
                      ? 'text-[#fafafa]'
                      : 'text-[#71717a] hover:text-[#a1a1aa]'
                    }`}
                >
                  <opt.icon size={14} />
                  <span className="text-[10px] font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Export Actions ── */}
      <div className="p-4 border-t border-[#27272a] bg-[#09090b] space-y-2.5">
        <button
          onClick={() => exportScreenshot(`screenshot-canvas-${activeScreenshotId}`)}
          disabled={isExporting}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-[#27272a] border border-[#3f3f46] rounded-lg text-[12px] font-medium text-[#fafafa] hover:bg-[#3f3f46] hover:border-[#52525b] disabled:opacity-30 disabled:pointer-events-none transition-all duration-150"
        >
          <Download size={14} /> Export Current
        </button>
        <button
          onClick={exportAllScreenshots}
          disabled={isExporting}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-[#0066ff] text-white rounded-xl text-[13px] font-semibold hover:bg-[#0052cc] disabled:opacity-30 disabled:pointer-events-none shadow-sm shadow-[#0066ff]/25 transition-all duration-150 active:scale-[0.98]"
        >
          {isExporting ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Layers size={16} />
          )}
          {isExporting ? 'Generating...' : `Export All (${screenshots.length} slides)`}
        </button>
      </div>
    </aside>
  );
};
