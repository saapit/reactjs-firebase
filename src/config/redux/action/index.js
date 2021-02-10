import firebase from '../../firebase';

export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({type: 'CHANGE_USER', value: 'Sapit Syther'})
    }, 2000);
}

export const registerUserAPI = (data) => (dispatch) => {
    dispatch({type: 'CHANGE_LOADING', value: true})
    return(
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log('success: ', user);
    dispatch({type: 'CHANGE_LOADING', value: false})

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            dispatch({type: 'CHANGE_LOADING', value: true})

        })
    )
}