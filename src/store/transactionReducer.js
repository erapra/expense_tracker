const initalState = { transaction: [], total: 0 };

export default function TransactionReducer(state = initalState, action) {
  switch (action.type) {
    case "ADD_TRANSACTION": {
      if (!!state?.transaction?.length) {
        const newState = {
          transaction: [...state?.transaction],
          total: state?.total,
        };
        newState.transaction.push(action.payload);
        let total =
          action.payload.type === "CR"
            ? parseFloat(newState.total) + parseFloat(action.payload.amount)
            : parseFloat(newState.total) - parseFloat(action.payload.amount);
        newState.total = total;
        return newState;
      } else {
        const newState = {
          transaction: [],
          total: 0,
        };
        newState.transaction.push(action.payload);
        let total =
          action.payload.type === "CR"
            ? parseFloat(newState.total) + parseFloat(action.payload.amount)
            : parseFloat(newState.total) - parseFloat(action.payload.amount);
        newState.total = total;
        return newState;
      }
    }
    default:
      return state;
  }
}
