import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import NotFound from './components/NotFound'
import RestaurantItemDetails from './components/RestaurantItemDetails'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import './App.css'

class App extends Component {
  state = {cartList: []}

  componentDidMount() {
    const stringifiedCartList = localStorage.getItem('cartList')
    console.log(stringifiedCartList)
    try {
      const parsedCartList = JSON.parse(stringifiedCartList)
      console.log(parsedCartList)
      if (parsedCartList !== null) {
        this.setState({cartList: parsedCartList})
      } else {
        this.setState({cartList: []})
      }
    } catch (error) {
      console.error('Error parsing cartList from localStorage:', error)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(
      eachCartItem => id !== eachCartItem.id,
    )
    this.setState({cartList: filteredCartList}, () => {
      localStorage.setItem('cartList', JSON.stringify(filteredCartList))
    })
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachCartItem => {
      if (eachCartItem.id !== id) {
        return eachCartItem
      }
      const updatedItem = {
        ...eachCartItem,
        quantity: eachCartItem.quantity + 1,
      }
      return updatedItem
    })
    this.setState({cartList: updatedCartList}, () => {
      localStorage.setItem('cartList', JSON.stringify(updatedCartList))
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachCartItem => {
      if (eachCartItem.id !== id) {
        return eachCartItem
      }
      const updatedItem = {
        ...eachCartItem,
        quantity: eachCartItem.quantity - 1,
      }
      return updatedItem
    })
    const filteredCartList = updatedCartList.filter(
      eachCartItem => eachCartItem.quantity > 0,
    )
    this.setState({cartList: filteredCartList}, () => {
      localStorage.setItem('cartList', JSON.stringify(filteredCartList))
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []}, () => {
      const {cartList} = this.state
      localStorage.setItem('cartList', JSON.stringify(cartList))
    })
  }

  addCartItem = product => {
    const {cartList} = this.state
    const existingProduct = cartList.filter(
      eachProduct => product.id === eachProduct.id,
    )
    if (existingProduct.length === 0) {
      const updatedCartList = [...cartList, product]
      this.setState({cartList: updatedCartList}, () => {
        localStorage.setItem('cartList', JSON.stringify(updatedCartList))
      })
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
