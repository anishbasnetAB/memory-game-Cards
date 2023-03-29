import React, { useState } from 'react';

const cardImages = [
  {"src": "/img/1Ace.png"},
  {"src": "/img/1jack.png"},
  {"src": "/img/1king.png"},
  {"src": "/img/2spades.png"},
  {"src": "/img/4diamond.png"},
  {"src": "/img/10spades.png"},

]

const App = () => {

  const [cards , setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages,...cardImages].sort(()=>Math.random()-0.5)
    .map((card)=> ({...card, id:Math.random()}))

    setCards(shuffledCards)
    setTurns(0)
  }
  console.log(cards, turns)
  return (
    <div className='appBg'>
      <div className='text-center m-5'>
         <h1 className='p-3'>Memory Game</h1>
         <button  type="button" className="btn btn-outline-danger btn-lg" onClick={shuffleCards}>Start Game</button>
      </div>
    </div>
  );
};

export default App;
