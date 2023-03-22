import {Redirect} from 'react-router-dom'
import Header from '../Header'
import CartItem from '../CartItem'
import CartSummary from '../CartSummary'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      const onClickRemoveAllBtn = () => {
        removeAllCartItems()
      }
      const onClickOrderBtn = () => <Redirect to="/" />

      const renderEmptyCartView = () => (
        <div className="empty-view-container">
          <img
            src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1679157741/Tasty%20Kitchens/cooking_1emptycart_wiwucc.png"
            alt="empty view"
            className="empty-view-image"
          />
          <h1 className="empty-heading">No Orders Yet!</h1>
          <p className="empty-description">
            Your cart is empty. Add something from the menu.
          </p>
          <button type="button" className="order-btn" onClick={onClickOrderBtn}>
            Order Now
          </button>
        </div>
      )

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              renderEmptyCartView()
            ) : (
              <div className="cart-content-container">
                <button
                  className="remove-all-btn"
                  type="button"
                  onClick={onClickRemoveAllBtn}
                >
                  Remove All
                </button>
                <ul className="cart-list-container">
                  {cartList.map(eachItem => (
                    <CartItem key={eachItem.id} cartItemDetails={eachItem} />
                  ))}
                </ul>
                <hr className="separator" />
                {cartList.length !== 0 && <CartSummary cartList={cartList} />}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
