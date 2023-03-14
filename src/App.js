import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import NotFound from './components/NotFound'
import RestaurantItemDetails from './components/RestaurantItemDetails'
import Home from './components/Home'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/restaurant/:id" component={RestaurantItemDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
