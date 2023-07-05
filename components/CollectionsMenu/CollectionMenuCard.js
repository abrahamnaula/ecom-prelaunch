import { useState, useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/router';

export default function CollectionMenuCard({ title, image, animationClass, isSelected, setSelectedCard }) {
    const [hover, setHover] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const cardRef = useRef();
    const [cardHeight, setCardHeight] = useState("100vh");
    const router = useRouter();

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

    useEffect(() => {
        if (isSelected && cardRef.current) {
            cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
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
    ];

    const handleCardClick = (event) => {
        if (["COLLECTIONS", "CATEGORIES", "BY ERA"].includes(title)) {
            setSelectedCard(isSelected ? null : title);
        } else {
            router.push(`/collections/${title.toLowerCase().replace(/\s+/g, '-')}`);
        }
    };


    const handleCloseClick = (event) => {
        event.stopPropagation();
        setSelectedCard(null);
    };

    const shouldDisplayList = ["COLLECTIONS", "CATEGORIES", "BY ERA"].includes(title) && isSelected;
    const shouldDisplayBackButton = isSelected && isSmallScreen;

    return (
        <div
            ref={cardRef}
            className={`w-full sm:w-1/5 relative overflow-hidden mb-1 mr-1 ${animationClass}`}
            style={{height: isSelected ? '100vh' : cardHeight}}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleCardClick}
        >

        {shouldDisplayBackButton && (
                <button
                    className="absolute top-0 left-0 m-10 font-nhg font-medium tracking-wide text-white text-xxs z-50 flex items-center"
                    onClick={handleCloseClick}
                >
                    <FaArrowLeft className="mr-2" />BACK
                </button>
            )}

            <img className="object-cover w-full h-full" src={image} alt={title} />
            <div className="absolute inset-0 bg-black opacity-25"></div>
            <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(51, 51, 51, 0.72)" }}
            ></div>
            <div
                className="absolute inset-0 flex items-center justify-center"
            >
                {shouldDisplayList ? (
                    <div className="opacity-0 transform transition-all duration-300"
                         style={{ opacity: hover || isSelected ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}>
                        <ul className="text-white text-center">
                            {(title === "COLLECTIONS" ? collections : title === "CATEGORIES" ? categories : byEra).map(
                                (item, index) => (
                                    <li key={index} className="font-nhg font-medium tracking-wide text-xxs sm:text-xl
                        mb-8 sm:mb-10 cursor-pointer"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            router.push(`/collections/${item.toLowerCase().replace(/\s+/g, '-')}`);
                                        }}
                                    >
                                        {item}
                                    </li>
                                )
                            )}
                        </ul>

                    </div>
                ) : (
                    <span
                        className={`font-nhg font-medium text-xs sm:text-white sm:text-xl
                                    sm:text-center sm:font-nhg sm:font-medium text-white relative z-10`}

                    >
                        {title}
                    </span>
                )}
            </div>
        </div>
    );
}