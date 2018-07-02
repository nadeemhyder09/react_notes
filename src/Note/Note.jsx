import React, {Component} from 'react';
import './Note.css';
import propTypes from 'prop-types';

class Note extends Component {
  constructor(props) {
    super(props);
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
    this.state = {
      isEditing: false,
      content: '',
      isExpanded: false
    }
    this.renderForm = this.renderForm.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.toggleState1 = this.toggleState1.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  handleContentChange = (evt) => {
    this.setState({ content: evt.target.value });
  }

  handleRemoveNote(id) {
    this.props.removeNote(id);
  }

  classToggle() {
    const {isExpanded} = this.state;
    this.setState({
      isExpanded: true
    })
  }

  classToggle1() {
    const {isExpanded} = this.state;
    this.setState({
      isExpanded: false
    })
  }


  toggleState() {
    const {isEditing} = this.state;
    this.setState({
      isEditing: !isEditing,
      content: '',
    })
  }

    toggleState1() {
    const {isEditing} = this.state;
    this.setState({
      isEditing: false,
      content: '',
    })
  }

  updateItem(id, e) {
    this.props.editNote(id, this.input.value);
    this.toggleState();
  }

  render(props) {
    const {isEditing, content} = this.state;
    
    const enabled = content.length > 0 
    return(
      isEditing ? this.renderForm(enabled) : this.renderItem()
      // isExpanded ? this.classToggle() : this.classToggle1
    )
  }

  renderForm(enabled) {
    return(
        <div className="note">
          <input type="text" ref={(value) => { this.input = value }} 
            defaultValue={this.props.noteContent} className= "noteInput1" 
            onChange={this.handleContentChange}/>
          <button type="submit" className="noteButton1" 
            onClick={() => this.updateItem(this.noteId)}
            disabled={!enabled} >Update
          </button>
          <button type="submit" className="noteButton1" onClick={() => this.toggleState1()}
            >Cancel
          </button>
        </div>
    )
  }

  renderItem() {
    const {isExpanded} = this.state;
    return(
       <div className="note fade-in">
          <span className="closebtn" onClick={() => this.handleRemoveNote(this.noteId)}>&#10005;</span>
          <span className="eidtbtn" onClick={() => this.toggleState()}>&#x270E;</span>
           <span 
             className={`eidtbtn ${isExpanded ? 'hidden' : ''}`} 
             onClick={() => this.classToggle()}>&#10004;
           </span>
            <span 
              className={`eidtbtn ${!isExpanded ? 'hidden' : ''}`} 
              onClick={() => this.classToggle1()}>&#x238C;
            </span>
          <p className={`noteContent ${isExpanded ? 'line' : ''}`}>
            {this.props.noteContent},
            {/*{this.name}*/}
          </p>
        </div>
    )
  }
}
Note.propTypes = {
  noteContent: propTypes.string
}

export default Note;
