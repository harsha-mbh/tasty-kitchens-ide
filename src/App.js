import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import NotFound from './components/NotFound'
import RestaurantItemDetails from './components/RestaurantItemDetails'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
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
)

export default App
