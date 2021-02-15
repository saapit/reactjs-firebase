import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import './Dashboard.scss';
import { addDatatoAPI, getDataFromAPI, updateDataAPI } from '../../../config/redux/action';

class Dashboard extends Component{
    state = {
        title: '',
        content: '',
        date: '',
        textButton: 'SAVE',
        noteID: ''
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
        } else {
            data.noteId = noteId;
            updateNotes(data)
        }

        saveNotes(data) //apply from {destructing}
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


    render(){
        const {title, content, textButton} = this.state;
        const {notes} = this.props;
        const {updateNotes, cancelUpdate} = this;
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
})

export default connect(reduxState, reduxDispatch) (Dashboard);