import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value

      const {cartItemDetails} = props
      const {id, name, imageUrl, quantity, cost} = cartItemDetails

      const onClickDecrementQuantity = () => {
        decrementCartItemQuantity(id)
      }

      const onClickIncrementQuantity = () => {
        incrementCartItemQuantity(id)
      }

      const onRemoveCartItem = () => {
        removeCartItem(id)
      }
      return (
        <li className="cart-item-desktop">
          <div className="image-name-container">
            <img src={imageUrl} alt="cart item" className="item-image" />
            <p className="item-name">{name}</p>
          </div>
          <div className="quantity-container">
            <button
              type="button"
              className="quantity-controller-button"
              onClick={onClickDecrementQuantity}
            >
              <BsDashSquare color="#52606D" size={12} />
            </button>
            <p className="cart-quantity">{quantity}</p>
            <button
              type="button"
              className="quantity-controller-button"
              onClick={onClickIncrementQuantity}
            >
              <BsPlusSquare color="#52606D" size={12} />
            </button>
          </div>
          <div className="total-price-remove-container">
            <p className="price">Rs {cost * quantity}</p>
            <button
              className="delete-button"
              type="button"
              onClick={onRemoveCartItem}
            >
              <AiFillCloseCircle color="#616E7C" size={20} />
            </button>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)
export default CartItem
