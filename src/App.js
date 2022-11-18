import { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [ showModal, setShowModal ] = useState(false)
  const [ userScore, setUserScore ] = useState(0)
  const [ computerScore, setComputerScore ] = useState(0)
  const [ playingRound, setPlayingRound ] = useState(false)
  let $roundResult, $roundExplanation, $playerbox, $computerbox, $modalAlert;
  
  useEffect(() => {
    $roundResult = document.getElementById('roundResult')
    $roundExplanation = document.getElementById('roundExplanation')
    $playerbox = document.getElementById("playerbox")
    $computerbox = document.getElementById('computerbox')
    $modalAlert = document.getElementById('modalAlert');
  })
  const restartGame = () => {
    setPlayingRound(false)
    setUserScore(0)
    setComputerScore(0)
    $roundResult.innerText = 'Bienvenido';
    $roundExplanation.innerText = 'Selecciona piedra, papel o tijeras para comenzar'
    $computerbox.innerText = '❔';
    $playerbox.innerText = '❔';
    setShowModal(false)
  }
  const finishGame = (winner) => {
    setPlayingRound(true)
    setTimeout(() => {
      if (winner === 'user'){
        setShowModal(true)
        $modalAlert.innerText = '¡Ganaste!';
      } else if (winner === 'computer'){
        setShowModal(true)
        $modalAlert.innerText = '¡Perdiste!';
      }
    }, 500);
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
    setPlayingRound(true)
    const computerMove = handleComputerTurn()
    handleBox('computer', 'piedra')
    handleBox('user', 'piedra')
    $computerbox.classList.add('active')
    $playerbox.classList.add('active')
    $roundResult.innerText = 'Piedra, papel o tijera'
    $roundExplanation.innerText = 'Jugando el turno..'
    setTimeout(() => {
      setPlayingRound(false)
      $computerbox.classList.remove('active')
      $playerbox.classList.remove('active')
      handleBox('computer', computerMove)
      handleBox('user', userMove)
      if (userMove === computerMove){
        $roundResult.innerText = '¡Es un empate!';
        $roundExplanation.innerText = `${userMove} empata con ${computerMove}`;
      } else if ((userMove === 'piedra' && computerMove === 'tijeras') || (userMove === 'papel' && computerMove === 'piedra') || (userMove === 'tijeras' && computerMove === 'papel')){
        setUserScore(userScore + 1);
        $roundResult.innerText = '¡Ganaste!';
        $roundExplanation.innerText = `${userMove} le gana a ${computerMove}`;
        if (userScore === 2){
          finishGame('user')
        }
      } else if ((computerMove === 'piedra' && userMove === 'tijeras') || (computerMove === 'papel' && userMove === 'piedra') || (computerMove === 'tijeras' && userMove === 'papel')){
        setComputerScore(computerScore + 1);
        $roundResult.innerText = '¡Perdiste!';
        $roundExplanation.innerText = `${computerMove} le gana a ${userMove}`;
        if (computerScore === 2){
          finishGame('computer')
        }
      }
    }, 1500);
  }
  const handleComputerTurn = () =>{
    const moves = ['piedra', 'papel', 'tijeras']
    return moves[Math.floor(Math.random() * 3)]
  }
  
  return(
    <>
    <h1>Piedra, papel o tijeras</h1>
    <header>
      <h2 id='roundResult'>Bienvenido</h2>
      <h3 id='roundExplanation'>Selecciona piedra, papel o tijeras para comenzar</h3>
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
      <button onClick={playingRound ? () => {} : () => handleTurn('piedra')}>✊</button>
      <button onClick={playingRound ? () => {} : () => handleTurn('papel')}>✋</button>
      <button onClick={playingRound ? () => {} : () => handleTurn('tijeras')}>✌️</button>
    </section>
    <article id='modal' className={showModal ? 'active' : 'inactive'}>
      <div>
        <h2 id='modalAlert'>¡Perdiste!</h2>
        <h4>{userScore} - {computerScore}</h4>
        <button onClick={() => restartGame()}>Jugar de nuevo</button>
      </div>
    </article>
  </>
  );
}

export default App;
