import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import ExpenseTransaction from "./pages/expenseTransaction";
import PrivateRoute from "./components/privateRoute";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <PrivateRoute path="/new" component={ExpenseTransaction} />
          <Route path="/" component={LoginPage} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
