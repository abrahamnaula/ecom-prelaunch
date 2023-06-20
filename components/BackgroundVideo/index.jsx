import React, { useEffect, useState } from "react";

const BackgroundVideo = () => {
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileDevice(window.matchMedia("(max-width: 767px)").matches);
        };

        handleResize(); // Initial check

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const videoSource = isMobileDevice ? "/ge-bkg-ver.mp4" : "/ge-bkg-hor.mp4";

    return (
        <video
            className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
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

