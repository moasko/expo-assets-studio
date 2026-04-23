import { motion, AnimatePresence } from 'motion/react';
import { Upload, Image } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';

export const DragOverlay = () => {
  const { isDragging, setIsDragging, handleFileDrop } = useStudio();

  return (
    <AnimatePresence>
      {isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleFileDrop}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex items-center justify-center p-12"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-md bg-[#18181b] rounded-2xl border border-[#27272a] shadow-2xl shadow-black/50 p-10 flex flex-col items-center justify-center gap-5"
          >
            <div className="relative">
              <div className="w-20 h-20 bg-[#0066ff] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#0066ff]/30">
                <Image size={32} strokeWidth={1.8} />
              </div>
              <motion.div
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#27272a] rounded-xl flex items-center justify-center shadow-md border border-[#3f3f46]"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <Upload size={14} className="text-[#0066ff]" strokeWidth={2.5} />
              </motion.div>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-[#fafafa] mb-1.5">Drop your logo</h2>
              <p className="text-[13px] text-[#71717a] leading-relaxed">
                Release to import your source asset
              </p>
            </div>

            <div className="w-full border-2 border-dashed border-[#0066ff]/25 rounded-2xl py-6 flex items-center justify-center">
              <span className="text-[12px] font-medium text-[#0066ff]/50">PNG, SVG, JPEG</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
