const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query){
    const URL = `https://${domain}/api/2023-04/graphql.json`

    const options = {
        method: "POST",
        headers: {
            "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({query})
    }

    try{
        const data = await fetch(URL, options).then(response => {
            return response.json()
        })
        return data
    }catch (error){
        throw new Error('Products not fetched: on async ShopifyData()')
    }
}

export async function getProductsInCollection(){
    const query = `
         {
          products(first: 250, query:"tag:'y2k'") {
            edges {
              node {
                id
                handle
                title
                tags
                images(first: 5){
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }`
    const response = await ShopifyData(query)

    const allProducts = response.data.products.edges ? response.data.products.edges : []
    return allProducts
        /*response.data.collectionByHandle.products.edges ?
                                    response.data.collectionByHandle.products.edges : []*/
}