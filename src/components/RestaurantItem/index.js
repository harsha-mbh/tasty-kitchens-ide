import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantItem = props => {
  const {restaurantData} = props
  const {imageUrl, name, cuisine, userRating, id} = restaurantData
  const {rating, totalReviews} = userRating
  return (
    <Link to={`/restaurant/${id}`} className="restaurant-link">
      <li className="restaurant-item">
        <img
          src={imageUrl}
          alt="restaurant"
          className="restaurant-item-image"
        />
        <div className="restaurant-item-details">
          <h1 className="name">{name}</h1>
          <p className="cuisine">{cuisine}</p>
          <div className="ratings-container">
            <AiFillStar color="#FFCC00" />
            <p className="rating">{rating}</p>
            <p className="reviews">{`(${totalReviews} ratings)`}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
