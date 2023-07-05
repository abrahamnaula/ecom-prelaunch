import {createContext, useState, useEffect} from 'react'
import { createCheckout } from "../../lib/shopify";
const CartContext = createContext()
export default function ShopProvider({ children }) {
    const [cart, setCart] = useState([])
    const [cartOpen, setCartOpen] = useState(false)
    const [checkoutId, setChekcoutId] = useState('')
    const [checkoutUrl, setCheckoutUrl] = useState('')

    async function addToCart(newItem) {
        if(cart.length === 0){
            setCart([newItem])
            const checkout = await createCheckout(newItem.id, newItem.variantQuantity)
        }
    }

    return (
        <div>

        </div>
    )
}
