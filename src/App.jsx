import React, { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
import './App.css';

const cardImages = [
  { src: "/img/1Ace.png", matched: false },
  { src: "/img/1jack.png", matched: false },
  { src: "/img/1king.png", matched: false },
  { src: "/img/2spades.png", matched: false },
  { src: "/img/4diamond.png", matched: false },
  { src: "/img/10spades.png", matched: false },
];

const App = () => {
  // Game state
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Shuffle cards on start or restart of the game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setGameOver(false);
  };

  // Handle choice of a card
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        // Update matched state for matched cards
        setCards((prevCards) => {
          const newCards = prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });

          // Check if all cards are matched
          if (newCards.every((card) => card.matched)) {
            setGameOver(true);
          }
          return newCards;
        });
        // Reset choice and increase turn
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choice and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTruns) => prevTruns + 1);
    setDisabled(false);
  };

  // Restart the game
  const handleRestart = () => {
    shuffleCards();
  };

  return (
    <div className="appBg">
      <div className="text-center m-2">
        <h1 className="p-2">Memory Game</h1>
        <button
          type="button"
          className="btn btn-outline-danger btn-lg mb-4"
          onClick={shuffleCards}
        >
          Start Game
        </button>
        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={
                card === choiceOne || card === choiceTwo || card.matched
              }
              disabled={disabled}
            />
          ))}
      </div>
        {gameOver && 
        <div className="text-center mt-4">
          <h2>Congratulations! You've matched all the cards in {turns} turns.</h2>
          <button type="button" className="btn btn-outline-danger btn-lg mt-4" onClick={handleRestart}>Play Again</button>
        </div>
        }
      </div>
    </div>
  );
}
  
export default App;
