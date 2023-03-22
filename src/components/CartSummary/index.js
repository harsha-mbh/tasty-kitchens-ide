import './index.css'

const CartSummary = props => {
  const {cartList} = props
  const valueArray = cartList.map(eachItem => eachItem.quantity * eachItem.cost)
  const totalPrice = valueArray.reduce((a, b) => a + b, 0)
  return (
    <div className="cart-summary-container">
      <h1 className="summary-heading">Order Total :</h1>
      <div className="order-value-btn-container">
        <p className="order-value">Rs. {totalPrice}</p>
        <button className="place-order-btn" type="button">
          Place Order
        </button>
      </div>
    </div>
  )
}

export default CartSummary
