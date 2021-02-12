import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Dashboard.scss';
import { addDatatoAPI } from '../../../config/redux/action';

class Dashboard extends Component{
    state = {
        title: '',
        content: '',
        date: ''
    }
    handleSaveNotes = () => {
        // alert('Notes Created');
        const {title, content} = this.state;
        const {saveNotes} = this.props // {destructing} === this.props.saveNotes
        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: this.props.userData.uid
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
                    <p className="title">Title</p>
                    <p className="date">12 Feb 2021</p>
                    <p className="content">Content Notes</p>
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    userData: state.user
})

const reduxDispatch = (dispatch) => ({
    saveNotes : (data) => dispatch(addDatatoAPI(data))
})

export default connect(reduxState, reduxDispatch) (Dashboard);