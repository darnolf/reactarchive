export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.user.uid,
        displayName: action.displayName,
        role: action.role,           
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
