import { useRouter } from 'next/router';
import { ParamShopifyData } from '../../lib/shopify';
import NewFooter from "../../components/NewFooter";
import WorkHeader from "../../components/WorkHeader";
import ProductList2 from "../../components/Products/ProductList2";
import {useFilter} from "../../components/FilterContext";
import {useEffect, useState} from "react";
import ProductCard from "../../components/Products/ProductCard";
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

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-bebe">
            <div className="fixed w-full top-0 z-50">
                <WorkHeader/>
            </div>
            <div className="h-8.5"></div>
            <main className="flex-grow">
                <ProductList3 products={initialProducts} />
            </main>
            <NewFooter />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    const query = `
query ($title: String!) {
  collections(first: 10, query: $title) {
    edges {
      node {
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
  }
}

  `;
    const { data } = await ParamShopifyData(query, { title: id });
    if (!data || !data.collections || !data.collections.edges || data.collections.edges.length === 0) {
        return {
            notFound: true,
        };
    }
    const initialProducts = data.collections.edges[0].node.products.edges.map(edge => {
        return {
            ...edge.node,
            imageUrl: edge.node.images.edges[0]?.node?.url,
        };
    });
    return {
        props: { initialProducts },
    };
}
