import Link from "next/link";
import Image from "next/image";
const ProductCard = ({product}) => {
    const { handle, title} = product.node
    const { altText, url} = product.node.images.edges[0].node
    return (
        <div>
            <Link href={`/product/${handle}`}>
                <div className="group">
                    <div className="w-full overflow-hidden bg-gray-200 rounded-3xl">
                        <div className = "relative group-hover:opacity-75 h-72">
                            <Image src={url} alt={altText} layout="fill" objectFit="cover"/>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default ProductCard

/*


 */