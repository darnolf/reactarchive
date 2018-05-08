import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (user, role, displayName) => ({
  type: 'LOGIN',
  user,
  role,
  displayName
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider).then((result) => {
      console.log(result.refreshToken)
    }).catch((error) => console.log(`Error ${error.code}: ${error.message}`));
  };
};

export const startCredLogin = (email, password) => {
  return () => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
      const token = result.refreshToken;
      localStorage.setItem('jwtToken', token)
      console.log(result)
    }).catch(e => console.log(e.message))
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
