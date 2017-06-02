import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateNote, deleteNote } from '../actions/notes';

class Note extends Component {
  state = { edit: false }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  }

  deleteNote = () => {
    let { dispatch, note, history } = this.props;
    dispatch(deleteNote(note._id));
    history.push('/notes');
  }

  update = (e) => {
   e.preventDefault();
   let { title, body, props: { dispatch, note: { _id }}} = this;
   dispatch(updateNote(_id, title.value, body.value))
   this.toggleEdit();
 }

 edit = () => {
   let { note: { _id, title, body }} = this.props;
   return (
     <div className="container">
       <div className="center">
         <form ref={ n => this.form = n } onSubmit={this.update}>
           <input ref={ n => this.title = n } defaultValue={title} />
           <textarea ref={ n => this.body = n } defaultValue={body}></textarea>
           <div className="row">
             <button
               type="button"
               onClick={this.toggleEdit}
               className="btn grey col m3"
             >
               Cancel
             </button>
             <button className="btn col m3">Save</button>
           </div>
         </form>
       </div>
     </div>
   )
 }

 show = () => {
   return (
       <div className="container">
         <h4 className="center">{this.title}</h4>
         <span className="grey-text">{`Created: ${this.createdAt}`}</span>
         <br />
         <span className="grey-text">{`Updated: ${this.updatedAt}`}</span>
         <p>{this.body}</p>
         <div style={{ cursor: 'pointer' }}>
           <i className="blue-text material-icons" onClick={this.toggleEdit}>edit</i>
           <i className="red-text material-icons" onClick={this.deleteNote}>delete</i>
         </div>
       </div>
     )
   }



 render() {
   return this.state.edit ? this.edit() : this.show()
 }

  // render() {
  //   let { note: { title, body, updatedAt, createdAt }} = this.props;
  //   // TODO: check if this.state.edit is true
  //   // if it is render a edit form
  //   //once the form is submitted dispatch the editNote action
  //   // reset component edit state to false - call this.toggleEdit();
  //   return (
  //     <div className="container">
  //       <h4 className="center">{title}</h4>
  //       <span className="grey-text">{`Created: ${createdAt}`}</span>
  //       <br />
  //       <span className="grey-text">{`Updated: ${updatedAt}`}</span>
  //       <p>{body}</p>
  //       <div style={{ cursor: 'pointer' }}>
  //         <i className="blue-text material-icons" onClick={this.toggleEdit}>edit</i>
  //         <i className="red-text material-icons" onClick={this.deleteNote}>delete</i>
  //       </div>
  //     </div>
  //   )
  // }
}

const mapStateToProps = (state, props) => {
  return { note: state.notes.find( n => n._id === props.match.params.id) || {} }
}

export default connect(mapStateToProps)(Note);
