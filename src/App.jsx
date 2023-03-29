import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

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
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages,...cardImages].sort(()=>Math.random()-0.5)
    .map((card)=> ({...card, id:Math.random()}))

    setCards(shuffledCards)
    setTurns(0)
  }

  //handle Choice
  const handleChoice = (card) =>{
    choiceOne ? setChoiceTwo(card):setChoiceOne(card)
  }

  //compare 2 selected cards 
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      if(choiceOne.src==choiceTwo.src){
        console.log('Matches')
        resetTurn()
      }
      else{
        console.log("NOT match")
        resetTurn()
      }
    }
  },[choiceOne,choiceTwo])

  //reset Choice and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTruns => prevTruns+1)
  }

  return (
    <div className='appBg '>
      <div className='text-center m-2'>
         <h1 className='p-2'>Memory Game</h1>
         <button  type="button" className="btn btn-outline-danger btn-lg mb-4" onClick={shuffleCards}>Start Game</button>
         <div className="card-grid ">
          {cards.map(card => (
            <SingleCard key={card.id} card={card} handleChoice={handleChoice}/>
          ))}
         </div>
      </div>
    </div>
  );
};

export default App;

