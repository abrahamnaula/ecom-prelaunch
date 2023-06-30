import { useState, useEffect, useRef } from "react";

export default function CollectionMenuCard({ title, image, animationClass }) {
    const [hover, setHover] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false); // Initialize to false
    const cardRef = useRef(); // This will hold the reference to your card div

    useEffect(() => {
        if (title === "COLLECTIONS" || title === "CATEGORIES" || title === "BY ERA") {
            setIsSmallScreen(window.innerWidth <= 640);

            const handleResize = () => {
                setIsSmallScreen(window.innerWidth <= 640);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [title]);

    useEffect(() => {
        if (hover && isSmallScreen && cardRef.current) {
            cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [hover, isSmallScreen]);

    const categories = [
        "SHIRTS",
        "TEES",
        "BOTTOMS",
        "OUTERWEAR",
        "SWEATSHIRTS",
        "HEADWEAR",
        "EVERYTHING ELSE",
    ];

    const collections = [
        "MUSIC, ART, & FILM",
        "DENIM, WORKWEAR, & MILITARY",
        "SPORTSWEAR & STREETWEAR",
        "BLANKS & ESSENTIALS",
        "WOMEN",
    ];

    const byEra = [
        "Y2K",
        "1990s",
        "1980s",
        "1970s",
        "PRE 1970s",
    ]

    return (
        <div
            ref={cardRef} // add the ref here
            className={`w-full sm:w-1/5 h-52 ${hover && isSmallScreen ? 'h-screen' : 'sm:h-screen'} relative overflow-hidden mb-1 mr-1 ${animationClass}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img className="object-cover w-full h-full" src={image} alt={title} />
            <div className="absolute inset-0 bg-black opacity-25"></div>
            <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(51, 51, 51, 0.72)" }}
            ></div>
            <div
                className="absolute inset-0 flex items-center justify-center"
            >
                {(title === "COLLECTIONS" || title === "CATEGORIES" || title === "BY ERA") && hover ? (
                    <div className="opacity-0 transform transition-all duration-300"
                         style={{ opacity: hover ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}>
                        <ul className="text-white text-center">
                            {(title === "COLLECTIONS" ? collections : title === "CATEGORIES" ? categories : byEra).map(
                                (item, index) => (
                                    <li key={index} className="font-nhg font-medium tracking-wide text-xs sm:text-xl
                                                                mb-10">{item}</li>
                                )
                            )}
                        </ul>
                    </div>
                ) : (
                    <span className={`font-nhg font-medium text-xs sm:text-white sm:text-xl
                                    sm:text-center sm:font-nhg sm:font-medium text-white relative z-10`}>
                        {title}
                    </span>
                )}
            </div>
        </div>
    );
}
