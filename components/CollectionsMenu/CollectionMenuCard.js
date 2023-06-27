// CollectionMenuCard.js

export default function CollectionMenuCard({ title, image }) {
    return (
        <div className="w-1/5 sm:w-1/5 md:w-1/5 lg:w-1/5 xl:w-1/5 h-64 relative overflow-hidden rounded-xl">
            <img className="object-cover w-full h-full" src={image} alt={title} />
            <div className="absolute inset-0 bg-black opacity-25"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-center font-bold">{title}</span>
            </div>
        </div>
    );
}
