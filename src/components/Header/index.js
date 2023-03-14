import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {showMenu: false}

  onClickMenu = () => this.setState({showMenu: true})

  onCloseMenu = () => this.setState({showMenu: false})

  render() {
    const {showMenu} = this.state
    return (
      <nav className="nav-container">
        <div className="nav-mobile-content">
          <Link to="/" className="menu-link">
            <div className="mobile-logo-container">
              <img
                src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1677134374/Tasty%20Kitchens/Frame_274chef-img_iuqiad.png"
                alt="website logo"
                className="chef-hat"
              />
              <p className="logo-text">Tasty Kitchens</p>
            </div>
          </Link>
          <button
            type="button"
            className="menu-icon"
            onClick={this.onClickMenu}
          >
            <GiHamburgerMenu width={24} height={24} />
          </button>
        </div>
        {showMenu && (
          <div className="nav-mobile-menu">
            <ul className="nav-menu-container">
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  Home
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/cart" className="menu-link">
                  Cart
                </Link>
              </li>
              <li className="menu-item">
                <button
                  className="logout-btn"
                  type="button"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="close-btn"
              onClick={this.onCloseMenu}
            >
              <AiFillCloseCircle width={24} height={24} />
            </button>
          </div>
        )}
        <div className="nav-desktop-content">
          <Link to="/" className="menu-link">
            <div className="mobile-logo-container">
              <img
                src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1677134374/Tasty%20Kitchens/Frame_274chef-img_iuqiad.png"
                alt="website logo"
                className="chef-hat"
              />
              <p className="logo-text">Tasty Kitchens</p>
            </div>
          </Link>

          <ul className="nav-menu-container">
            <li className="menu-item">
              <Link to="/" className="menu-link">
                Home
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/cart" className="menu-link">
                Cart
              </Link>
            </li>
            <button
              className="logout-btn"
              type="button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </ul>
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)
