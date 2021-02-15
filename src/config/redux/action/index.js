import firebase, {database} from '../../firebase';


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
                // console.log('success: ', user);
    
                //data object
                const dataUser = {
                    email: user.email,
                    uid: user.uid,
                    emailVerified: user.emailVerified,
                    refreshToken: user.refreshToken
                }
                dispatch({type: 'CHANGE_LOADING', value: false})
                dispatch({type: 'CHANGE_ISLOGIN', value: true})
                dispatch({type: 'CHANGE_USER', value: dataUser})
                resolve(dataUser)
    
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

export const addDatatoAPI = (data) => (dispatch) => {
    database.ref('notes/' + data.userId).push({
        title: data.title,
        content: data.content,
        date: data.date
    })
}

export const getDataFromAPI = (userId) => (dispatch) => {
    const urlNotes = database.ref('notes/' + userId);
    return new Promise((resolve, reject) => {
        urlNotes.on('value', (snapshot) => {
            const data = snapshot.val();
            // urlNotes(postElement, data);
            console.log('Get Data: ', data);
            const dataArr = [];
            // change object to array
            Object.keys(data).map( key => {
                dataArr.push({
                    id: key,
                    data: data[key]
                })
            }); 

            dispatch({type: 'SET_NOTES', value: dataArr})
            resolve(data);
        });
    })

}
export const updateDataAPI = (data) => (dispatch) => {
    const urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
    return new Promise((resolve, reject) => {
        urlNotes.set({
            title: data.title,
            content: data.content,
            date: data.date
        }, (err) => {
            if(err){
                reject(false);
            } else {
                resolve(true);
            }
        });
    })

}