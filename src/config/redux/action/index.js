import firebase from '../../firebase';

export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({type: 'CHANGE_USER', value: 'Sapit Syther'})
    }, 2000);
}

export const registerUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: 'CHANGE_LOADING', value: true})
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log('success: ', user);
            dispatch({type: 'CHANGE_LOADING', value: false})
            resolve(true);
            
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            dispatch({type: 'CHANGE_LOADING', value: true})
            reject(false);
            
        })
    })
}

export const loginUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: 'CHANGE_LOADING', value: true})
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                console.log('success: ', user);
    
                //data object
                const dataUser = {
                    email: user.email,
                    uid: user.uid,
                    emailVerified: user.emailVerified
                }
                dispatch({type: 'CHANGE_LOADING', value: false})
                dispatch({type: 'CHANGE_ISLOGIN', value: true})
                dispatch({type: 'CHANGE_USER', value: dataUser})
                resolve(true)
    
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
                dispatch({type: 'CHANGE_LOADING', value: true})
                dispatch({type: 'CHANGE_ISLOGIN', value: false})
                reject(false)
            })
    })
}