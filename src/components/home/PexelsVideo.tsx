"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PexelsVideoProps {
    query?: string;
    videoId?: string;
    fallbackUrl: string;
    posterUrl?: string; // High-quality static fallback
    opacity?: number;
}

export default function PexelsVideo({ query, videoId, fallbackUrl, posterUrl, opacity = 0.5 }: PexelsVideoProps) {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

    useEffect(() => {
        console.log("PexelsVideo: Init with", { videoId, query, hasKey: !!apiKey });

        async function fetchVideo() {
            const isPlaceholder = !apiKey || apiKey === "" || apiKey === "YOUR_PEXELS_API_KEY_HERE";

            if (isPlaceholder) {
                console.warn("PexelsVideo: No valid API key found. Using fallback.");
                setVideoUrl(fallbackUrl);
                return;
            }

            try {
                let url = "";
                if (videoId) {
                    url = `https://api.pexels.com/videos/videos/${videoId}`;
                } else if (query) {
                    url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
                }

                if (!url) {
                    setVideoUrl(fallbackUrl);
                    return;
                }

                console.log("PexelsVideo: Fetching from", url);
                const res = await fetch(url, {
                    headers: { Authorization: apiKey }
                });

                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }

                const data = await res.json();
                console.log("PexelsVideo: API Response received");

                let videoFile = null;
                if (videoId) {
                    // Single video response
                    videoFile = data.video_files.find((f: any) => f.quality === 'hd') || data.video_files[0];
                } else {
                    // Search response
                    if (data.videos && data.videos.length > 0) {
                        videoFile = data.videos[0].video_files.find((f: any) => f.quality === 'hd') || data.videos[0].video_files[0];
                    }
                }

                if (videoFile) {
                    console.log("PexelsVideo: Setting video URL to", videoFile.link);
                    setVideoUrl(videoFile.link);
                } else {
                    console.warn("PexelsVideo: No video file found in API response. Falling back.");
                    setVideoUrl(fallbackUrl);
                }
            } catch (err: any) {
                console.error("PexelsVideo: Fetch Error", err.message);
                setFetchError(err.message);
                setVideoUrl(fallbackUrl);
            }
        }

        fetchVideo();
    }, [query, videoId, fallbackUrl, apiKey]);

    useEffect(() => {
        if (videoUrl && videoRef.current) {
            console.log("PexelsVideo: Attempting autoplay for", videoUrl);
            videoRef.current.play().catch(err => {
                console.warn("PexelsVideo: Autoplay prevented", err);
            });
        }
    }, [videoUrl]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
            {/* Immediate Static Poster - Always visible until video starts */}
            {posterUrl && (
                <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                    style={{
                        backgroundImage: `url(${posterUrl})`,
                        opacity: isLoading ? 1 : 0
                    }}
                />
            )}

            <AnimatePresence>
                {videoUrl && (
                    <motion.video
                        key={videoUrl}
                        ref={videoRef}
                        src={videoUrl}
                        poster={posterUrl}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isLoading ? 0 : opacity }}
                        transition={{ duration: 1 }}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        onCanPlay={() => {
                            console.log("PexelsVideo: onCanPlay triggered");
                            setIsLoading(false);
                        }}
                        onLoadStart={() => console.log("PexelsVideo: onLoadStart")}
                        onError={(e) => {
                            console.error("PexelsVideo: Video element error", e);
                            if (videoUrl !== fallbackUrl) {
                                console.log("PexelsVideo: Retrying with fallback");
                                setVideoUrl(fallbackUrl);
                            } else {
                                setIsLoading(false);
                            }
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Content Overlay */}
            <div className={`absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`} />

            {/* Minimal Loading Pulse - Only if no poster or explicitly loading */}
            {isLoading && !posterUrl && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-16 h-0.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-accent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
