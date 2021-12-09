import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
export default function NewTransaction() {
  const newTransaction = useRef();
  const addTransaction = useDispatch();
  const [msg, setMsg] = useState("");
  const total = useSelector((state) => state.transaction.total);
  const validate = (transType) => {
    if (newTransaction.current.value === "") {
      setMsg("Amount is Mandatory");
      return false;
    } else if (!Number(newTransaction.current.value)) {
      setMsg("Invalid Amount (Please Enter Valid Numbers)");
      return false;
    } else if (
      transType === "DR" &&
      (!total || total - newTransaction.current.value < 0)
    ) {
      setMsg("Insufficient Balance");
      return false;
    }

    return true;
  };

  const AddAmount = (event) => {
    event.preventDefault();

    if (!validate("CR")) {
      return false;
    }

    setMsg("");
    addTransaction({
      type: "CREATE_TRANSACTION",
      payload: {
        amount: newTransaction.current.value,
        date: Date(),
        type: "CR",
      },
    });

    newTransaction.current.value = "";
  };

  const subAmount = (event) => {
    event.preventDefault();

    if (!validate("DR")) {
      return;
    }

    setMsg("");
    addTransaction({
      type: "CREATE_TRANSACTION",
      payload: {
        amount: newTransaction.current.value,
        date: Date(),
        type: "DR",
      },
    });

    newTransaction.current.value = "";
  };

  return (
    <React.Fragment>
      <form className="form-inline">
        <div className="form-group mx-sm-3 mb-2 ">
          <input
            type="text"
            className="form-control"
            id="inputTransaction"
            placeholder="New Transaction"
            ref={newTransaction}
          />

          {msg ? <small className="form-text text-muted">{msg}</small> : ""}
        </div>
        <button
          style={{ margin: "5px" }}
          type="submit"
          className="btn btn-primary mb-2"
          onClick={AddAmount}
        >
          Confirm to Credit
        </button>
        <button
          style={{ margin: "5px" }}
          type="submit"
          className="btn btn-primary mb-2"
          onClick={subAmount}
        >
          Confirm to Debit
        </button>
      </form>
    </React.Fragment>
  );
}
