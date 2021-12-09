const transactionMiddleware = (store) => (next) => (action) => {
  if (action.type === "CREATE_TRANSACTION") {
    if (
      localStorage.getItem("transaction") &&
      JSON.stringify(localStorage.getItem("transaction"))
    ) {
      const transaction = JSON.parse(localStorage.getItem("transaction"));

      let total =
        action.payload.type === "ADD"
          ? parseFloat(transaction.total) + parseFloat(action.payload.amount)
          : parseFloat(transaction.total) - parseFloat(action.payload.amount);
      transaction.total = total;

      transaction.transaction.push(action.payload);
      localStorage.setItem("transaction", JSON.stringify(transaction));
    } else {
      const transaction = {};
      transaction.transaction = [action.payload];
      transaction.total = action.payload.amount;
      localStorage.setItem("transaction", JSON.stringify(transaction));
    }

    next({ type: "ADD_TRANSACTION", payload: action.payload });
  } else next(action);
};

export default transactionMiddleware;
