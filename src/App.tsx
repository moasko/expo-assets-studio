import { StudioProvider, useStudio } from './context/StudioContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ScreenshotSidebar } from './components/layout/ScreenshotSidebar';
import { Workspace } from './components/layout/Workspace';
import { RightSidebar } from './components/layout/RightSidebar';
import { DragOverlay } from './components/features/DragOverlay';
import { Toaster } from 'sonner';
import { Layout, Image as ImageIcon } from 'lucide-react';

function AppContent() {
  const { appMode, setAppMode, setIsDragging } = useStudio();

  return (
    <div 
      className="h-screen bg-[#09090b] text-[#fafafa] font-sans flex flex-col relative overflow-hidden"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
    >
      <Header />
      
      <div className="flex-1 flex overflow-hidden relative">
        {appMode === 'assets' ? <Sidebar /> : <ScreenshotSidebar />}
        <Workspace />
        {appMode === 'assets' && <RightSidebar />}
      </div>

      {/* Mode Switcher Floating Bar - Centered over Header */}
      <div className="absolute top-[9px] left-1/2 -translate-x-1/2 z-[100] flex bg-[#18181b]/80 backdrop-blur-md border border-[#27272a] p-1 rounded-full shadow-2xl">
        <button
          onClick={() => setAppMode('assets')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 ${
            appMode === 'assets' 
            ? 'bg-[#0066ff] text-white shadow-lg shadow-[#0066ff]/20' 
            : 'text-[#71717a] hover:text-[#fafafa]'
          }`}
        >
          <Layout size={14} />
          Asset Studio
        </button>
        <button
          onClick={() => setAppMode('screenshots')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 ${
            appMode === 'screenshots' 
            ? 'bg-[#0066ff] text-white shadow-lg shadow-[#0066ff]/20' 
            : 'text-[#71717a] hover:text-[#fafafa]'
          }`}
        >
          <ImageIcon size={14} />
          Screenshot Studio
        </button>
      </div>

      <DragOverlay />
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: { background: '#18181b', border: '1px solid #27272a', color: '#fafafa' }
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <StudioProvider>
      <AppContent />
    </StudioProvider>
  );
}
