import { useEffect, useState, useRef } from 'react'
import './App.css'


function App() {


  function defaultStateButtons(){
    return Array.from({ length: 10 }, () => ({
      value: Math.ceil(Math.random() * 6),
      clicked: false,
    }))
  }

  const [ gameEnd, setGameEnd ] = useState(false)
  
  const [ buttons, setButtons] = useState( defaultStateButtons() )
  const firstClickedTextRef = useRef(null)
  
  
  useEffect(() => {
    
    if((buttons.every(btn => btn.clicked === true))){
      setGameEnd(true);
    }
  }, [...buttons])



  const btnClick = (index) => {
    setButtons(prev =>
      prev.map((btn, i) =>{
        if (i === index) {


          if (firstClickedTextRef.current === null) {
            firstClickedTextRef.current = btn.value
          }

          if (btn.value == firstClickedTextRef.current) {
            return { ...btn, clicked : true}
          }
        }

        return {...btn}
      }
      
      )
    );


  }


  function rollDie(){
    setButtons(prev => 
      prev.map(btn => 
        btn.clicked ? btn : {...btn, value : Math.ceil(Math.random() * 6)}
      )
    )

  }

  function newGame(){
    setButtons(defaultStateButtons())
    setGameEnd(false)

    firstClickedTextRef.current = null
  }

  return (
    <main >
      <h1>Tenzies</h1>
      <p>Roll The Dice to get the same number on each. click the dice to freeze its value</p>
      <div className="container">{
           buttons.map((btn, i) =>
            <button
              key={i}
              className={btn.clicked ? 'btn clicked' : 'btn'}
              onClick={() => btnClick(i)}
            >
              {btn.value}
            </button>
          )
        }</div>
        {
          gameEnd ?  
          <button className="control-btn" onClick={newGame}>New Game</button> : 
          <button className="control-btn" onClick={rollDie}>Roll</button>
        }
    </main>
  )
}





export default App