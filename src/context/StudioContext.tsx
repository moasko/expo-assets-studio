import { createContext, useContext, useState, ReactNode, useRef, ChangeEvent, RefObject, DragEvent } from 'react';
import { AssetType, Theme, Device, Notification, SplashResizeMode, AndroidMask, AppMode, ScreenshotConfig } from '../types';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';

interface StudioContextType {
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
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
  splashResizeMode: SplashResizeMode;
  setSplashResizeMode: (mode: SplashResizeMode) => void;
  splashImageWidth: number;
  setSplashImageWidth: (width: number) => void;
  androidMask: AndroidMask;
  setAndroidMask: (mask: AndroidMask) => void;
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
  // Screenshot Studio
  screenshots: ScreenshotConfig[];
  activeScreenshotId: string;
  setActiveScreenshotId: (id: string) => void;
  addScreenshot: () => void;
  removeScreenshot: (id: string) => void;
  duplicateScreenshot: (id: string) => void;
  updateScreenshotConfig: (config: Partial<ScreenshotConfig>) => void;
  syncAllScreenshots: () => void;
  handleScreenshotUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBgImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  applyScreenshotToAll: () => void;
  applyBgToAll: () => void;
  exportScreenshot: (id: string) => Promise<void>;
  exportAllScreenshots: () => Promise<void>;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const createNewScreenshot = (id: string): ScreenshotConfig => ({
  id,
  title: 'Your App Title',
  subtitle: 'The best app for your daily needs',
  titleColor: '#ffffff',
  subtitleColor: '#a1a1aa',
  bgColor: '#0066ff',
  bgGradient: 'linear-gradient(135deg, #0066ff 0%, #00d2ff 100%)',
  deviceType: 'ios',
  screenshotUrl: null,
  layout: 'top',
  fontSize: 32,
  deviceScale: 75,
  deviceRotation: 0,
  deviceOffsetX: 0,
  deviceOffsetY: 0,
  showTitle: true,
  showSubtitle: true,
  fontFamily: 'Inter',
  bgImageUrl: null
});

export const StudioProvider = ({ children }: { children: ReactNode }) => {
  const [appMode, setAppMode] = useState<AppMode>('assets');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [assetType, setAssetType] = useState<AssetType>('icon');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [darkBgColor, setDarkBgColor] = useState('#000000');
  const [theme, setTheme] = useState<Theme>('light');
  const [logoScale, setLogoScale] = useState(60);
  const [splashResizeMode, setSplashResizeMode] = useState<SplashResizeMode>('contain');
  const [splashImageWidth, setSplashImageWidth] = useState(200);
  const [androidMask, setAndroidMask] = useState<AndroidMask>('circle');
  const [previewDevice, setPreviewDevice] = useState<Device>('ios');
  const [showSafeArea, setShowSafeArea] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [suggestedColors, setSuggestedColors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Screenshot state
  const [screenshots, setScreenshots] = useState<ScreenshotConfig[]>([createNewScreenshot(Date.now().toString())]);
  const [activeScreenshotId, setActiveScreenshotId] = useState<string>(screenshots[0].id);

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

  const handleScreenshotUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateScreenshotConfig({ screenshotUrl: url });
      // Reset input value to allow selecting the same file again
      e.target.value = '';
      notify("Screenshot uploaded successfully");
    }
  };

  const handleBgImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        updateScreenshotConfig({ bgImageUrl: result });
        // Reset input value to allow selecting the same file again
        e.target.value = '';
        notify("Background image uploaded");
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
        if (appMode === 'assets') {
          setLogoUrl(result);
          extractColors(result);
        } else {
          updateScreenshotConfig({ screenshotUrl: result });
        }
        notify("File uploaded via drop");
      };
      reader.readAsDataURL(file);
    } else {
      notify("Please drop a valid image file", "info");
    }
  };

  const addScreenshot = () => {
    const newS = createNewScreenshot(Date.now().toString());
    setScreenshots(prev => [...prev, newS]);
    setActiveScreenshotId(newS.id);
    notify("New screenshot added");
  };

  const removeScreenshot = (id: string) => {
    if (screenshots.length <= 1) return notify("Cannot remove the last screenshot", "info");
    setScreenshots(prev => prev.filter(s => s.id !== id));
    if (activeScreenshotId === id) {
      setActiveScreenshotId(screenshots.find(s => s.id !== id)?.id || '');
    }
    notify("Screenshot removed");
  };

  const duplicateScreenshot = (id: string) => {
    const target = screenshots.find(s => s.id === id);
    if (!target) return;
    const newS = { ...target, id: Date.now().toString() };
    setScreenshots(prev => [...prev, newS]);
    setActiveScreenshotId(newS.id);
    notify("Screenshot duplicated");
  };

  const updateScreenshotConfig = (config: Partial<ScreenshotConfig>) => {
    setScreenshots(prev => prev.map(s => s.id === activeScreenshotId ? { ...s, ...config } : s));
  };

  const syncAllScreenshots = () => {
    const active = screenshots.find(s => s.id === activeScreenshotId);
    if (!active) return;

    setScreenshots(prev => prev.map(s => ({
      ...s,
      deviceType: active.deviceType,
      deviceScale: active.deviceScale,
      deviceRotation: active.deviceRotation,
      deviceOffsetX: active.deviceOffsetX,
      deviceOffsetY: active.deviceOffsetY,
      layout: active.layout,
      fontSize: active.fontSize,
      fontFamily: active.fontFamily,
      titleColor: active.titleColor,
      subtitleColor: active.subtitleColor,
      bgColor: active.bgColor,
      bgGradient: active.bgGradient,
      showTitle: active.showTitle,
      showSubtitle: active.showSubtitle,
    })));
    notify("Applied current style to all slides");
  };

  const applyScreenshotToAll = () => {
    const active = screenshots.find(s => s.id === activeScreenshotId);
    if (!active || !active.screenshotUrl) return;
    setScreenshots(prev => prev.map(s => ({ ...s, screenshotUrl: active.screenshotUrl })));
    notify("App screenshot applied to all slides");
  };

  const applyBgToAll = () => {
    const active = screenshots.find(s => s.id === activeScreenshotId);
    if (!active || !active.bgImageUrl) return;
    setScreenshots(prev => prev.map(s => ({ ...s, bgImageUrl: active.bgImageUrl })));
    notify("Background image applied to all slides");
  };

  const resetStudio = () => {
    if (appMode === 'assets') {
      setLogoUrl(null);
      setBgColor('#ffffff');
      setDarkBgColor('#000000');
      setLogoScale(60);
      setAssetType('icon');
      setSplashResizeMode('contain');
      setSplashImageWidth(200);
    } else {
      setScreenshots([createNewScreenshot(Date.now().toString())]);
      setActiveScreenshotId(screenshots[0].id);
    }
    notify("Studio reset to defaults", "info");
  };

  const generateAssetBlob = async (type: AssetType, isDark: boolean, customSize?: number): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx || !logoUrl) return resolve(null);

      let size = customSize || 1024;
      if (type === 'splash') size = 2048;
      if (type === 'favicon') size = 48;
      if (type === 'notification') size = 96;
      
      canvas.width = size;
      canvas.height = size;

      const needsBackground = !['adaptive-foreground', 'notification', 'monochrome'].includes(type);
      if (needsBackground) {
        ctx.fillStyle = isDark ? darkBgColor : bgColor;
        ctx.fillRect(0, 0, size, size);
      }

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

        if (type === 'monochrome') {
          const imageData = ctx.getImageData(0, 0, size, size);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = data[i + 1] = data[i + 2] = avg;
          }
          ctx.putImageData(imageData, 0, 0);
        } else if (type === 'notification') {
          const imageData = ctx.getImageData(0, 0, size, size);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i + 1] = data[i + 2] = 255;
          }
          ctx.putImageData(imageData, 0, 0);
        }

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
      else if (assetType === 'adaptive-foreground') fileName = 'adaptive-foreground.png';
      else if (assetType === 'adaptive-background') fileName = 'adaptive-background.png';
      else if (assetType === 'monochrome') fileName = 'monochrome-icon.png';
      else if (assetType === 'notification') fileName = 'notification-icon.png';
      else if (assetType === 'favicon') fileName = 'favicon.png';
      else if (assetType === 'web-icons') fileName = 'icon-192.png';
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
      const webFolder = zip.folder("web");
      
      const tasks = [
        { type: 'icon', isDark: false, name: 'icon.png', folder: assetsFolder },
        { type: 'splash', isDark: false, name: 'splash-icon.png', folder: assetsFolder },
        { type: 'splash', isDark: true, name: 'splash-icon-dark.png', folder: assetsFolder },
        { type: 'adaptive-foreground', isDark: false, name: 'adaptive-foreground.png', folder: assetsFolder },
        { type: 'adaptive-background', isDark: false, name: 'adaptive-background.png', folder: assetsFolder },
        { type: 'monochrome', isDark: false, name: 'monochrome-icon.png', folder: assetsFolder },
        { type: 'notification', isDark: false, name: 'notification-icon.png', folder: assetsFolder },
        { type: 'favicon', isDark: false, name: 'favicon.png', folder: assetsFolder },
        { type: 'web-icons', isDark: false, name: 'icon-192.png', size: 192, folder: webFolder },
        { type: 'web-icons', isDark: false, name: 'icon-512.png', size: 512, folder: webFolder },
      ];

      const results = await Promise.all(tasks.map(async (task) => {
        const blob = await generateAssetBlob(task.type as AssetType, task.isDark, task.size);
        return { ...task, blob };
      }));

      results.forEach(result => {
        if (result.blob && result.folder) {
          result.folder.file(result.name, result.blob);
        }
      });

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "expo-assets-bundle.zip");
      notify("Asset bundle exported successfully");
    } catch (error) {
      console.error(error);
      notify("Export failed", "info");
    } finally {
      setIsExporting(false);
    }
  };

  const exportScreenshot = async (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    
    setIsExporting(true);
    try {
       // Wait a bit for any transitions to settle
       await new Promise(r => setTimeout(r, 100));
       
       const dataUrl = await toPng(element, {
         quality: 1.0,
         pixelRatio: 2, // High resolution
         skipFonts: false,
       });
       
       saveAs(dataUrl, `screenshot-${id}.png`);
       notify("Screenshot exported successfully");
    } catch (err) {
       console.error(err);
       notify("Export failed", "info");
    } finally {
       setIsExporting(false);
    }
  };

  const copyConfig = () => {
    const modernConfig = {
      expo: {
        icon: "./assets/icon.png",
        userInterfaceStyle: "automatic",
        ios: { supportsTablet: true },
        android: {
          adaptiveIcon: {
            foregroundImage: "./assets/adaptive-foreground.png",
            backgroundColor: bgColor,
            monochromeImage: "./assets/monochrome-icon.png"
          },
          notification: { icon: "./assets/notification-icon.png", color: bgColor }
        },
        web: { favicon: "./assets/favicon.png" },
        plugins: [
          [
            "expo-splash-screen",
            {
              backgroundColor: bgColor,
              image: "./assets/splash-icon.png",
              dark: {
                image: "./assets/splash-icon-dark.png",
                backgroundColor: darkBgColor
              },
              imageWidth: splashImageWidth,
              resizeMode: splashResizeMode
            }
          ]
        ]
      }
    };

    navigator.clipboard.writeText(JSON.stringify(modernConfig, null, 2));
    setCopySuccess(true);
    notify("Modern config copied to clipboard");
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const exportAllScreenshots = async () => {
    if (screenshots.length === 0) return;
    
    setIsExporting(true);
    notify("Preparing bulk export...");
    
    try {
      const zip = new JSZip();
      const folder = zip.folder("screenshots");
      
      // Store current active ID to restore it later
      const originalId = activeScreenshotId;
      
      for (const s of screenshots) {
        // Switch to the screenshot to ensure it's rendered/loaded
        setActiveScreenshotId(s.id);
        // Wait for state update and rendering
        await new Promise(r => setTimeout(r, 300));
        
        const element = document.getElementById(`screenshot-canvas-${s.id}`);
        if (element) {
          const dataUrl = await toPng(element, {
            quality: 1.0,
            pixelRatio: 2,
          });
          // Remove the data:image/png;base64, part
          const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
          folder?.file(`screenshot-${s.id}.png`, base64Data, { base64: true });
        }
      }
      
      // Restore original view
      setActiveScreenshotId(originalId);
      
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "screenshots-bundle.zip");
      notify("All screenshots exported in ZIP");
    } catch (err) {
      console.error(err);
      notify("Bulk export failed", "info");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <StudioContext.Provider value={{
      appMode, setAppMode,
      logoUrl, setLogoUrl, assetType, setAssetType, bgColor, setBgColor,
      darkBgColor, setDarkBgColor, theme, setTheme, logoScale, setLogoScale,
      splashResizeMode, setSplashResizeMode, splashImageWidth, setSplashImageWidth,
      androidMask, setAndroidMask,
      previewDevice, setPreviewDevice, showSafeArea, setShowSafeArea,
      isExporting, notification, notify, handleFileUpload, resetStudio, downloadSingle,
      exportAll, copyConfig, fileInputRef, copySuccess, suggestedColors,
      isDragging, setIsDragging, handleFileDrop,
      screenshots, activeScreenshotId, setActiveScreenshotId, addScreenshot, removeScreenshot, duplicateScreenshot,
      updateScreenshotConfig, syncAllScreenshots, handleScreenshotUpload, handleBgImageUpload, 
      applyScreenshotToAll, applyBgToAll, exportScreenshot, exportAllScreenshots
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


