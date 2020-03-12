import React from 'react'
import { Slide } from 'react-slideshow-image'

const slideImages = [
    "https://i.imgur.com/ikr3ywL.jpg",
    "https://i.imgur.com/PUo0F1D.jpg",
    "https://i.imgur.com/FrF3O62.jpg"
]

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
  }

function Home() {
    return (
        <div className="Home">
            <Slide {...properties}>
                <div className="Slide">
                    <div style={{'backgroundImage': `url(${slideImages[0]})`}}></div>
                </div>

                <div className="Slide">
                    <div style={{'backgroundImage': `url(${slideImages[1]})`}}></div>
                </div>

                <div className="Slide">
                    <div style={{'backgroundImage': `url(${slideImages[2]})`}}></div>
                </div>
            </Slide>
        </div>
    )
}

export default Home