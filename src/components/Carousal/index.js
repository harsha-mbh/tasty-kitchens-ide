import {Component} from 'react'
import Slider from 'react-slick'

import './index.css'

class Carousal extends Component {
  render() {
    const settings = {
      dots: true,
    }
    const {carousalDetails} = this.props
    return (
      <div className="container">
        <Slider {...settings}>
          {carousalDetails.map(eachImage => (
            <div>
              <img
                src={eachImage.imageUrl}
                alt={eachImage.id}
                className="carousal-image"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}

export default Carousal
