import { useState, useRef } from 'react';
import { Upload, Video, CheckCircle, AlertCircle, TrendingUp, Camera, Zap, Target, Award, Sparkles, Clock, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface AnalysisResult {
  score: number;
  feedback: string[];
  strengths: string[];
  improvements: string[];
  confidence: 'High' | 'Medium' | 'Low';
}

export function AnalyzeScreen() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Mock last session data
  const lastSession = {
    exercise: 'Push-ups',
    score: 82,
    issuesFixed: 2
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setAnalysisResult(null);
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setAnalysisResult(null);
    }
  };

  const analyzeVideo = async () => {
    if (!videoFile) return;

    setIsAnalyzing(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);

    await new Promise((resolve) => setTimeout(resolve, 4000));
    clearInterval(progressInterval);
    setProgress(100);

    const mockScore = Math.floor(Math.random() * 30) + 70;
    const confidenceOptions: ('High' | 'Medium' | 'Low')[] = ['High', 'Medium', 'Low'];
    const confidence = confidenceOptions[Math.floor(Math.random() * confidenceOptions.length)];
    
    setAnalysisResult({
      score: mockScore,
      confidence,
      feedback: [
        'Your pull-up form shows good overall technique',
        'Core engagement is strong throughout the movement',
        'Consider focusing on tempo for better muscle activation',
      ],
      strengths: [
        'Full range of motion achieved',
        'Shoulder stability maintained',
        'Consistent breathing pattern',
      ],
      improvements: [
        'Reduce leg swing at the bottom',
        'Focus on controlled descent',
        'Keep elbows closer to body',
      ],
    });

    setIsAnalyzing(false);
  };

  const reset = () => {
    setVideoFile(null);
    setAnalysisResult(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-background to-background/95">
      {/* Header with White Accent */}
      <div className="px-6 py-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-7 h-7 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            <h1 className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              Analyze Form
            </h1>
          </div>
          <p className="text-muted-foreground font-medium">
            Upload or record your workout for AI-powered analysis
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        {!videoFile && !analysisResult && (
          <div className="space-y-5">
            {/* Last Analysis Summary */}
            <Card className="p-4 bg-gradient-to-br from-white/15 to-white/10 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-white mb-1">Last session: {lastSession.exercise}</p>
                  <p className="text-xs text-muted-foreground">
                    Form score <span className="text-white font-bold">{lastSession.score}</span> · <span className="text-green-400 font-semibold">{lastSession.issuesFixed} issues fixed</span>
                  </p>
                </div>
              </div>
            </Card>

            {/* Analysis Time Estimate */}
            <div className="flex items-center gap-2 justify-center py-2">
              <Clock className="w-4 h-4 text-white/60" />
              <p className="text-xs text-white/60 font-medium">Analysis takes ~10–20s</p>
            </div>

            {/* Upload Options */}
            <div className="grid grid-cols-1 gap-4">
              {/* Camera Option - Featured */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="video/*"
                capture="environment"
                onChange={handleCameraCapture}
                className="hidden"
                id="camera-capture"
              />
              <label
                htmlFor="camera-capture"
                className="relative flex flex-col items-center justify-center h-52 border-2 border-white/40 rounded-3xl cursor-pointer bg-gradient-to-br from-white/15 via-white/10 to-white/15 hover:from-white/25 hover:via-white/20 hover:to-white/25 transition-all group overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 group-hover:from-white/10 group-hover:to-white/10 transition-all" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/30 to-white/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                    <Camera className="w-12 h-12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                  </div>
                  <p className="text-xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Record with Camera</p>
                  <p className="text-sm text-white/80 font-medium">
                    Capture your workout live
                  </p>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/30 backdrop-blur-sm rounded-full border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  <span className="text-xs font-bold text-white">⭐ Recommended</span>
                </div>
              </label>

              {/* Upload Option */}
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-white/30 rounded-3xl cursor-pointer hover:bg-white/5 hover:border-white/50 transition-all group"
              >
                <div className="p-5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors mb-4">
                  <Upload className="w-9 h-9 text-white group-hover:text-white/90 transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                </div>
                <p className="font-bold text-lg mb-1">Upload Video</p>
                <p className="text-sm text-muted-foreground font-medium">
                  MP4, MOV, or AVI (max 100MB)
                </p>
              </label>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-white/15 to-white/10 border border-white/30 text-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <Target className="w-7 h-7 text-white mx-auto mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                <p className="text-xs font-semibold text-white/80">Real-time<br/>Analysis</p>
              </div>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-white/15 to-white/10 border border-white/30 text-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <Award className="w-7 h-7 text-white mx-auto mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                <p className="text-xs font-semibold text-white/80">Form<br/>Scoring</p>
              </div>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-white/15 to-white/10 border border-white/30 text-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <Sparkles className="w-7 h-7 text-white mx-auto mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                <p className="text-xs font-semibold text-white/80">AI<br/>Feedback</p>
              </div>
            </div>

            {/* Tips Section */}
            <Card className="p-5 bg-gradient-to-br from-white/10 to-white/5 border-white/30 mt-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <h4 className="text-white mb-3 flex items-center gap-2 font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                <span className="text-lg">💡</span> Pro Tips
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="text-white mt-0.5 font-bold">•</span>
                  <span className="font-medium">Position camera 6-10 feet away</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-white mt-0.5 font-bold">•</span>
                  <span className="font-medium">Ensure full body is visible in frame</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-white mt-0.5 font-bold">•</span>
                  <span className="font-medium">Good lighting improves accuracy</span>
                </li>
              </ul>
            </Card>
          </div>
        )}

        {videoFile && !analysisResult && (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-white/15 to-white/10 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <div className="flex items-center gap-4 mb-5">
                <div className="p-4 bg-white/30 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  <Video className="w-7 h-7 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-bold">{videoFile.name}</p>
                  <p className="text-sm text-white/70 font-medium">
                    {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              {isAnalyzing && (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/90 font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-pulse drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                      Analyzing your form...
                    </span>
                    <span className="text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{progress}%</span>
                  </div>
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/10 border border-white/20">
                    <div
                      className="h-full bg-gradient-to-r from-white/80 via-white to-white/80 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center font-medium">
                    Our AI is analyzing your technique and form
                  </p>
                </div>
              )}
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={analyzeVideo}
                disabled={isAnalyzing}
                className="flex-1 h-16 bg-gradient-to-r from-white/80 via-white to-white/80 hover:from-white/90 hover:via-white hover:to-white/90 text-black font-bold border-0 shadow-[0_0_30px_rgba(255,255,255,0.5)] text-lg"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <Zap className="w-6 h-6 animate-pulse" />
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Zap className="w-6 h-6" />
                    Analyze Form
                  </span>
                )}
              </Button>
              <Button
                onClick={reset}
                variant="outline"
                disabled={isAnalyzing}
                className="h-16 px-6 border-white/40 hover:bg-white/10 hover:border-white/60 font-semibold"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {analysisResult && (
          <div className="space-y-6">
            {/* Score Card with AI Confidence */}
            <Card className="p-7 bg-gradient-to-br from-white/25 via-white/20 to-white/15 border-white/50 relative overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/30 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
              <div className="relative">
                {/* AI Confidence Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-background/60 backdrop-blur-sm rounded-full border border-white/30">
                    <Shield className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold text-white">
                      AI confidence: <span className={`${
                        analysisResult.confidence === 'High' ? 'text-green-400' :
                        analysisResult.confidence === 'Medium' ? 'text-yellow-400' :
                        'text-orange-400'
                      }`}>{analysisResult.confidence}</span>
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-7">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-6 h-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                      <p className="text-sm text-white/90 font-bold">Form Score</p>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-7xl font-extrabold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
                        {analysisResult.score}
                      </span>
                      <span className="text-4xl text-muted-foreground font-bold">/100</span>
                    </div>
                  </div>
                  <div className="w-28 h-28 rounded-full border-[6px] border-white/40 flex items-center justify-center bg-background/60 backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    <CheckCircle className="w-14 h-14 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
                  </div>
                </div>
                <div className="p-4 bg-background/60 rounded-xl backdrop-blur-sm border border-white/20">
                  <p className="text-sm font-medium">{analysisResult.feedback[0]}</p>
                </div>
              </div>
            </Card>

            {/* Strengths */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-green-400 font-bold">Strengths</h3>
              </div>
              <Card className="p-5 bg-gradient-to-br from-green-500/15 to-emerald-500/10 border-green-400/30 shadow-lg">
                <ul className="space-y-3">
                  {analysisResult.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 shadow-md shadow-green-400/50" />
                      <span className="text-sm font-medium">{strength}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Areas for Improvement */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                <h3 className="text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">Areas for Improvement</h3>
              </div>
              <Card className="p-5 bg-gradient-to-br from-white/15 to-white/10 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <ul className="space-y-3">
                  {analysisResult.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-white mt-1.5 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      <span className="text-sm font-medium">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Additional Feedback */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-6 h-6 text-blue-400" />
                <h3 className="text-blue-400 font-bold">Detailed Feedback</h3>
              </div>
              <Card className="p-5 bg-gradient-to-br from-blue-500/15 to-cyan-500/10 border-blue-400/30 shadow-lg">
                <ul className="space-y-3">
                  {analysisResult.feedback.slice(1).map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shadow-md shadow-blue-400/50" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Button 
              onClick={reset} 
              className="w-full h-16 bg-gradient-to-r from-white/80 via-white to-white/80 hover:from-white/90 hover:via-white hover:to-white/90 text-black font-bold border-0 shadow-[0_0_30px_rgba(255,255,255,0.5)] text-lg"
            >
              <Camera className="w-6 h-6 mr-2" />
              Analyze Another Video
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
