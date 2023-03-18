import {Redirect} from 'react-router-dom'
import Header from '../Header'
import CartItem from '../CartItem'
import './index.css'

const Cart = () => {
  const stringifiedCartList = localStorage.getItem('cartList')
  const parsedCartList =
    stringifiedCartList === null ? [] : JSON.parse(stringifiedCartList)

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
      {parsedCartList.length === 0 ? (
        renderEmptyCartView()
      ) : (
        <ul>
          {parsedCartList.map(eachItem => (
            <CartItem key={eachItem.id} cartItemDetails={eachItem} />
          ))}
        </ul>
      )}
    </>
  )
}

export default Cart
