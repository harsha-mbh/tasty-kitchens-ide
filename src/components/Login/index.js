import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <img
          src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1677069408/Tasty%20Kitchens/Rectangle_1457login-bg-mobile_piq5pg.png"
          alt="website login"
          className="login-image"
        />
        <img
          src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1677071174/Tasty%20Kitchens/Rectangle_1456login-dektop_qlruiv.png"
          className="login-dektop-image"
          alt="website login"
        />
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.onSubmitLogin}>
            <h1 className="form-heading">Login</h1>
            <div className="input-container">
              <label htmlFor="username" className="label-text">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input-field"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label-text">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {showErrorMsg && <p>{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
