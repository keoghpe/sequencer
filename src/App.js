import React, { Component, useState, useEffect } from 'react';
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
];

const App = () => {

  const [notes, setNotes] = useState(defaultNotes);
  const [column, setColumn] = useState(0);

  useEffect(() => {
    // var ctx = new AudioContext();
    // var o = ctx.createOscillator();
    // o.frequency.value = 261.63;
    // o.start(0);
    // o.connect(ctx.destination);

    let interval = setInterval(() => {
      setColumn((column + 1) % 16)
    }, 80)

    return () => {
      clearInterval(interval)
    }
  })


  return (
    <div className="App">
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
        noteRow.map((active, jndex) => <Note index={index} jndex={jndex} active={active} column={column} toggleCell={toggleCell} />)
      }
    </div>
  )
}

const Note = ({active, toggleCell, index, jndex, column}) => {
  let activeClass = active ? 'active' : '';
  let currentClass = jndex === column ? 'current' : '';

  return (<div className={`Note ${activeClass} ${currentClass}`} onClick={() => {toggleCell(index, jndex)}}></div>)
}


export default App;
