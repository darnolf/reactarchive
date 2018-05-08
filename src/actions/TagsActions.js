import database from '../firebase/firebase';
export const FETCH_TAGS = 'FETCH_TAGS';
export const FETCH_BYTAG = 'FETCH_BYTAG';

export function getTags() {
  return dispatch => {
    database.ref('tags').on('value', snapshot => {
      dispatch({
        type: FETCH_TAGS,
        payload: snapshot.val()
      })
    })
  }  
}


// export const getTags = () => {
//   return (dispatch, getState) => {
//     return database.ref(`tags`).once('value').then((snapshot) => {
//       const tags = [snapshot];
//       snapshot.forEach((childSnapshot) => {
//         tags.push({
//           ...childSnapshot.val()
//         });
//       });
//       dispatch({
//         type: FETCH_TAGS,
//         payload: tags
//       })
//     });
//   };
//   };

export function saveTag(tag) {
  return dispatch => database.ref('tags').push(tag)
}


export function deleteTag(id) {
  return dispatch => database.ref('tags').child(id).remove();
}

// export function fetchRecordsByTag(year, tag) {
//   return dispatch => {
//       database.ref(`data/${year}/`).orderByChild(`tags/${tag}`).equalTo(true).on('value', snapshot => {
//           console.log('passed Year: ', tag)
//           console.log('Fetch Records: ', snapshot.val())
//           dispatch({
//               type: 'FETCH_BYTAG',
//               payload: snapshot.val()
//           })
//       })
//   }
// }

// export const fetchByTag = (year, tag) => ({
//   type: 'FETCH_BYTAG',
//   payload: 'tag'

// });





  