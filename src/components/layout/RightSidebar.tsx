import { Check, Copy, BookOpen, Cpu } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { SectionTitle } from '../ui/SectionTitle';

export const RightSidebar = () => {
  const { 
    assetType, 
    bgColor, 
    darkBgColor, 
    copyConfig, 
    copySuccess,
    splashResizeMode,
    splashImageWidth
  } = useStudio();

  const getSpecs = () => {
    switch (assetType) {
      case 'splash': return '2048x2048';
      case 'favicon': return '48x48';
      case 'notification': return '96x96';
      case 'web-icons': return '192, 512';
      default: return '1024x1024';
    }
  };

  return (
    <aside className="w-[300px] border-l border-[#27272a] bg-[#18181b] hidden xl:flex flex-col shrink-0">
      <div className="flex-1 overflow-y-auto">
        {/* ── Config Snippet ── */}
        <div className="p-4">
          <SectionTitle>app.json config</SectionTitle>
          <div className="relative group rounded-xl overflow-hidden">
            <div className="absolute right-2 top-2 z-10">
              <button 
                onClick={copyConfig}
                className="p-1.5 bg-white/5 hover:bg-white/10 text-[#71717a] hover:text-[#fafafa] rounded-md transition-all duration-150 backdrop-blur-sm"
                aria-label="Copy configuration"
              >
                {copySuccess ? <Check size={13} className="text-[#22c55e]" strokeWidth={2.5} /> : <Copy size={13} />}
              </button>
            </div>
            <div className="p-4 bg-[#09090b] rounded-xl font-mono text-[11px] text-[#a1a1aa] leading-[1.7] overflow-x-auto border border-[#27272a]">
              <p className="text-[#52525b] mb-2 text-[10px]">// app.json</p>
              
              {assetType === 'splash' ? (
                <>
                  <p><span className="text-[#0066ff]">"plugins"</span>: [</p>
                  <p className="pl-4">[</p>
                  <p className="pl-8"><span className="text-[#0066ff]">"expo-splash-screen"</span>,</p>
                  <p className="pl-8">&#123;</p>
                  <p className="pl-12"><span className="text-[#0066ff]">"backgroundColor"</span>: <span className="text-[#22c55e]">"{bgColor}"</span>,</p>
                  <p className="pl-12"><span className="text-[#0066ff]">"image"</span>: <span className="text-[#22c55e]">"./assets/splash-icon.png"</span>,</p>
                  <p className="pl-12"><span className="text-[#0066ff]">"imageWidth"</span>: <span className="text-[#22c55e]">{splashImageWidth}</span>,</p>
                  <p className="pl-12"><span className="text-[#0066ff]">"resizeMode"</span>: <span className="text-[#22c55e]">"{splashResizeMode}"</span></p>
                  <p className="pl-8">&#125;</p>
                  <p className="pl-4">]</p>
                  <p>]</p>
                </>
              ) : assetType === 'adaptive-foreground' || assetType === 'monochrome' ? (
                <>
                  <p><span className="text-[#0066ff]">"android"</span>: &#123;</p>
                  <p className="pl-4"><span className="text-[#0066ff]">"adaptiveIcon"</span>: &#123;</p>
                  <p className="pl-8"><span className="text-[#0066ff]">"foregroundImage"</span>: <span className="text-[#22c55e]">"./assets/adaptive-foreground.png"</span>,</p>
                  <p className="pl-8"><span className="text-[#0066ff]">"monochromeImage"</span>: <span className="text-[#22c55e]">"./assets/monochrome-icon.png"</span>,</p>
                  <p className="pl-8"><span className="text-[#0066ff]">"backgroundColor"</span>: <span className="text-[#22c55e]">"{bgColor}"</span></p>
                  <p className="pl-4">&#125;</p>
                  <p>&#125;</p>
                </>
              ) : assetType === 'notification' ? (
                <>
                  <p><span className="text-[#0066ff]">"android"</span>: &#123;</p>
                  <p className="pl-4"><span className="text-[#0066ff]">"notification"</span>: &#123;</p>
                  <p className="pl-8"><span className="text-[#0066ff]">"icon"</span>: <span className="text-[#22c55e]">"./assets/notification-icon.png"</span>,</p>
                  <p className="pl-8"><span className="text-[#0066ff]">"color"</span>: <span className="text-[#22c55e]">"{bgColor}"</span></p>
                  <p className="pl-4">&#125;</p>
                  <p>&#125;</p>
                </>
              ) : assetType === 'favicon' || assetType === 'web-icons' ? (
                <>
                  <p><span className="text-[#0066ff]">"web"</span>: &#123;</p>
                  <p className="pl-4"><span className="text-[#0066ff]">"favicon"</span>: <span className="text-[#22c55e]">"./assets/favicon.png"</span></p>
                  <p>&#125;</p>
                </>
              ) : (
                <>
                  <p><span className="text-[#0066ff]">"icon"</span>: <span className="text-[#22c55e]">"./assets/icon.png"</span>,</p>
                  <p><span className="text-[#0066ff]">"userInterfaceStyle"</span>: <span className="text-[#22c55e]">"automatic"</span></p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mx-4 h-px bg-[#27272a]" />

        {/* ── Technical Specs ── */}
        <div className="p-4">
          <SectionTitle>Specs</SectionTitle>
          <div className="space-y-0.5">
            {[
              { label: 'Resolution', value: getSpecs() },
              { label: 'Format', value: 'PNG-24' },
              { label: 'Color Space', value: 'sRGB' },
              { label: 'Density', value: '72 DPI' }
            ].map((spec) => (
              <div key={spec.label} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#27272a] transition-colors">
                <span className="text-[12px] text-[#71717a]">{spec.label}</span>
                <span className="text-[12px] font-mono font-medium text-[#fafafa] tabular-nums">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-4 h-px bg-[#27272a]" />

        {/* ── Tips ── */}
        <div className="p-4">
          <SectionTitle>Tips</SectionTitle>
          <div className="space-y-2.5">
            <div className="flex gap-3 p-3 bg-[#27272a]/60 rounded-xl border border-[#27272a]">
              <div className="w-7 h-7 rounded-lg bg-[#0066ff]/10 flex items-center justify-center text-[#0066ff] shrink-0 mt-0.5">
                <BookOpen size={13} />
              </div>
              <p className="text-[12px] text-[#a1a1aa] leading-relaxed">
                SDK 50+ uses the <code className="text-[#0066ff]">expo-splash-screen</code> plugin for better control.
              </p>
            </div>
            <div className="flex gap-3 p-3 bg-[#27272a]/60 rounded-xl border border-[#27272a]">
              <div className="w-7 h-7 rounded-lg bg-[#0066ff]/10 flex items-center justify-center text-[#0066ff] shrink-0 mt-0.5">
                <BookOpen size={13} />
              </div>
              <p className="text-[12px] text-[#a1a1aa] leading-relaxed">
                Android Monochrome icons are required for high-quality themed icon support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="px-4 py-3 border-t border-[#27272a] flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] text-[#71717a]">
          <Cpu size={12} />
          <span>Engine stable</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          <span className="text-[11px] text-[#71717a]">Ready</span>
        </div>
      </div>
    </aside>
  );
};

