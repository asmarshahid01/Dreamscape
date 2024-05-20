const initialState = {
    likes: 0,
    dislikes: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_LIKES':
        return { ...state, likes: action.payload.likes, dislikes: action.payload.dislikes };
      default:
        return state;
    }
  };
  
  export default reducer;