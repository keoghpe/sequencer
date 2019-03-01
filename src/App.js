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

const App = () => {

  const [notes, setNotes] = useState(defaultNotes);
  const [column, setColumn] = useState(0);

  useEffect(() => {
    const tickMs = 80;

    let interval = setInterval(() => {
      setColumn((column + 1) % 16)
    }, tickMs)

    var ctx = new AudioContext();

    notes.forEach((row, index) => {
      if(notes[index][column]) {
        var o = ctx.createOscillator();
        o.frequency.value = scale[column];
        o.start(0);
        o.stop(tickMs / 1000);
        o.connect(ctx.destination);
      }
    })

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
    toggleCell(index, jndex)
  }}></div>)
}


export default App;
