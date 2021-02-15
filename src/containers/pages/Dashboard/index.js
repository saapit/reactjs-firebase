import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import './Dashboard.scss';
import { addDatatoAPI, getDataFromAPI, updateDataAPI, deleteDataAPI } from '../../../config/redux/action';

class Dashboard extends Component{
    state = {
        title: '',
        content: '',
        date: '',
        textButton: 'SAVE',
        noteId: ''
    }

    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.props.getNotes(userData.uid); // return {object}
    }
    
    handleSaveNotes = () => {
        // alert('Notes Created');
        const {title, content, textButton, noteId} = this.state;
        const {saveNotes, updateNotes} = this.props // {destructing} === this.props.saveNotes
        const userData = JSON.parse(localStorage.getItem('userData'));


        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }

        if(textButton === 'SAVE'){
            saveNotes(data)
        } else { //kalau textButton === 'UPDATE
            data.noteId = noteId;
            updateNotes(data)
        }

        console.log(data);
    }

    onInputChange = (element, type) => {
        this.setState({
            [type] : element.target.value
        })
    }

    updateNotes = (note) => {
        console.log(note);
        this.setState({
            title : note.data.title,
            content: note.data.content,
            textButton: 'UPDATE',
            noteId: note.id
        })
    }

    cancelUpdate = () => {
        this.setState({
            title : '',
            content: '',
            textButton: 'SAVE'
        })
    }

    deleteNote = (e, note) => {
        e.stopPropagation(); // hanya child akan aktiv, parent tak (stop-click)
        const {deleteNote} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'));
        const data = {
            userId: userData.uid,
            noteId: note.id,
        }
        // alert('You want to delete this note?');
        deleteNote(data);
    }
 

    render(){
        const {title, content, textButton} = this.state;
        const {notes} = this.props;
        const {updateNotes, cancelUpdate, deleteNote} = this;
        console.log('notes: ', notes);
        console.log('check type notes: ', typeof(notes)); //check type
        return(
            <div className="container">
                <div className="input-form">
                    <input placeholder="title" className="input-title" value={title} onChange={(e) => this.onInputChange(e, 'title')}></input>
                    <textarea placeholder="content" className="input-content" value={content} onChange={(e) => this.onInputChange(e, 'content')}>

                    </textarea>
                    <div className="action-wrapper">
                        {
                            textButton === 'UPDATE' ? (
                                <button className="save-btn cancel" onClick={cancelUpdate}>Cancel</button>
                            ) : <div/>
                        }
                    <button className="save-btn" onClick={this.handleSaveNotes}>{textButton}</button>
                    </div>
                </div>
                <hr/>
                {
                    //ternary operator
                    1 > 0 ? (
                        //  console.log('hi')
                        <Fragment>
                        {
                                notes.map(note => {
                                    return (
                                        <div className="card-content" key={note.id} onClick={() => updateNotes(note)} >
                                            <p className="title">{note.data.title}</p>
                                            <p className="date">{note.data.date}</p>
                                            <p className="content">{note.data.content}</p>
                                            <div className="delete-btn" onClick={(e) => { if (window.confirm('Are you sure want to delete this?')) deleteNote(e, note)}}>X</div>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) : console.log('fail', notes.length)
                }
                </div>
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes : (data) => dispatch(addDatatoAPI(data)),
    getNotes : (data) => dispatch(getDataFromAPI(data)),
    updateNotes : (data) => dispatch(updateDataAPI(data)),
    deleteNote : (data) => dispatch(deleteDataAPI(data)),
})

export default connect(reduxState, reduxDispatch) (Dashboard);