import React from "react";
import LogOut from "../components/logout";
import NewTransaction from "../components/newTransaction";
import ShowTransaction from "../components/showTransaction";
export default function ExpenseTransaction(props) {
  return (
    <React.Fragment>
      <LogOut {...props} />
      <NewTransaction />
      <ShowTransaction />
    </React.Fragment>
  );
}
