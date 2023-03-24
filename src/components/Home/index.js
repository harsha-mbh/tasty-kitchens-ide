import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import RestaurantItem from '../RestaurantItem'
import FiltersGroup from '../FiltersGroup'
import Carousal from '../Carousal'
import Pagination from '../Pagination'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    sortItemId: sortByOptions[1].value,
    popularRestaurants: [],
    carousalDetails: [],
    popularApiStatus: apiStatusConstants.initial,
    carousalApiStatus: apiStatusConstants.initial,
    totalPages: null,
    currentPage: 1,
  }

  componentDidMount() {
    this.getPopularRestaurants()
    this.getCarousalItems()
  }

  onClickPrevPage = () => {
    const {currentPage} = this.state
    if (currentPage > 1) {
      this.setState(
        prevState => ({currentPage: prevState.currentPage - 1}),
        this.getPopularRestaurants,
      )
    }
  }

  onClickNextPage = () => {
    const {currentPage, totalPages} = this.state
    if (currentPage < totalPages) {
      this.setState(
        prevState => ({currentPage: prevState.currentPage + 1}),
        this.getPopularRestaurants,
      )
    }
  }

  changeSortItemId = sortItemId =>
    this.setState({sortItemId}, this.getPopularRestaurants)

  getPopularRestaurants = async () => {
    this.setState({popularApiStatus: apiStatusConstants.loading})
    const {sortItemId, currentPage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${
      (currentPage - 1) * 9
    }&limit=9&sort_by_rating=${sortItemId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const restaurantData = data.restaurants
      const formattedData = restaurantData.map(eachRestaurant => ({
        costForTwo: eachRestaurant.cost_for_two,
        cuisine: eachRestaurant.cuisine,
        groupByTime: eachRestaurant.group_by_time,
        hasOnlineDelivery: eachRestaurant.has_online_delivery,
        hasTableBooking: eachRestaurant.has_table_booking,
        id: eachRestaurant.id,
        imageUrl: eachRestaurant.image_url,
        isDeliveringNow: eachRestaurant.is_delivering_now,
        location: eachRestaurant.location,
        menuType: eachRestaurant.menu_type,
        name: eachRestaurant.name,
        opensAt: eachRestaurant.opens_at,
        userRating: {
          rating: eachRestaurant.user_rating.rating,
          ratingText: eachRestaurant.user_rating.rating_text,
          ratingColor: eachRestaurant.user_rating.rating_color,
          totalReviews: eachRestaurant.user_rating.total_reviews,
        },
      }))
      this.setState({
        popularRestaurants: formattedData,
        popularApiStatus: apiStatusConstants.success,
        totalPages: Math.ceil(data.total / 9),
      })
    } else {
      this.setState({popularApiStatus: apiStatusConstants.failure})
    }
  }

  getCarousalItems = async () => {
    this.setState({carousalApiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.offers.map(eachOffer => ({
        id: eachOffer.id,
        imageUrl: eachOffer.image_url,
      }))
      this.setState({
        carousalApiStatus: apiStatusConstants.success,
        carousalDetails: formattedData,
      })
    } else {
      this.setState({carousalApiStatus: apiStatusConstants.failure})
    }
  }

  renderFilterGroup = () => {
    const {sortItemId} = this.state
    return (
      <FiltersGroup
        sortByOptions={sortByOptions}
        sortItemId={sortItemId}
        changeSortItemId={this.changeSortItemId}
      />
    )
  }

  renderCarousalSuccessView = () => {
    const {carousalDetails} = this.state
    return (
      <div className="carousal-container">
        <Carousal carousalDetails={carousalDetails} />
      </div>
    )
  }

  renderCarousalLoadingView = () => (
    <div className="carousal-loader-container">
      <Loader type="TailSpin" color="#FFCC00" height={50} width={50} />
    </div>
  )

  renderCarousal = () => {
    const {carousalApiStatus} = this.state
    switch (carousalApiStatus) {
      case 'SUCCESS':
        return this.renderCarousalSuccessView()
      case 'LOADING':
        return this.renderCarousalLoadingView()
      default:
        return null
    }
  }

  renderPopularRestaurantSuccessView = () => {
    const {popularRestaurants, currentPage, totalPages} = this.state
    return (
      <>
        <ul className="restaurants-list-container">
          {popularRestaurants.map(restaurant => (
            <RestaurantItem key={restaurant.id} restaurantData={restaurant} />
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onClickNextPage={this.onClickNextPage}
          onClickPrevPage={this.onClickPrevPage}
        />
      </>
    )
  }

  renderPopularRestaurantsLoadingView = () => (
    <div className="restaurants-loader-container">
      <Loader type="TailSpin" color="#FFCC00" height={50} width={50} />
    </div>
  )

  renderPopularRestaurants = () => {
    const {popularApiStatus} = this.state
    switch (popularApiStatus) {
      case 'SUCCESS':
        return this.renderPopularRestaurantSuccessView()
      case 'LOADING':
        return this.renderPopularRestaurantsLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCarousal()}
        {this.renderFilterGroup()}
        {this.renderPopularRestaurants()}
        <Footer />
      </>
    )
  }
}

export default Home
