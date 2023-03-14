import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="error-page-container">
    <div className="responsive-container">
      <img
        src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1677130982/Tasty%20Kitchens/erroring_1notfound-mob_fgvps7.png"
        alt="not found"
        className="error-image"
      />
      <h1 className="error-heading">Page Not Found</h1>
      <p className="error-description">
        We are sorry, the page you requested could not be found. Please go back
        to the home page
      </p>
      <Link to="/">
        <button type="button" className="home-btn">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
