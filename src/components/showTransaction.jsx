import React from "react";
import { useSelector } from "react-redux";
export default function ShowTransaction() {
  const trans = useSelector((state) => state.transaction);

  return (
    <React.Fragment>
      <div style={{ height: "550px", width: "100%" }}>
        <div> {trans.total && `Balance : ${trans.total}`}</div>
        <div style={{ height: "500px", width: "100%", overflow: "auto" }}>
          <table
            className="table"
            style={{ background: "white", fontSize: "15px" }}
          >
            <thead style={{ background: "gray" }}>
              <tr>
                <th scope="col">Date and Time</th>
                <th scope="col">Transaction Amount</th>
                <th scope="col">Transaction Type</th>
              </tr>
            </thead>
            <tbody>
              {trans?.transaction && trans?.transaction.length > 0 ? (
                trans.transaction.reverse().map((trans, index) => {
                  return (
                    <tr key={index}>
                      <td>{trans.date}</td>
                      <td>{trans.amount}</td>
                      <td
                        style={
                          trans.type === "CR"
                            ? { color: "green" }
                            : { color: "red" }
                        }
                      >
                        {trans.type}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td> </td>
                  <td>Transaction is Empty</td>
                  <td> </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}
