import { Camera, Upload, Video, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useRef, useState } from 'react';

export function CameraScreen() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<'photo' | 'video'>('photo');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleCapture = () => {
    // Simulate camera capture
    alert(`${mode === 'photo' ? 'Photo' : 'Video'} captured! In a real app, this would access your device camera.`);
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedFile(url);
      // Show preview and allow user to confirm
      setTimeout(() => {
        alert('File uploaded! In a real app, this would be processed for AI scoring.');
        setSelectedFile(null);
      }, 1000);
    }
  };

  const handleVideoUpload = () => {
    videoInputRef.current?.click();
  };

  const handleVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedFile(url);
      // Show preview and allow user to confirm
      setTimeout(() => {
        alert('Video uploaded! In a real app, this would be processed for AI scoring.');
        setSelectedFile(null);
      }, 1000);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'photo' ? 'video' : 'photo');
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleVideoSelect}
      />

      {/* Camera Viewfinder Area */}
      <div className="flex-1 relative flex items-center justify-center bg-gradient-to-b from-gray-950 via-black to-gray-950">
        {/* Camera placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black">
          {selectedFile ? (
            <div className="absolute inset-0 flex items-center justify-center">
              {mode === 'photo' ? (
                <img src={selectedFile} alt="Preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <video src={selectedFile} className="max-w-full max-h-full object-contain" controls />
              )}
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Camera className="w-24 h-24 text-white/20 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]" />
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl" />
              </div>
            </div>
          )}
        </div>

        {/* Mode Indicator - Enhanced */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
          <div className={`relative bg-gradient-to-r ${mode === 'photo' ? 'from-green-500/20 to-emerald-500/20 border-green-400/40' : 'from-blue-500/20 to-cyan-500/20 border-blue-400/40'} backdrop-blur-md rounded-full px-6 py-2 border-2 shadow-xl`}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-full animate-pulse" />
            <p className={`relative text-sm font-bold ${mode === 'photo' ? 'text-green-300' : 'text-blue-300'} drop-shadow-lg`}>
              {mode === 'photo' ? '📸 PHOTO MODE' : '🎥 VIDEO MODE'}
            </p>
          </div>
        </div>

        {/* Overlay Instructions - Enhanced */}
        <div className="absolute inset-x-0 top-20 px-6 z-10">
          <Card className="relative p-6 bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-cyan-500/10 border-2 border-white/30 shadow-2xl shadow-purple-500/20 backdrop-blur-md overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-blue-500/5 animate-pulse" />
            
            <div className="relative">
              <h2 className="font-bold text-center mb-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg text-xl">
                Ready to record?
              </h2>
              <p className="text-white/80 text-center">
                Take a video of your set or a photo of your meal
              </p>
            </div>
          </Card>
        </div>

        {/* Camera Controls - Enhanced */}
        <div className="absolute inset-x-0 bottom-0 pb-8 px-6 z-10">
          <div className="flex items-center justify-center gap-8">
            {/* Upload from Gallery */}
            <Button
              variant="outline"
              size="icon"
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/30 hover:from-white/20 hover:to-white/10 backdrop-blur-md shadow-xl hover:scale-110 transition-all"
              onClick={handleUpload}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
              <Upload className="relative w-6 h-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
            </Button>

            {/* Main Capture Button - Enhanced */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 rounded-full blur-2xl animate-pulse" />
              <button 
                className="relative w-24 h-24 rounded-full bg-white border-4 border-white/50 shadow-[0_0_40px_rgba(255,255,255,0.8)] hover:scale-110 transition-transform active:scale-95" 
                onClick={handleCapture}
              >
                <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white via-blue-100 to-purple-200 shadow-inner" />
                {mode === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                  </div>
                )}
              </button>
            </div>

            {/* Switch Camera/Mode - Enhanced */}
            <Button
              variant="outline"
              size="icon"
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/30 hover:from-white/20 hover:to-white/10 backdrop-blur-md shadow-xl hover:scale-110 transition-all"
              onClick={toggleMode}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${mode === 'photo' ? 'from-blue-500/20 to-cyan-500/10' : 'from-green-500/20 to-emerald-500/10'} rounded-full opacity-0 hover:opacity-100 transition-opacity`} />
              <Video className="relative w-6 h-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Tips Section - Enhanced */}
      <div className="px-6 py-6 bg-gradient-to-b from-background to-gray-900 border-t border-white/10">
        <div className="grid grid-cols-2 gap-3">
          <Card className="relative p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/15 border-2 border-blue-400/40 shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-cyan-500/5 animate-pulse" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/30 rounded-lg border border-blue-400/30">
                  <Video className="w-5 h-5 text-blue-300 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                </div>
                <h4 className="font-bold text-blue-300">Workout</h4>
              </div>
              <p className="text-xs text-blue-200/80 font-medium">Record your sets for AI scoring</p>
            </div>
          </Card>

          <Card className="relative p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/15 border-2 border-green-400/40 shadow-xl shadow-green-500/20 hover:scale-105 transition-transform overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-500/5 animate-pulse" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/30 rounded-lg border border-green-400/30">
                  <ImageIcon className="w-5 h-5 text-green-300 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                </div>
                <h4 className="font-bold text-green-300">Meal</h4>
              </div>
              <p className="text-xs text-green-200/80 font-medium">Snap a photo for nutrition analysis</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}