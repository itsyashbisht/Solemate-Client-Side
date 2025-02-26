import CartItem from "./CartItem";

function CartGrid() {
  return (
    <div>
      {CART.map((ITEM) => (
        <CartItem item={ITEM} key={ITEM.NAME} />
      ))}
    </div>
  );
}

export default CartGrid;
