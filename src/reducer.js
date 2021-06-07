// initial state before adding any data
// which means user is not logged in
export const initialState = {
  user: null,
};

// actions are certain action which can be performed, here set_user is
// to set user or push users data
export const actionTypes = {
  SET_USER: "SET_USER",
};

// performing operations based on actions given.
const reducer = (state, action) => {
  //   console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      // returning the changed state / after operation state.
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
