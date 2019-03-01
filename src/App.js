import React, { Component, useState } from 'react';
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

  return (
    <div className="App">
      {
        notes.map((noteRow, index) => <NoteRow index={index}
                                               noteRow={noteRow}
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

const NoteRow = ({index, noteRow, toggleCell}) => {
  return (
    <div className="NodeRow">
      {
        noteRow.map((active, jndex) => <Note index={index} jndex={jndex} active={active} toggleCell={toggleCell} />)
      }
    </div>
  )
}

const Note = ({active, toggleCell, index, jndex}) => {
  let activeClass = active ? 'active' : '';

  return (<div className={`Note ${activeClass}`} onClick={() => {toggleCell(index, jndex)}}></div>)
}


export default App;
