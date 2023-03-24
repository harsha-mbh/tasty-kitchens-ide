import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import RestaurantItemPoster from '../RestaurantItemPoster'
import MenuItem from '../MenuItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
}

class RestaurantItemDetails extends Component {
  state = {restaurantData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        rating: data.rating,
        id: data.id,
        cuisine: data.cuisine,
        name: data.name,
        costForTwo: data.cost_for_two,
        imageUrl: data.image_url,
        reviewsCount: data.reviews_count,
        opensAt: data.opens_at,
        location: data.location,
        itemsCount: data.items_count,
        foodItems: data.food_items.map(eachItem => ({
          name: eachItem.name,
          cost: eachItem.cost,
          id: eachItem.id,
          foodType: eachItem.food_type,
          imageUrl: eachItem.image_url,
          rating: eachItem.rating,
        })),
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        restaurantData: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPosterSuccessView = () => {
    const {restaurantData} = this.state
    return <RestaurantItemPoster restaurantData={restaurantData} />
  }

  renderRestaurantDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderPosterSuccessView()
      case 'LOADING':
        return this.renderLoadingView
      default:
        return null
    }
  }

  renderFoodItemsSuccessView = () => {
    const {restaurantData} = this.state
    const {foodItems} = restaurantData
    return (
      <ul className="food-items-container">
        {foodItems.map(eachItem => (
          <MenuItem key={eachItem.id} menuDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderFoodItems = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderFoodItemsSuccessView()
      case 'LOADING':
        return this.renderLoadingView
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderRestaurantDetails()}
        {this.renderFoodItems()}
      </>
    )
  }
}

export default RestaurantItemDetails
