import {Component} from 'react'

import './index.css'

class Counter extends Component {
  onDecrement = () => {
    const {onDecrementQuantity} = this.props
    onDecrementQuantity()
  }

  onIncrement = () => {
    const {onIncrementQuantity} = this.props
    onIncrementQuantity()
  }

  render() {
    const {quantity} = this.props
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
