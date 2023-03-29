import React from 'react'
import './SingleCard.css'

const SingleCard = ({card}) => {
  return (
    <div className='card' >
        <div>
        <img className="front "   src={card.src} alt="card front side"/>
        <img className='back'  src='/img/card-back.png' alt="card back side"/>
        </div>
    </div>
  )
}

export default SingleCard