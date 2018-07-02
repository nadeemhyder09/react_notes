import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';
import Note from './Note/Note.jsx';
import NoteForm from './NoteForm/NoteForm.jsx';

class List extends Component {

  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.logout = this.logout.bind(this);
    this.app = props.app;
    this.database = this.app.database().ref().child('notes');

    // We're going to setup the React state of our component
    this.state = {
      notes: [],
    }
  }
  
  componentWillMount(){
    const previousNotes = this.state.notes;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
        // name: snap.val().name,

      })

      this.setState({
        notes: previousNotes
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })
    })

    this.database.on('child_changed', snap => {
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes[i].noteContent = snap.val().noteContent;
          // previousNotes[i].name = snap.val().name;
        }
      }

      this.setState({
        notes: previousNotes
      })
    })
  }

  addNote(note){
    this.database.push().set({ noteContent: note});
  }

  removeNote(noteId){
    this.database.child(noteId).remove();
  }

  editNote(noteId, note) {
    this.database.child(noteId).update({noteContent: note});
  }
  logout() {
    this.app.auth().signOut();
  }
  render() {
    return (
      <div className="notesWrapper">
       <button className="noteButton3" onClick={this.logout} 
          >Logout</button>
        <div className="notesHeader">
          <div className="heading">React & Firebase To-Do List</div>
        </div>
        <div className="notesBody">
          {
            this.state.notes.map((note) => {
              return (
                <Note noteContent={note.noteContent} 
                noteId={note.id} 
                key={note.id} 
                removeNote ={this.removeNote}
                editNote= {this.editNote}
                 />
              )
            })
          }
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default List;