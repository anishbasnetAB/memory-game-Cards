import React from 'react'
import './SingleCard.css'

const SingleCard = ({card, handleChoice}) => {

    const handleClick=()=>{
        handleChoice(card)
    }

  return (
    <div className='card' >
        <div>
        <img className="front "   src={card.src} alt="card front side"/>
        <img className='back'  src='/img/card-back.png' onClick={handleClick} alt="card back side"/>
        </div>
    </div>
  )
}

export default SingleCard