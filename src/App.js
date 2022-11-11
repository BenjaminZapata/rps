import './App.scss';

function App() {
  let userScore = 0, computerScore = 0;

  return (
  <>
    <h1>Piedra, papel o tijeras</h1>
    <header>
      <h2>Resultado de la ronda</h2>
      <h3>Explicacion de la ronda</h3>
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
      <button>✊</button>
      <button>✋</button>
      <button>✌️</button>
    </section>
  </>
  );
}

export default App;
