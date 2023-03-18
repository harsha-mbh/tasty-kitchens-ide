import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Counter from '../Counter'
import './index.css'

class MenuItem extends Component {
  state = {cartList: []}

  componentDidMount() {
    this.getCartItems()
  }

  getCartItems = () => {
    const cartItems = localStorage.getItem('cartList')
    if (cartItems !== null) {
      const parsedCartItems = JSON.parse(cartItems)
      this.setState({cartList: parsedCartItems})
    }
  }

  onClickAddItem = () => {
    const {menuDetails} = this.props
    const newCartItem = {...menuDetails, quantity: 1}
    this.setState(
      prevState => ({
        cartList: [...prevState.cartList, newCartItem],
      }),
      () => {
        const {cartList} = this.state
        localStorage.setItem('cartList', JSON.stringify(cartList))
      },
    )
  }

  quantityInCart = itemId => {
    const {cartList} = this.state
    console.log(cartList)
    if (cartList.length !== 0) {
      const filteredItem = cartList.filter(eachItem => eachItem.id === itemId)
      if (filteredItem.length !== 0) {
        return filteredItem
      }
    }
    return null
  }

  onIncrementQuantity = itemId => {
    const {cartList} = this.state
    console.log('On Increment Function called')
    const modifiedCartList = cartList.map(eachItem => {
      if (eachItem.id !== itemId) {
        return eachItem
      }
      return {...eachItem, quantity: eachItem.quantity + 1}
    })
    localStorage.setItem('cartList', JSON.stringify(modifiedCartList))
    this.getCartItems()
  }

  onDecrementQuantity = itemId => {
    const {cartList} = this.state
    console.log('On Decrement Function called')
    const modifiedCartList = cartList.map(eachItem => {
      if (eachItem.id !== itemId) {
        return eachItem
      }
      const {quantity} = eachItem
      if (quantity > 0) {
        const modifiedQuantity = quantity - 1
        return {...eachItem, quantity: modifiedQuantity}
      }
      return {...eachItem, quantity: 0}
    })
    localStorage.setItem('cartList', JSON.stringify(modifiedCartList))
    this.getCartItems()
  }

  render() {
    const {menuDetails} = this.props
    const {name, id, imageUrl, cost, rating} = menuDetails
    const itemCartQuantity = this.quantityInCart(id)
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
          {itemCartQuantity === null ? (
            <button
              type="button"
              className="add-btn"
              onClick={this.onClickAddItem}
            >
              Add
            </button>
          ) : (
            <Counter
              key={id}
              itemDetails={itemCartQuantity}
              onDecrementQuantity={this.onDecrementQuantity}
              onIncrementQuantity={this.onIncrementQuantity}
            />
          )}
        </div>
      </li>
    )
  }
}

export default MenuItem
