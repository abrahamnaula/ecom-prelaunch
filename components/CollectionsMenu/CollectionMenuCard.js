// CollectionMenuCard.js

export default function CollectionMenuCard({ title, image, animationClass }) {
    return (
        <div className={`w-full h-screen relative overflow-hidden mb-5 ml-1 mr-1 ${animationClass}`}>
            <img className="object-cover w-full h-full" src={image} alt={title} />
            <div className="absolute inset-0 bg-black opacity-25"></div>
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(51, 51, 51, 0.72)' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-center font-nhg font-medium text-sm sm:text-white sm:text-xl
                                    sm:text-center sm:font-nhg sm:font-medium">{title}</span>
            </div>
        </div>
    );
}
