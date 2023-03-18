import {Component} from 'react'

import './index.css'

class Counter extends Component {
  onDecrement = () => {
    const {onDecrementQuantity, itemDetails} = this.props
    const {id} = itemDetails
    onDecrementQuantity(id)
  }

  onIncrement = () => {
    const {onIncrementQuantity, itemDetails} = this.props
    const {id} = itemDetails
    onIncrementQuantity(id)
  }

  render() {
    const {itemDetails} = this.props
    const {quantity} = itemDetails[0]
    return (
      <div className="counter-container">
        <button type="button" onClick={this.onDecrement} className="count-btn">
          -
        </button>
        <div className="cart-quantity">{quantity}</div>
        <button type="button" onClick={this.onIncrement} className="count-btn">
          +
        </button>
      </div>
    )
  }
}

export default Counter
