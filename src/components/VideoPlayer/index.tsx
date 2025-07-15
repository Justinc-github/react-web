import React, { useState, useCallback, useEffect, useRef } from "react";
import TopNavbar from "../TopNavBar";
import Footer from "../../pages/Home/components/Footer";
import styles from "./VideoPlayer.module.css"; // 引入模块化CSS

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

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [, setIsFullscreen] = useState(false);

  // 播放/暂停切换
  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => setIsPlaying(false));
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
      const pos = (e.clientX - rect.left) / rect.width;
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
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
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

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // 自动播放处理
    if (autoPlay) {
      video.play().catch(() => {
        console.warn("自动播放被浏览器阻止");
        setIsPlaying(false);
      });
    }

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
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

  return (
    <div
      ref={playerContainerRef}
      className={`${styles.videoContainer} ${className}`}
    >
      {/* 视频元素 */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-100"
        controls={controls}
        onClick={() => {}}
      />

      {/* 自定义控制条 */}
      {!controls && (
        <div
          className={`${styles.controlsContainer} ${
            showControls ? styles.controlsVisible : styles.controlsHidden
          }`}
        >
          {/* 进度条 */}
          <div
            ref={progressRef}
            className={styles.progressBar}
            onClick={handleSeek}
          >
            <div
              className={styles.progress}
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          {/* 控制按钮区域 */}
          <div className="d-flex align-items-center p-3 gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlayback();
              }}
              className="btn btn-link text-white p-0"
            >
              {isPlaying ? (
                <PauseIcon className={styles.iconSize} />
              ) : (
                <PlayIcon className={styles.iconSize} />
              )}
            </button>

            <div className="d-flex align-items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="btn btn-link text-white p-0"
              >
                {isMuted || volume === 0 ? (
                  <MuteIcon className={styles.iconSizeSm} />
                ) : volume < 0.5 ? (
                  <VolumeUpIcon className={styles.iconSizeSm} />
                ) : (
                  <VolumeDownIcon className={styles.iconSizeSm} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className={styles.volumeSlider}
              />
            </div>

            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            <div className="flex-grow-1" />

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              className="btn btn-link text-white p-0"
            >
              <FullscreenIcon className={styles.iconSizeSm} />
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

  // 视频数据
  const videos: VideoItem[] = React.useMemo(
    () => [
      {
        id: 1,
        title: "学长送别视频",
        src: "http://47.95.171.19:5244/d/123pan/%E8%A7%86%E9%A2%91/21%E7%BA%A7%E5%AD%A6%E9%95%BF%E9%80%81%E5%88%AB%E8%A7%86%E9%A2%91.mp4?sign=XZOq-S7sANshLL3x6zVREeXG8f2qc5B33C-fkNwLDwk=:0",
        poster:
          "https://cdn.jsdelivr.net/gh/Justinc-github/project_resources@main/网页/图片/视频/送21届学长.jpg",
        duration: "6:03",
        gradient: styles.gradientBlue, // 使用模块化类名
      },
    ],
    []
  );

  const currentVideoData =
    videos.find((video) => video.id === currentVideo) || videos[0];

  return (
    <div className={styles.pageContainer}>
      {/* 导航栏 */}
      <TopNavbar />
      {/* 主内容区 */}
      <main className="container py-5">
        <div className="text-center mb-5">
          <h2 className="mb-3">
            沉浸式体验
            <span className={styles.gradientText}> 我们的视频播放器</span>
          </h2>
        </div>

        {/* 播放器部分 - 居中显示 */}
        <div className="d-flex justify-content-center">
          <div className="w-100" style={{ maxWidth: "800px" }}>
            <div className={styles.playerWrapper}>
              <div className="mb-3">
                <h3 className="mb-1">正在播放: {currentVideoData.title}</h3>
                <div className="text-secondary d-flex align-items-center">
                  <span>时长: {currentVideoData.duration}</span>
                  <span className="mx-2">•</span>
                  <span>作者：赵芷涵</span>
                </div>
              </div>

              <div className={styles.aspectContainer}>
                <VideoPlayer
                  key={currentVideoData.id}
                  src={currentVideoData.src}
                  poster={currentVideoData.poster}
                  autoPlay={autoPlay}
                />
              </div>

              <div className={styles.description}>
                <h4 className="mb-2">视频描述:</h4>
                <p>
                  本视频承载了学长们在团队中的珍贵时光，记录了那些"美好"的瞬间，
                  同时寄托着我们对他们未来的深切祝福：愿这段旅程的终点成为新辉煌的起点，
                  愿他们在未来的征途上行稳致远、鹏程万里！
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 视频库部分 */}
        <div className="mt-5" style={{ maxWidth: "800px" }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="me-2 text-success"
                style={{ width: "24px", height: "24px" }}
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
            <div className="badge bg-dark">
              共 <span className="text-primary">{videos.length}</span> 个视频
            </div>
          </div>

          <div className="d-grid gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className={`${styles.videoCard} ${
                  currentVideo === video.id ? styles.selected : ""
                }`}
              >
                <div className={`${styles.videoThumbnail} ${video.gradient}`}>
                  <div className={styles.playIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-white"
                      style={{ width: "48px", height: "48px" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className={styles.videoInfo}>
                  <div className="d-flex justify-content-between align-items-start">
                    <h3 className="me-2">{video.title}</h3>
                    <span className="badge bg-secondary">{video.duration}</span>
                  </div>
                  <div className="d-flex justify-content-between text-secondary">
                    <span>作者：赵芷涵</span>
                    <span className="d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="me-1"
                        style={{ width: "20px", height: "20px" }}
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
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  );
};

export default VideoPlayerDemoPage;
