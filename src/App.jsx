import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/1Ace.png", matched:false},
  {"src": "/img/1jack.png", matched:false},
  {"src": "/img/1king.png", matched:false},
  {"src": "/img/2spades.png", matched:false},
  {"src": "/img/4diamond.png", matched:false},
  {"src": "/img/10spades.png", matched:false},

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
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {
                ...card, matched:true
              }
            }
            else {
              return card
            }
          })
        })
        resetTurn()
      }
      else{
        
        resetTurn()
      }
    }
  },[choiceOne,choiceTwo])

  console.log(cards);

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
            <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched}/>
          ))}
         </div>
      </div>
    </div>
  );
};

export default App;

