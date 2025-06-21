import React, { useState, useCallback, useEffect, useRef } from "react";
import TopNavbar from "../TopNavBar";
import Footer from "../../pages/Home/components/Footer";

// 视频播放器组件
interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  controls?: boolean;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  autoPlay = false,
  controls = false,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const bufferRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [, setIsFullscreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [bufferedRanges, setBufferedRanges] = useState<
    { start: number; end: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  // 播放/暂停切换
  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch((err) => {
        console.error("播放失败:", err);
        setIsPlaying(false);
        setError("播放失败: " + err.message);
      });
    } else {
      video.pause();
    }
  }, []);

  // 进度条跳转
  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const video = videoRef.current;
      const progressBar = progressRef.current;
      if (!video || !progressBar) return;

      const rect = progressBar.getBoundingClientRect();
      const pos = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width)
      );
      video.currentTime = pos * duration;
    },
    [duration]
  );

  // 音量控制
  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const vol = parseFloat(e.target.value);
      const video = videoRef.current;
      if (!video) return;

      setVolume(vol);
      video.volume = vol;
      setIsMuted(vol === 0);
    },
    []
  );

  // 静音切换
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMuted;
    setIsMuted(newMuted);
    video.muted = newMuted;
    setVolume(newMuted ? 0 : volume);
  }, [isMuted, volume]);

  // 全屏切换
  const toggleFullscreen = useCallback(() => {
    const container = playerContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error(`全屏请求失败: ${err.message}`);
        setError(`全屏请求失败: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // 改变播放速度
  const changePlaybackRate = useCallback((rate: number) => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = rate;
      setPlaybackRate(rate);
    }
  }, []);

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // 初始化视频事件监听
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);
    const handleProgress = () => {
      const buffered = [];
      for (let i = 0; i < video.buffered.length; i++) {
        buffered.push({
          start: video.buffered.start(i),
          end: video.buffered.end(i),
        });
      }
      setBufferedRanges(buffered);
    };
    const handleError = () => {
      setError(`视频加载失败 (${video.error?.code || "未知错误"})`);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("progress", handleProgress);
    video.addEventListener("error", handleError);

    // // 自动播放处理
    // if (autoPlay) {
    //   video.play().catch((err) => {
    //     console.warn("自动播放被浏览器阻止:", err);
    //     setIsPlaying(false);
    //     // setError("自动播放被阻止: " + err.message);
    //   });
    // }

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("error", handleError);
    };
  }, [src, autoPlay]);

  // 控制条显示/隐藏逻辑
  useEffect(() => {
    const container = playerContainerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let timer: NodeJS.Timeout;

    // 鼠标移动显示控制条
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (isPlaying) {
          // 仅在播放时自动隐藏
          setShowControls(false);
        }
      }, 3000);
    };

    // 鼠标离开隐藏控制条
    const handleMouseLeave = () => {
      if (isPlaying) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          setShowControls(false);
        }, 1000);
      }
    };

    // 点击视频显示控制条
    const handleVideoClick = () => {
      setShowControls(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    video.addEventListener("click", handleVideoClick);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      video.removeEventListener("click", handleVideoClick);
      clearTimeout(timer);
    };
  }, [isPlaying]);

  // 格式化时间显示
  const formatTime = useCallback((seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  }, []);

  // 渲染缓冲进度条
  const renderBufferedRanges = useCallback(() => {
    if (!bufferedRanges.length || !duration) return null;

    return bufferedRanges.map((range, index) => (
      <div
        key={index}
        className="absolute h-full bg-gray-600 bg-opacity-50"
        style={{
          left: `${(range.start / duration) * 100}%`,
          width: `${((range.end - range.start) / duration) * 100}%`,
        }}
      />
    ));
  }, [bufferedRanges, duration]);

  // 图标组件
  const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z"
        clipRule="evenodd"
      />
    </svg>
  );

  const PauseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
        clipRule="evenodd"
      />
    </svg>
  );

  const VolumeUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.56.276 2.56-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
    </svg>
  );

  const VolumeDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.56.276 2.56-1.06V4.06zM15.536 8.464a.75.75 0 10-1.061 1.06 13.68 13.68 0 010 3.012.75.75 0 001.06 1.06 15.18 15.18 0 000-5.132z" />
    </svg>
  );

  const MuteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.56.276 2.56-1.06V4.06zM18.584 5.106a.75.75 0 00-1.06 1.06 15.18 15.18 0 010 5.132.75.75 0 001.06 1.06 16.68 16.68 0 000-7.252z" />
      <path d="M15.932 7.757a.75.75 0 011.06-1.061 13.68 13.68 0 010 5.132.75.75 0 01-1.06-1.06 12.18 12.18 0 000-4.011z" />
    </svg>
  );

  const FullscreenIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M15 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V5.56l-3.97 3.97a.75.75 0 11-1.06-1.06l3.97-3.97h-2.69a.75.75 0 01-.75-.75zm-12 0A.75.75 0 013.75 3h4.5a.75.75 0 010 1.5H5.56l3.97 3.97a.75.75 0 01-1.06 1.06L4.5 5.56v2.69a.75.75 0 01-1.5 0v-4.5zm11.47 11.78a.75.75 0 111.06-1.06l3.97 3.97v-2.69a.75.75 0 011.5 0v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h2.69l-3.97-3.97zm-4.94-1.06a.75.75 0 010 1.06L5.56 19.5h2.69a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0v2.69l3.97-3.97a.75.75 0 011.06 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  const SpeedIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
        clipRule="evenodd"
      />
    </svg>
  );

  const BufferingIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`animate-spin ${className}`}
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );

  return (
    <div
      ref={playerContainerRef}
      className={`relative w-full max-w-4xl overflow-hidden rounded-lg bg-black ${className}`}
      // 修复点1: 添加容器点击事件处理
      onClick={(e) => {
        // 确保点击的是容器而非控制按钮
        if (
          e.target === playerContainerRef.current ||
          e.target === videoRef.current
        ) {
          togglePlayback();
        }
      }}
    >
      {/* 视频元素 - 添加流式传输优化属性 */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full cursor-pointer" // 修复点2: 添加指针样式
        controls={controls}
        preload="auto"
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        onDoubleClick={toggleFullscreen}
        // 修复点3: 添加视频元素点击事件处理
        onClick={(e) => {
          e.stopPropagation(); // 阻止事件冒泡
          togglePlayback();
        }}
      />

      {/* 缓冲指示器 */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <BufferingIcon className="w-16 h-16 text-white" />
        </div>
      )}

      {/* 错误提示 */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-20">
          <div className="bg-red-600 text-white p-4 rounded-lg max-w-md text-center">
            <div className="font-bold mb-2">播放错误</div>
            <div className="mb-3">{error}</div>
            <button
              onClick={() => {
                setError(null);
                if (videoRef.current) {
                  videoRef.current.load();
                }
              }}
              className="px-4 py-2 bg-white text-red-600 rounded hover:bg-gray-100 transition"
            >
              重试
            </button>
          </div>
        </div>
      )}

      {/* 自定义控制条 */}
      {!controls && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
          // 修复点4: 控制指针事件
          style={{ pointerEvents: showControls ? "auto" : "none" }}
        >
          {/* 进度条 - 显示缓冲区域 */}
          <div
            ref={progressRef}
            className="h-2 w-full bg-gray-700 cursor-pointer relative"
            onClick={handleSeek}
          >
            {/* 缓冲区域 */}
            <div ref={bufferRef} className="absolute inset-0">
              {renderBufferedRanges()}
            </div>

            {/* 播放进度 */}
            <div
              className="h-full bg-red-600 absolute z-10"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          {/* 控制按钮区域 */}
          <div className="flex items-center p-3 space-x-4">
            <button
              onClick={(e) => {
                e.stopPropagation(); // 阻止事件冒泡
                togglePlayback();
              }}
              className="text-white"
            >
              {isPlaying ? (
                <PauseIcon className="w-6 h-6" />
              ) : (
                <PlayIcon className="w-6 h-6" />
              )}
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 阻止事件冒泡
                  toggleMute();
                }}
                className="text-white"
              >
                {isMuted || volume === 0 ? (
                  <MuteIcon className="w-5 h-5" />
                ) : volume < 0.5 ? (
                  <VolumeUpIcon className="w-5 h-5" />
                ) : (
                  <VolumeDownIcon className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 accent-white"
              />
            </div>

            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            <div className="flex-1" />

            {/* 播放速度控制 */}
            <div className="relative group">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="text-white flex items-center"
              >
                <SpeedIcon className="w-5 h-5 mr-1" />
                <span>{playbackRate}x</span>
              </button>
              <div className="absolute bottom-full left-0 mb-2 w-32 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg py-2 hidden group-hover:block">
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    onClick={(e) => {
                      e.stopPropagation();
                      changePlaybackRate(rate);
                    }}
                    className={`block w-full text-left px-4 py-1 text-white hover:bg-gray-700 ${
                      playbackRate === rate ? "bg-blue-600" : ""
                    }`}
                  >
                    {rate}x 速度
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation(); // 阻止事件冒泡
                toggleFullscreen();
              }}
              className="text-white"
            >
              <FullscreenIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 视频类型定义
interface VideoItem {
  id: number;
  title: string;
  src: string;
  poster: string;
  duration: string;
  gradient: string;
}

// 主要演示页面组件
const VideoPlayerDemoPage: React.FC = () => {
  const [currentVideo] = useState(1);
  const [autoPlay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // 视频数据
  const videos: VideoItem[] = React.useMemo(
    () => [
      {
        id: 1,
        title: "学长送别视频",
        src: "https://api.zhongzhi.site/static/videos/bye.mp4",
        poster:
          "https://img.picgo.net/2025/06/20/93e8a40cb88540a8bd0475ef2886493d56c5cdd9528b3bb8.jpg",
        duration: "6:03",
        gradient: "bg-gradient-to-r from-blue-600 via-teal-500 to-green-500",
      },
    ],
    []
  );

  const currentVideoData =
    videos.find((video) => video.id === currentVideo) || videos[0];

  // 预加载视频
  useEffect(() => {
    const preloadVideos = async () => {
      try {
        await Promise.all(
          videos.map(
            (video) =>
              new Promise<void>((resolve) => {
                const videoEl = document.createElement("video");
                videoEl.preload = "metadata";
                videoEl.src = video.src;
                videoEl.onloadedmetadata = () => resolve();
                videoEl.onerror = () => resolve();
              })
          )
        );
        setIsLoading(false);
      } catch (error) {
        console.error("视频预加载失败:", error);
        setIsLoading(false);
      }
    };

    preloadVideos();
  }, [videos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      {/* 导航栏 */}
      <TopNavbar />

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            沉浸式体验
          </h2>
        </div>

        {/* 加载指示器 */}
        {isLoading && (
          <div className="flex justify-center my-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* 播放器部分 - 居中显示 */}
        {!isLoading && (
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl shadow-2xl backdrop-blur">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-1">
                    正在播放: {currentVideoData.title}
                  </h3>
                  <div className="text-sm text-gray-400 flex items-center">
                    <span>时长: {currentVideoData.duration}</span>
                    <span className="mx-2">•</span>
                    <span>作者：赵芷涵</span>
                  </div>
                </div>

                <div className="aspect-video rounded-lg overflow-hidden relative">
                  <VideoPlayer
                    key={currentVideoData.id}
                    src={currentVideoData.src}
                    poster={currentVideoData.poster}
                    autoPlay={autoPlay}
                  />
                </div>

                <div className="mt-4 p-4 bg-gray-900 bg-opacity-60 rounded-lg">
                  <h4 className="font-medium mb-2">视频描述:</h4>
                  <p className="text-gray-300 text-sm">
                    本视频承载了学长们在团队中的珍贵时光，记录了那些"美好"的瞬间，
                    同时寄托着我们对他们未来的深切祝福：愿这段旅程的终点成为新辉煌的起点，
                    愿他们在未来的征途上行稳致远、鹏程万里！
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 视频库部分 */}
        {!isLoading && (
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 mr-2 text-emerald-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                视频库
              </h2>
              <div className="text-sm bg-gray-800 px-3 py-1 rounded-lg">
                共 <span className="text-blue-400">{videos.length}</span> 个视频
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className={`rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 ${
                    currentVideo === video.id ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div
                    className={`h-48 ${video.gradient} flex items-center justify-center relative`}
                  >
                    <div className="bg-black bg-opacity-20 rounded-full p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-12 h-12 text-white"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-800">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-xl mr-2">
                        {video.title}
                      </h3>
                    </div>
                    <div className="mt-2 flex justify-between text-sm text-gray-400">
                      <span>作者：赵芷涵</span>
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-5 w-5 mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        播放
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 页脚 */}
     <Footer/>
    </div>
  );
};

export default VideoPlayerDemoPage;
