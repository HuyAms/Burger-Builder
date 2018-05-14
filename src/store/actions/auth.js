import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCiceZFCwXVkueRhM0ulEU_1tHa8TIEEDw';
    if (!isSignUp) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCiceZFCwXVkueRhM0ulEU_1tHa8TIEEDw';
    }
    axios.post(url,
        authData).then(response => {
      console.log(response);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
    }).catch(err => {
      console.log(err);
      dispatch(authFailed(err));
    });
  };
};