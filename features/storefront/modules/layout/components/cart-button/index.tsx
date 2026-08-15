import { CartDrawer } from "../cart-drawer";
import { retrieveCart } from "@/features/storefront/lib/data/cart";

const fetchCart = async () => {
  const cart = await retrieveCart();

  if (!cart) {
    return null;
  }

  return cart;
};

export default async function CartButton() {
  const cart = await fetchCart();

  return <CartDrawer cart={cart} />;
}
