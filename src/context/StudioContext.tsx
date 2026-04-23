import { createContext, useContext, useState, ReactNode, useRef, ChangeEvent, RefObject, DragEvent } from 'react';
import { AssetType, Theme, Device, Notification } from '../types';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface StudioContextType {
  logoUrl: string | null;
  setLogoUrl: (url: string | null) => void;
  assetType: AssetType;
  setAssetType: (type: AssetType) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  darkBgColor: string;
  setDarkBgColor: (color: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  logoScale: number;
  setLogoScale: (scale: number) => void;
  previewDevice: Device;
  setPreviewDevice: (device: Device) => void;
  showSafeArea: boolean;
  setShowSafeArea: (show: boolean) => void;
  isExporting: boolean;
  notification: Notification | null;
  notify: (message: string, type?: 'success' | 'info') => void;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  resetStudio: () => void;
  downloadSingle: (isDark: boolean) => Promise<void>;
  exportAll: () => Promise<void>;
  copyConfig: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  copySuccess: boolean;
  suggestedColors: string[];
  isDragging: boolean;
  setIsDragging: (value: boolean) => void;
  handleFileDrop: (e: DragEvent) => void;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export const StudioProvider = ({ children }: { children: ReactNode }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [assetType, setAssetType] = useState<AssetType>('icon');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [darkBgColor, setDarkBgColor] = useState('#000000');
  const [theme, setTheme] = useState<Theme>('light');
  const [logoScale, setLogoScale] = useState(60);
  const [previewDevice, setPreviewDevice] = useState<Device>('ios');
  const [showSafeArea, setShowSafeArea] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [suggestedColors, setSuggestedColors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const notify = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const extractColors = (imgSrc: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Small scale for performance and better averaging
      canvas.width = 50;
      canvas.height = 50;
      ctx.drawImage(img, 0, 0, 50, 50);

      const imageData = ctx.getImageData(0, 0, 50, 50).data;
      const colorCounts: Record<string, number> = {};

      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i+1];
        const b = imageData[i+2];
        const a = imageData[i+3];

        // Skip transparent or very light/dark pixels if desired, 
        // but here we just take the most frequent ones
        if (a < 128) continue; 

        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        colorCounts[hex] = (colorCounts[hex] || 0) + 1;
      }

      const sortedColors = Object.entries(colorCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([color]) => color);

      setSuggestedColors(sortedColors);
    };
    img.src = imgSrc;
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setLogoUrl(result);
        extractColors(result);
        notify("Logo uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setLogoUrl(result);
        extractColors(result);
        notify("Logo uploaded via drop");
      };
      reader.readAsDataURL(file);
    } else {
      notify("Please drop a valid image file", "info");
    }
  };

  const resetStudio = () => {
    setLogoUrl(null);
    setBgColor('#ffffff');
    setDarkBgColor('#000000');
    setLogoScale(60);
    setAssetType('icon');
    notify("Studio reset to defaults", "info");
  };

  const generateAssetBlob = async (type: AssetType, isDark: boolean): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx || !logoUrl) return resolve(null);

      let size = 1024;
      if (type === 'splash') size = 2048;
      if (type === 'favicon') size = 48;
      
      canvas.width = size;
      canvas.height = size;

      ctx.fillStyle = isDark ? darkBgColor : bgColor;
      ctx.fillRect(0, 0, size, size);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const scale = logoScale / 100;
        const drawWidth = size * scale;
        const imgWidth = img.width || size;
        const imgHeight = img.height || size;
        const drawHeight = (imgHeight / imgWidth) * drawWidth;
        const x = (size - drawWidth) / 2;
        const y = (size - drawHeight) / 2;

        ctx.drawImage(img, x, y, drawWidth, drawHeight);
        canvas.toBlob((blob) => resolve(blob), 'image/png');
      };
      img.onerror = () => resolve(null);
      img.src = logoUrl;
    });
  };

  const downloadSingle = async (isDark: boolean) => {
    const blob = await generateAssetBlob(assetType, isDark);
    if (blob) {
      let fileName = '';
      if (assetType === 'icon') fileName = 'icon.png';
      else if (assetType === 'splash') fileName = isDark ? 'splash-icon-dark.png' : 'splash-icon.png';
      else if (assetType === 'adaptive-icon') fileName = 'adaptive-icon.png';
      else if (assetType === 'favicon') fileName = 'favicon.png';
      saveAs(blob, fileName);
      notify(`Downloaded ${fileName}`);
    }
  };

  const exportAll = async () => {
    if (!logoUrl) return;
    setIsExporting(true);
    try {
      const zip = new JSZip();
      const assetsFolder = zip.folder("assets");
      const tasks = [
        { type: 'icon', isDark: false, name: 'icon.png' },
        { type: 'splash', isDark: false, name: 'splash-icon.png' },
        { type: 'splash', isDark: true, name: 'splash-icon-dark.png' },
        { type: 'adaptive-icon', isDark: false, name: 'adaptive-icon.png' },
        { type: 'favicon', isDark: false, name: 'favicon.png' },
      ];

      const results = await Promise.all(tasks.map(async (task) => {
        const blob = await generateAssetBlob(task.type as AssetType, task.isDark);
        return { ...task, blob };
      }));

      results.forEach(result => {
        if (result.blob && assetsFolder) {
          assetsFolder.file(result.name, result.blob);
        }
      });

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "expo-assets-bundle.zip");
      notify("Asset bundle exported successfully");
    } catch (error) {
      notify("Export failed", "info");
    } finally {
      setIsExporting(false);
    }
  };

  const copyConfig = () => {
    const config = assetType === 'adaptive-icon' ? {
      android: {
        adaptiveIcon: { foregroundImage: "./assets/adaptive-icon.png", backgroundColor: bgColor }
      }
    } : assetType === 'favicon' ? {
      web: { favicon: "./assets/favicon.png" }
    } : {
      userInterfaceStyle: "automatic",
      [assetType === 'icon' ? 'icon' : 'splash']: {
        image: `./assets/${assetType === 'icon' ? 'icon.png' : 'splash-icon.png'}`,
        resizeMode: "contain",
        backgroundColor: bgColor,
        dark: {
          image: `./assets/${assetType === 'icon' ? 'icon.png' : 'splash-icon-dark.png'}`,
          backgroundColor: darkBgColor
        }
      }
    };

    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopySuccess(true);
    notify("Config copied to clipboard");
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <StudioContext.Provider value={{
      logoUrl, setLogoUrl, assetType, setAssetType, bgColor, setBgColor,
      darkBgColor, setDarkBgColor, theme, setTheme, logoScale, setLogoScale,
      previewDevice, setPreviewDevice, showSafeArea, setShowSafeArea,
      isExporting, notification, notify, handleFileUpload, resetStudio, downloadSingle,
      exportAll, copyConfig, fileInputRef, copySuccess, suggestedColors,
      isDragging, setIsDragging, handleFileDrop
    }}>
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) throw new Error('useStudio must be used within a StudioProvider');
  return context;
};
