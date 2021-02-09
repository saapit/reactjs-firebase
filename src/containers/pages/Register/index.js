import React, {Component} from 'react';
import './Register.scss';
import firebase from '../../../config/firebase';

class Register extends Component{
    state ={
        email: '',
        password: ''
    }
    handleChangeText = (element) => {
        // console.log(element.target.id)
        this.setState({
            [element.target.id]: element.target.value, //cara dynamic
        })
    }

    handleRegisterSubmit = () => {
        // console.log('email: ', this.state.email)
        // console.log('password: ', this.state.password)
        const {email, password} = this.state;
        console.log('data before send: ', email, password)

        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log('success: ', user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

    render(){
        return(
            <div className="auth-container">
                <div className="auth-card">
                <p className="auth-title">Register Page</p>
                <input className="input" id="email" placeholder="Email" type="text" onChange={this.handleChangeText}/>
                <input className="input" id="password" placeholder="Password" type="password" onChange={this.handleChangeText}/>
                <button className="btn" onClick={this.handleRegisterSubmit}>Register</button>
                </div>
                {/* <button>Go to Dashboard</button> */}
            </div>
        )
    }
}

export default Register;