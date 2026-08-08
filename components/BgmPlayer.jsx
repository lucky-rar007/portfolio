"use client";

import React, { useEffect, useRef, useState } from "react";

const BgmPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio instance on client
    const audio = new Audio("/bgm.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audio.autoplay = true;
    audio.preload = "auto";
    audioRef.current = audio;

    // Function to attempt playback
    const startPlayback = () => {
      if (!audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          removeInteractionListeners();
        })
        .catch(() => {
          setIsPlaying(false);
        });
    };

    // Fallback handler for browser autoplay policies (triggers on any mouse move, scroll, click, or tap)
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        startPlayback();
      }
    };

    const addInteractionListeners = () => {
      window.addEventListener("pointermove", handleFirstInteraction, { passive: true });
      window.addEventListener("mousemove", handleFirstInteraction, { passive: true });
      window.addEventListener("wheel", handleFirstInteraction, { passive: true });
      window.addEventListener("scroll", handleFirstInteraction, { passive: true });
      window.addEventListener("click", handleFirstInteraction, { passive: true });
      window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
      window.addEventListener("keydown", handleFirstInteraction, { passive: true });
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("pointermove", handleFirstInteraction);
      window.removeEventListener("mousemove", handleFirstInteraction);
      window.removeEventListener("wheel", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    // Attempt autoplay immediately on mount
    startPlayback();

    // Attach interaction triggers so music plays automatically as soon as cursor moves or page is touched
    addInteractionListeners();

    return () => {
      removeInteractionListeners();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleBgm = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("BGM playback error:", err);
        });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100001] flex items-center gap-2 group">
      {/* Micro-tooltip on hover */}
      <span className="bgm-tooltip hidden sm:inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-mono tracking-wider px-3.5 py-1.5 rounded-full border backdrop-blur-md shadow-md pointer-events-none select-none font-semibold">
        {isPlaying ? "Pause Music" : "Play Music"}
      </span>

      {/* Floating circular button */}
      <button
        type="button"
        onClick={toggleBgm}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        className="bgm-button w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-md shadow-lg shadow-black/10 dark:shadow-black/50 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brblue"
      >
        {isPlaying ? (
          /* Animated equalizer audio bars when playing */
          <div className="flex items-end justify-center gap-[3px] w-5 h-4">
            <span className="w-[3px] bg-brblue rounded-full animate-[bounce_0.8s_infinite_100ms] h-full" />
            <span className="w-[3px] bg-brblue rounded-full animate-[bounce_0.8s_infinite_300ms] h-[60%]" />
            <span className="w-[3px] bg-brblue rounded-full animate-[bounce_0.8s_infinite_200ms] h-[85%]" />
            <span className="w-[3px] bg-brblue rounded-full animate-[bounce_0.8s_infinite_400ms] h-[40%]" />
          </div>
        ) : (
          /* Muted music icon with slash when paused */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-fg/60 hover:text-fg transition-colors"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
            <line x1="2" y1="2" x2="22" y2="22" className="stroke-red-500" strokeWidth="2" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default BgmPlayer;
