import { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [ userScore, setUserScore ] = useState(0)
  const [ computerScore, setComputerScore ] = useState(0)
  let $roundResult, $roundExplanation, $playerbox, $computerbox;
  
  useEffect(() => {
    $roundResult = document.getElementById('roundResult')
    $roundExplanation = document.getElementById('roundExplanation')
    $playerbox = document.getElementById("playerbox")
    $computerbox = document.getElementById('computerbox')
  })
  const checkScore = () => {
    if (userScore === 3){

    } else if (computerScore === 3){

    }
  }
  const handleBox = (player, move) => {
    const moves = {piedra: '✊', papel: '✋', tijeras: '✌️'}
    if (player === 'computer'){
      $computerbox.innerText = moves[move];
    } else if (player === 'user'){
      $playerbox.innerText = moves[move];
    }
  }
  const handleTurn = (userMove) => {
    const computerMove = handleComputerTurn()
    handleBox('computer', computerMove)
    handleBox('user', userMove)
    if (userMove === computerMove){
      $roundResult.innerText = '¡Es un empate!';
      $roundExplanation.innerText = `${userMove} empata con ${computerMove}`;
    } else if ((userMove === 'piedra' && computerMove === 'tijeras') || (userMove === 'papel' && computerMove === 'piedra') || (userMove === 'tijeras' && computerMove === 'papel')){
      $roundResult.innerText = '¡Ganaste!';
      $roundExplanation.innerText = `${userMove} le gana a ${computerMove}`;
      setUserScore(userScore + 1);
    } else if ((computerMove === 'piedra' && userMove === 'tijeras') || (computerMove === 'papel' && userMove === 'piedra') || (computerMove === 'tijeras' && userMove === 'papel')){
      $roundResult.innerText = '¡Perdiste!';
      $roundExplanation.innerText = `${computerMove} le gana a ${userMove}`;
      setComputerScore(computerScore + 1);
    }
    checkScore()
  }
  const handleComputerTurn = () =>{
    const moves = ['piedra', 'papel', 'tijeras']
    return moves[Math.floor(Math.random() * 3)]
  }
  
  return(
    <>
    <h1>Piedra, papel o tijeras</h1>
    <header>
      <h2 id='roundResult'>Resultado de la ronda</h2>
      <h3 id='roundExplanation'>Explicacion de la ronda</h3>
    </header>
    <section className='battleground'>
      <article className='userbox'>
        <h5 id='playerbox'>❔</h5>
        <p>Jugador: {userScore}</p>
      </article>
      <article className='userbox'>
        <h5 id='computerbox'>❔</h5>
        <p>Maquina: {computerScore}</p>
      </article>
    </section>
    <section className='controls'>
      <button onClick={() => handleTurn('piedra')}>✊</button>
      <button onClick={() => handleTurn('papel')}>✋</button>
      <button onClick={() => handleTurn('tijeras')}>✌️</button>
    </section>
  </>
  );
}

export default App;
