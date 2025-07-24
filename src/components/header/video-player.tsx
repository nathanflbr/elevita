"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface YouTubePlayer {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  getCurrentTime(): number;
  getDuration(): number;
  seekTo(seconds: number): void;
  destroy(): void;
}

interface YouTubeEvent {
  target: YouTubePlayer;
  data: number;
}

interface YouTubePlayerState {
  PLAYING: number;
  PAUSED: number;
  ENDED: number;
}

interface YouTubePlayerConfig {
  height: string;
  width: string;
  videoId: string;
  playerVars: {
    controls: number;
    showinfo: number;
    rel: number;
    modestbranding: number;
    iv_load_policy: number;
    autoplay: number;
  };
  events: {
    onReady: (event: YouTubeEvent) => void;
    onStateChange: (event: YouTubeEvent) => void;
  };
}

interface YouTubeAPI {
  Player: new (elementId: string, config: YouTubePlayerConfig) => YouTubePlayer;
  PlayerState: YouTubePlayerState;
}

declare global {
  interface Window {
    YT?: YouTubeAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface VideoPlayerProps {
  videoId: string;
  title?: string;
  description?: string;
  className?: string;
  autoplay?: boolean;
  showControls?: boolean;
  showInfo?: boolean;
}

export default function VideoPlayer({
  videoId,
  title = "Vídeo",
  description = "Assista ao vídeo completo",
  className = "",
  autoplay = false,
  showControls = true,
  showInfo = true,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const playerContainerId = `youtube-player-${videoId}`;

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initializePlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player(playerContainerId, {
          height: "100%",
          width: "100%",
          videoId: videoId,
          playerVars: {
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 1,
            iv_load_policy: 3,
            autoplay: autoplay ? 1 : 0,
          },
          events: {
            onReady: (event: YouTubeEvent) => {
              setDuration(event.target.getDuration());
              setIsReady(true);
              if (autoplay) {
                event.target.playVideo();
              }
            },
            onStateChange: (event: YouTubeEvent) => {
              const YT = window.YT;
              if (YT && event.data === YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                startProgressTracking();
              } else if (YT && event.data === YT.PlayerState.PAUSED) {
                setIsPlaying(false);
                stopProgressTracking();
              } else if (YT && event.data === YT.PlayerState.ENDED) {
                setIsPlaying(false);
                stopProgressTracking();
                setProgress(100);
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      window.onYouTubeIframeAPIReady = initializePlayer;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, autoplay, playerContainerId]);

  const startProgressTracking = () => {
    intervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        if (duration > 0) {
          setProgress((currentTime / duration) * 100);
        }
      }
    }, 1000);
  };

  const stopProgressTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const togglePlay = () => {
    if (playerRef.current && isReady) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  const toggleMute = () => {
    if (playerRef.current && isReady) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (playerRef.current && duration > 0 && isReady) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const seekTime = percentage * duration;
      playerRef.current.seekTo(seekTime);
      setProgress(percentage * 100);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative bg-elevita rounded-2xl overflow-hidden shadow-2xl">
        <div className="aspect-video relative">
          <div
            id={playerContainerId}
            className="absolute inset-0 w-full h-full"
          ></div>

          {!isReady && (
            <div className="absolute inset-0 bg-elevita flex items-center justify-center">
              <div className="text-white text-lg">Carregando vídeo...</div>
            </div>
          )}

          {showControls && isReady && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-100 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-red-400 transition-colors pointer-events-auto"
                  aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>

                <div
                  className="flex-1 bg-gray-600 rounded-full h-2 cursor-pointer pointer-events-auto"
                  onClick={handleProgressClick}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {duration > 0 && (
                  <div className="text-white text-sm font-mono">
                    {formatTime((progress / 100) * duration)} /{" "}
                    {formatTime(duration)}
                  </div>
                )}

                <button
                  onClick={toggleMute}
                  className="text-white hover:text-red-400 transition-colors pointer-events-auto"
                  aria-label={isMuted ? "Ativar som" : "Desativar som"}
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showInfo && (
        <div className="sr-only">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}
