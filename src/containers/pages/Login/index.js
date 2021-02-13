import React, {Component} from 'react';
import {connect} from 'react-redux';
import { loginUserAPI } from '../../../config/redux/action';
import Button from '../../../components/atoms/Button';


class Login extends Component{

    state ={
        email: '',
        password: '',
    }
    handleChangeText = (element) => {
        // console.log(element.target.id)
        this.setState({
            [element.target.id]: element.target.value, //cara dynamic
        })
    }

    handleLoginSubmit = async () => {
        // console.log('email: ', this.state.email)
        // console.log('password: ', this.state.password)
        const {email, password} = this.state;
        const {history} = this.props;

        console.log('data before send: ', email, password)
        const res = await this.props.loginAPI({email, password}).catch(err => err);
        if(res){
            console.log('login success', res);
            // local storage
            localStorage.setItem('userData', JSON.stringify(res))
            this.setState({
                email: '',
                password: ''
            })
            history.push('/');  

        }else{
            console.log('login failed');
        }
    }
    changeUser = () => {
        this.props.changeUserName()
    }
    render(){
        return(
            <div className="auth-container">
                <div className="auth-card">
                <p className="auth-title">Login Page</p>
                <input className="input" id="email" placeholder="Email" type="text" onChange={this.handleChangeText} value={this.state.email}/>
                <input className="input" id="password" placeholder="Password" type="password" onChange={this.handleChangeText} value={this.state.password}/>
                <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading}/>
                </div>
                {/* <button>Go to Dashboard</button> */}
            </div>
        )
    }
}


const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(loginUserAPI(data))
})

export default connect(reduxState, reduxDispatch) (Login);