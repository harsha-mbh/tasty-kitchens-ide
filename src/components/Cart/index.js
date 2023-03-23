import {Component} from 'react'
import {BsCheckCircleFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'
import CartSummary from '../CartSummary'
import CartContext from '../../context/CartContext'

import './index.css'

class Cart extends Component {
  state = {isOrderPlaced: false}

  render() {
    const {isOrderPlaced} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value
          const showEmptyView = cartList.length === 0
          const onClickRemoveAllBtn = () => {
            removeAllCartItems()
          }

          const onClickHomeBtn = () => {
            this.setState({isOrderPlaced: false})
            const {history} = this.props
            history.replace('/')
          }

          const renderPaymentSuccessView = () => (
            <div className="payment-success-container">
              <BsCheckCircleFill color="#22C55E" width={48} height={48} />
              <h1 className="payment-heading">Payment Successful</h1>
              <p className="payment-description">Thank you for ordering</p>
              <p className="payment-description">
                Your payment is successfully completed
              </p>
              <button
                className="home-page-btn"
                type="button"
                onClick={onClickHomeBtn}
              >
                Go to Home Page
              </button>
            </div>
          )

          const onClickOrderBtn = () => {
            const {history} = this.props
            history.replace('/')
          }

          const changeOrderStatus = () => {
            removeAllCartItems()
            this.setState(prevState => ({
              isOrderPlaced: !prevState.isOrderPlaced,
            }))
          }

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
              <button
                type="button"
                className="order-btn"
                onClick={onClickOrderBtn}
              >
                Order Now
              </button>
            </div>
          )

          const renderCartView = () => (
            <div className="cart-content-container-desktop">
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
              {cartList.length !== 0 && (
                <CartSummary
                  cartList={cartList}
                  changeOrderStatus={changeOrderStatus}
                />
              )}
            </div>
          )

          const renderCart = () => {
            switch (isOrderPlaced) {
              case false:
                return renderCartView()
              case true:
                return renderPaymentSuccessView()
              default:
                return null
            }
          }

          return (
            <>
              <Header />
              <div className="cart-container">
                {showEmptyView && !isOrderPlaced
                  ? renderEmptyCartView()
                  : renderCart()}
              </div>
              {!showEmptyView && !isOrderPlaced && <Footer />}
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
