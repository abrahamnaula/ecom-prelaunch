import { useState, useEffect, useRef } from "react";
export default function CollectionMenuCard({ title, image, animationClass, isSelected, setSelectedCard }) {
    const [hover, setHover] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const cardRef = useRef();
    const [cardHeight, setCardHeight] = useState("100vh");


    useEffect(() => {
        const handleResize = () => {
            const isSmall = window.innerWidth <= 640;
            setIsSmallScreen(isSmall);

            if (isSmall) {
                setCardHeight(`${window.innerHeight / 5}px`);
            } else {
                setCardHeight('100vh');
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (hover && isSmallScreen && cardRef.current) {
            cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [hover, isSmallScreen]);

    // New effect for handling scroll on card selection
    useEffect(() => {
        if (isSelected && cardRef.current) {
            cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [isSelected]);


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
    const handleCardClick = () => {
        if (["COLLECTIONS", "CATEGORIES", "BY ERA"].includes(title)) {
            setSelectedCard(isSelected ? null : title); // If this card was selected, deselect it. Otherwise, select this card.
        }
    };
    return (
        <div
            ref={cardRef}
            className={`w-full sm:w-1/5 relative overflow-hidden mb-1 mr-1 ${animationClass}`}
            style={{height: isSelected ? '100vh' : cardHeight}} // Change height based on isSelected state
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleCardClick} // Add click handler
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
                {(title === "COLLECTIONS" || title === "CATEGORIES" || title === "BY ERA") && hover && isSelected ? (
                    <div className="opacity-0 transform transition-all duration-300"
                         style={{ opacity: hover ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}>
                        <ul className="text-white text-center">
                            {(title === "COLLECTIONS" ? collections : title === "CATEGORIES" ? categories : byEra).map(
                                (item, index) => (
                                    <li key={index} className="font-nhg font-medium tracking-wide text-xxs sm:text-xl
                                                mb-8 sm:mb-10">{item}</li>
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