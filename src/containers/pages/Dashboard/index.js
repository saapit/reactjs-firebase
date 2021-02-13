import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import './Dashboard.scss';
import { addDatatoAPI, getDataFromAPI } from '../../../config/redux/action';

class Dashboard extends Component{
    state = {
        title: '',
        content: '',
        date: ''
    }

    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.props.getNotes(userData.uid); // return {object}
    }
    
    handleSaveNotes = () => {
        // alert('Notes Created');
        const {title, content} = this.state;
        const {saveNotes} = this.props // {destructing} === this.props.saveNotes
        const userData = JSON.parse(localStorage.getItem('userData'));


        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }

        saveNotes(data) //apply from {destructing}
        console.log(data);
    }

    onInputChange = (element, type) => {
        this.setState({
            [type] : element.target.value
        })
    }


    render(){
        const {title, content, date} = this.state;
        const {notes} = this.props;
        console.log('notes: ', notes);
        console.log('check type notes: ', typeof(notes)); //check type
        return(
            <div className="container">
                <div className="input-form">
                    <input placeholder="title" className="input-title" value={title} onChange={(e) => this.onInputChange(e, 'title')}></input>
                    <textarea placeholder="content" className="input-content" value={content} onChange={(e) => this.onInputChange(e, 'content')}>

                    </textarea>
                    <button className="save-btn" onClick={this.handleSaveNotes}>Save</button>
                </div>
                <hr/>
               
                <div className="card-content">
                                            <p className="title">INI Default</p>
                                            <p className="date">date</p>
                                            <p className="content">content</p>
                                        </div>
                {
                    //ternary operator
                    1 > 0 ? (
                        //  console.log('hi')
                        <Fragment>
                        {
                                notes.map(note => {
                                    return (
                                        <div className="card-content" key={note.id} >
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
    getNotes : (data) => dispatch(getDataFromAPI(data))
})

export default connect(reduxState, reduxDispatch) (Dashboard);