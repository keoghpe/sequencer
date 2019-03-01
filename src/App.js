import React, {Component, useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const defaultNotes = [
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
];

const scale = [
  261.63,
  246.94,
  233.08,
  220.00,
  207.65,
  196.00,
  185.00,
  174.61,
  164.81,
  155.56,
  164.83,
  138.59,
  130.81,
]
let ctx = null;

const App = () => {

  const [notes, setNotes] = useState(defaultNotes);
  const [column, setColumn] = useState(0);
  const [bpm, setBpm] = useState(120);

  useEffect(() => {
    if(bpm) {
      let tickMs = (1000 / (bpm  / 60) / 16);

      let interval = setInterval(() => {
        setColumn((column + 1) % 16)
      }, tickMs)


      notes.forEach((row, index) => {
        if(row[column] && ctx) {
          var oscillator = ctx.createOscillator();
          oscillator.frequency.value = scale[index];
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + (tickMs / 1000));
          oscillator.connect(ctx.destination);
        }
      })

      return () => {
        clearInterval(interval)
      }
    }
  })


  return (
    <div className="App">
      <input type="text" value={bpm} onInput={e => {
        let stringValue = e.target.value;
        let value = parseInt(stringValue);
        if(stringValue === '') {
          setBpm(null)
        } else if(!isNaN(value)) {
          setBpm(value)
        }
      }}/>
      {
        notes.map((noteRow, index) => <NoteRow index={index}
                                               noteRow={noteRow}
                                               column={column}
                                               toggleCell={(index, jndex) => {
                                                 let updatedNotes = notes.map(row => row.slice());

                                                 updatedNotes[index][jndex] = !notes[index][jndex];
                                                 setNotes(updatedNotes);
                                               }}
        />)
      }
    </div>
  );

}

const NoteRow = ({index, noteRow, toggleCell, column}) => {
  return (
    <div className="NodeRow">
      {
        noteRow.map((active, jndex) => <Note index={index} jndex={jndex} active={active} column={column}
                                             toggleCell={toggleCell}/>)
      }
    </div>
  )
}

const Note = ({active, toggleCell, index, jndex, column}) => {
  let activeClass = active ? 'active' : '';
  let currentClass = jndex === column ? 'current' : '';

  return (<div className={`Note ${activeClass} ${currentClass}`} onClick={() => {
    if(ctx === null) {
      ctx = new AudioContext();
    }
    toggleCell(index, jndex)
  }}></div>)
}


export default App;
