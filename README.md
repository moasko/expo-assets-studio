# 📐 Asset Studio for Expo

**Professional asset generation engine for Expo & React Native projects.**

Asset Studio is a high-performance web tool designed to bridge the gap between design and production. It allows developers to generate, preview, and export production-ready app icons, splash screens, and adaptive icons that perfectly match Expo's latest standards (SDK 50+).

![Asset Studio Preview](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200)

## ✨ Features

- **Expo-First Design**: Built with the official Expo dark design language for a seamless developer experience.
- **Live Phone Mockups**: Real-time preview on high-fidelity iOS (Dynamic Island) and Android frames.
- **Adaptive Icon Support**: Easily manage foreground and background layers for Android adaptive icons.
- **Automated Config**: Generates the exact `app.json` snippet for your assets.
- **Multi-Format Export**: One-click ZIP export containing all required resolutions (1024px, 2048px, etc.).
- **Smart Color Extraction**: Automatically suggests background colors based on your uploaded logo.
- **Safe Area Guides**: Toggleable overlays to ensure your branding is never cropped on device screens.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/asset-studio.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion (Motion/React)
- **Icons**: Lucide React
- **State Management**: React Context API
- **Asset Processing**: HTML5 Canvas + JSZip

## 📖 Configuration

The tool generates assets that follow the standard Expo project structure. Simply place the exported files in your `./assets` directory and update your `app.json`:

```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }
  }
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ for the Expo Community.
