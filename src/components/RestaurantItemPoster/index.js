import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import './index.css'

const RestaurantItemPoster = props => {
  const {restaurantData} = props
  const {
    imageUrl,
    name,
    cuisine,
    location,
    rating,
    reviewsCount,
    costForTwo,
  } = restaurantData
  return (
    <div className="poster-container">
      <div className="restaurant-poster-content-container">
        <img
          src={imageUrl}
          alt="restaurant"
          className="restaurant-poster-image"
        />
        <div className="restaurant-poster-details-container">
          <h1 className="restaurant-poster-name">{name}</h1>
          <p className="restaurant-poster-details">{cuisine}</p>
          <p className="location">{location}</p>
          <div className="rating-cost-container">
            <div className="details-container">
              <div className="flex-container">
                <AiFillStar color="#ffffff" />
                <p className="restaurant-poster-details">{rating}</p>
              </div>
              <p className="mini-details">{`${reviewsCount} Ratings`}</p>
            </div>
            <div className="details-container">
              <div className="flex-container">
                <BiRupee color="#ffffff" />
                <p className="restaurant-poster-details">{costForTwo}</p>
              </div>
              <p className="mini-details">Cost for two</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantItemPoster
