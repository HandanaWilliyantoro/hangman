//#region IMPORT
import React, {useMemo, useState, useCallback, useEffect} from 'react';
import Swal from 'sweetalert2';
import { useAlert } from 'react-alert';

/* Styles */
import "./styles/_variables.scss"

/* Components */
import {
  Header,
  Hangman,
  Input,
  Wrongs
} from './components'

/* Utils */
import { words, isAlphabet, checkWin } from "./utils";
//#endregion

function App() {
  const [corrects, setCorrects] = useState([])
  const [wrongs, setWrongs] = useState([])
  const [playing, setPlaying] = useState(true)

  //#region HOOKS
  const selected = useMemo(() => words[Math.floor(Math.random() * words.length)], [])
  const alert = useAlert();
  //#endregion

  //#region HANDLER
  const reset = useCallback(() => {
    window.location.reload()
  }, [])

  const handleChangeInput = useCallback((e) => {
    
    /* Stricts */
    if(wrongs.includes(e.target.value)){
      alert.show('You have already entered this letter.')
      return
    } else if (corrects.includes(e.target.value)){
      alert.show('You have already entered this letter.')
      return
    } else if (!isAlphabet(e.target.value)){
      alert.show('Letter cannot contain number or symbol.')
      return
    }

    const checkLetterAvailability = selected.includes(e.target.value)

    if(checkLetterAvailability){
      setCorrects(correctText => [...correctText, e.target.value])
    } else {
      setWrongs(wrongText => [...wrongText, e.target.value])
    }
  }, [alert, corrects, selected, wrongs])

  /* Watcher */
  useEffect(() => {
    if(selected){
      const isWin = checkWin(selected, corrects)
      if(isWin){
        Swal.fire({
          title: 'Congratulations!',
          width: 600,
          padding: '3em',
          color: '#242424',
          backdrop: `
            rgba(0,0,123,0.4)
          `,
          imageUrl: 'https://i.pinimg.com/originals/64/5b/fc/645bfccccea259a0e936f974382c28cb.jpg',
          imageWidth: 400,
          imageHeight: 'auto',
          confirmButtonText: "Play Again!"
        }).then((result) => {
          if (result.isConfirmed) {
            reset()
          }
        })
        setPlaying(false)
      } else if (wrongs.length === 5){
        Swal.fire({
          title: 'Dead men tell no tales.',
          text: `The right word is ${selected}`,
          imageUrl: 'https://static.wikia.nocookie.net/pirates/images/2/2e/Jack_Sparrow_Hanging_COTBP.jpg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          showLoaderOnConfirm: true,
          confirmButtonText: 'Try Again!'
        }).then((result) => {
          if (result.isConfirmed) {
            reset()
          }
        })
        setPlaying(false)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [corrects, wrongs])
  //#endregion

  return (
    <div className="App">
      <p style={{color: '#fff'}}>{selected}</p>
      <Header />
      <Hangman wrongs={wrongs.length} />
      <Wrongs wrongs={wrongs} />
      <Input playing={playing} handleChangeInput={handleChangeInput} selected={selected} corrects={corrects} />
      {!playing && <button className='reset' onClick={reset}>Try Again!</button>}
    </div>
  );
}

export default App;
