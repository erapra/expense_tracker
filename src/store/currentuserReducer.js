const initalState = "";

export default function currentuserReducer(state = initalState, action) {
  switch (action.type) {
    case "ADD_CURRENT_USER": {
      return action.payload;
    }
    default:
      return state;
  }
}
