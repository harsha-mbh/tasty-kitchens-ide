import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="responsive-container">
      <div className="logo-container">
        <img
          src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1677134374/Tasty%20Kitchens/Frame_274chef-img_iuqiad.png"
          className="chef-hat"
          alt="chef hat"
        />
        <img
          src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1677134374/Tasty%20Kitchens/Featurestasty-kitchens_ctjpkr.png"
          className="logo-text"
          alt="website logo"
        />
      </div>
      <p className="footer-description">
        The only thing we are serious about is food.
      </p>
      <p className="footer-description">Contact us on</p>
      <ul className="social-media-icons-container">
        <li>
          <FaPinterestSquare className="icon-link" />
        </li>
        <li>
          <FaInstagram className="icon-link" />
        </li>
        <li>
          <FaTwitter className="icon-link" />
        </li>
        <li>
          <FaFacebookSquare className="icon-link" />
        </li>
      </ul>
    </div>
  </div>
)

export default Footer
