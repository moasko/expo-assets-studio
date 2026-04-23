import { StudioProvider, useStudio } from './context/StudioContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Workspace } from './components/layout/Workspace';
import { RightSidebar } from './components/layout/RightSidebar';
import { DragOverlay } from './components/features/DragOverlay';

function AppContent() {
  const { setIsDragging } = useStudio();

  return (
    <div 
      className="h-screen bg-[#09090b] text-[#fafafa] font-sans flex flex-col relative overflow-hidden"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
    >
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <Workspace />
        <RightSidebar />
      </div>

      <DragOverlay />
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
