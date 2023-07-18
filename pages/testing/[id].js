import { useRouter } from 'next/router';
import { ParamShopifyData } from '../../lib/shopify';
import NewFooter from "../../components/NewFooter";
import WorkHeader from "../../components/WorkHeader";
import ProductList2 from "../../components/Products/ProductList2";
import {useFilter} from "../../components/FilterContext";
import {useEffect, useState} from "react";
import ProductCard from "../../components/Products/ProductCard";
import NoProducts from "../../components/NoProducts";
function ProductList3({ products }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
            {products.map((product, index) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
}
export default function Collection({ initialProducts }) {
    const router = useRouter();
    const { formattedFilters } = useFilter();
    console.log('Fomratted filers: ',formattedFilters);
    //const filteredProducts = initialProducts.filter(product => product.tags.includes('1980s'));
    //const filteredProducts = initialProducts.filter(product => product.variants.edges[0]?.node?.title === 'Large');
// Your array of filters
    const filters = [  ]; //play around with it...

// Your known sizes
    const knownSizes = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', 'XXX-Large'];

// Split the filters into sizes and tags
    const sizes = formattedFilters.filter(filter => knownSizes.includes(filter));
    const tags = formattedFilters.filter(filter => !knownSizes.includes(filter));

// Filter products
    const filteredProducts = initialProducts.filter(product => {
        // Check sizes
        const sizeMatch = sizes.length === 0 || sizes.includes(product.variants.edges[0]?.node?.title);

        // Check tags
        const tagMatch = tags.length === 0 || tags.every(tag => product.tags.includes(tag));

        return sizeMatch && tagMatch;
    });

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (!filteredProducts || filteredProducts.length === 0) {
        return(
            <div className="flex flex-col min-h-screen bg-bebe">
                <div className="fixed w-full top-0 z-50">
                    <WorkHeader/>
                </div>
                <div className="h-16"></div>
                <main className="flex-grow flex justify-center items-center">
                    <NoProducts/>
                </main>


                <NewFooter />
            </div>
        )
    }
    return (
        <div className="flex flex-col min-h-screen bg-bebe">
            <div className="fixed w-full top-0 z-50">
                <WorkHeader/>
            </div>
            <div className="h-8.5"></div>
            <main className="flex-grow">
                <ProductList3 products={filteredProducts} />
            </main>
            <NewFooter />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    const query = `
       query ($title: String!) {
  collection(handle: $title) {
    id
    title
    handle
    products(first: 250) {
      edges {
        node {
          id
          title
          handle
          tags
          images(first: 1) {
            edges {
              node {
                altText
                url
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          variants(first: 1) {
            edges {
              node {
                title
              }
            }
          }
        }
      }
    }
  }
}
  `;

    const { data } = await ParamShopifyData(query, { title: id });
    console.log(context.params)
    if (!data || !data.collection) {
        return {
            notFound: true,
        };
    }

    const initialProducts = data.collection.products.edges.map(edge => {
        return {
            ...edge.node,
            imageUrl: edge.node.images.edges[0]?.node?.url,
        };
    });

    return {
        props: { initialProducts, collectionName: data.collection.title },
    };
}
