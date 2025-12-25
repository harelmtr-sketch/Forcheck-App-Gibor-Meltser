import { Camera, Upload, Video, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function CameraScreen() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-background to-gray-900">
      {/* Camera Viewfinder Area */}
      <div className="flex-1 relative flex items-center justify-center bg-gray-950">
        {/* Camera placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera className="w-24 h-24 text-white/20" />
          </div>
        </div>

        {/* Overlay Instructions */}
        <div className="absolute inset-x-0 top-20 px-6 z-10">
          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-white font-bold text-center mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              Ready to record?
            </h2>
            <p className="text-white/80 text-sm text-center">
              Take a video of your set or a photo of your meal
            </p>
          </div>
        </div>

        {/* Camera Controls */}
        <div className="absolute inset-x-0 bottom-0 pb-8 px-6 z-10">
          <div className="flex items-center justify-center gap-6">
            {/* Upload from Gallery */}
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full bg-white/10 border-white/30 hover:bg-white/20 backdrop-blur-md"
            >
              <Upload className="w-6 h-6 text-white" />
            </Button>

            {/* Main Capture Button */}
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-xl" />
              <button className="relative w-20 h-20 rounded-full bg-white border-4 border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:scale-105 transition-transform">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white to-gray-200" />
              </button>
            </div>

            {/* Switch Camera/Mode */}
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full bg-white/10 border-white/30 hover:bg-white/20 backdrop-blur-md"
            >
              <Video className="w-6 h-6 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Tips Section */}
      <div className="px-6 py-6 bg-background border-t border-white/10">
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-gradient-to-br from-white/10 to-white/5 border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <Video className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              </div>
              <h4 className="text-sm font-bold text-white">Workout</h4>
            </div>
            <p className="text-xs text-gray-400">Record your sets for AI scoring</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-white/10 to-white/5 border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <ImageIcon className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              </div>
              <h4 className="text-sm font-bold text-white">Meal</h4>
            </div>
            <p className="text-xs text-gray-400">Snap a photo for nutrition analysis</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
