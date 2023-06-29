import React, { useEffect, useState } from "react";

const BackgroundVideo = () => {
    const [videoKey, setVideoKey] = useState(Date.now());
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isMobile =
                (window.innerWidth <= 430 && window.innerHeight <= 932) || // include new dimensions
                (window.innerWidth === 428 && window.innerHeight === 926); // include new dimensions
            if (isMobileDevice !== isMobile) {
                setIsMobileDevice(isMobile);
                setVideoKey(Date.now()); // Force video reload when source changes
            }
        };

        handleResize(); // Initial check

        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
        };
    }, [isMobileDevice]);

    const videoSource = isMobileDevice ? "/ge-bkg-vert.mp4" : "/ge-bkg-hor.mp4";

    return (
        <video
            key={videoKey} // Key changes when the video source changes
            className="fixed top-0 left-0 w-full h-full object-cover -z-10"
            autoPlay
            loop
            muted
            playsInline
        >
            <source src={videoSource} type="video/mp4" />
        </video>
    );
};

export default BackgroundVideo;
