import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'
import Counter from '../Counter'
import './index.css'

const MenuItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        addCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {menuDetails} = props
      const {name, id, imageUrl, cost, rating} = menuDetails

      const onClickAddItem = () => {
        addCartItem({...menuDetails, quantity: 1})
      }

      const onDecrementQuantity = () => {
        decrementCartItemQuantity(id)
      }

      const onIncrementQuantity = () => {
        incrementCartItemQuantity(id)
      }

      const quantityInCart = itemId => {
        const {cartList} = value
        if (cartList.length !== 0) {
          const filteredCartItem = cartList.filter(
            eachItem => eachItem.id === itemId,
          )
          if (filteredCartItem.length === 0) {
            return 0
          }
          return filteredCartItem[0].quantity
        }
        return 0
      }

      const itemCartQuantity = quantityInCart(id)
      return (
        <li className="menu-item">
          <img src={imageUrl} alt="menu item" className="menu-image" />
          <div className="menu-details-container">
            <h1 className="name">{name}</h1>
            <div className="mini-details-container">
              <BiRupee width={14} height={14} />
              <p className="menu-details">{cost}</p>
            </div>
            <div className="mini-details-container">
              <AiFillStar width={14} height={14} color="#FFCC00" />
              <p className="menu-details bold">{rating}</p>
            </div>
            {itemCartQuantity === 0 ? (
              <button
                type="button"
                className="add-btn"
                onClick={onClickAddItem}
              >
                Add
              </button>
            ) : (
              <Counter
                key={id}
                quantity={itemCartQuantity}
                onDecrementQuantity={onDecrementQuantity}
                onIncrementQuantity={onIncrementQuantity}
              />
            )}
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default MenuItem
