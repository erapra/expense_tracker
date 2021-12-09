import React, { Component } from "react";
import { connect } from "react-redux";
import fetchUsersList from "../services/userListService";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      currentUser: { userId: "", password: "" },
      error: { errUserId: "", errPassword: "" },
    };
  }

  componentDidMount() {
    this.setState({
      users: fetchUsersList(),
    });
  }

  stateChanges = (event) => {
    this.setState({
      currentUser: {
        ...this.state.currentUser,
        [event.target.name]: event.target.value,
      },
    });
  };

  login = (event) => {
    event.preventDefault();

    const isValid = this.isValiduser();
    if (isValid) {
      this.props.setCurrentUser(this.state.currentUser.userId);
      this.props.history.push("/new");
    } else {
      this.props.history.replace("/");
    }
  };

  isValiduser = () => {
    if (!this.state.currentUser.userId || !this.state.currentUser.password) {
      this.setState((prevState) => {
        return {
          error: {
            errUserId: "",
            errPassword: "",
          },
        };
      });

      if (!this.state.currentUser.userId) {
        this.setState((prevState) => {
          return {
            error: {
              ...prevState.error,
              errUserId: "User ID Mandatory",
            },
          };
        });
      }
      if (!this.state.currentUser.password) {
        this.setState((prevState) => {
          return {
            error: {
              ...prevState.error,
              errPassword: "Password is Mandatory",
            },
          };
        });
      }
      return false;
    }

    const currentUser = this.state.users.filter((user) => {
      return user.userId === this.state.currentUser.userId;
    });

    if (currentUser && currentUser.length === 0) {
      this.setState({ error: { errUserId: "Invalid User ID" } });
      return false;
    } else {
      const currentValidUser = currentUser.some(
        (user) => user.password === this.state.currentUser.password
      );
      if (!currentValidUser) {
        this.setState({ error: { errPassword: "Invalid Password" } });
        return false;
      } else {
        return true;
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <form>
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-sm-12 col-md-12">
                <h2>Expense Tracker</h2>
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col-sm-12 col-md-12">
                <div className="form-group">
                  <label htmlFor="userId">User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userId"
                    name="userId"
                    placeholder="Enter user ID"
                    value={this.state.currentUser.userId}
                    onChange={this.stateChanges}
                  />
                  {this.state.error.errUserId ? (
                    <small id=" " class="form-text text-muted">
                      {this.state.error.errUserId}
                    </small>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col-sm-12 col-md-12">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.currentUser.password}
                    onChange={this.stateChanges}
                  />

                  {this.state.error.errPassword ? (
                    <small class="form-text text-muted">
                      {this.state.error.errPassword}
                    </small>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col-sm-12 col-md-12">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.login}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const mapDisPatchWithProps = (dispatch) => {
  return {
    setCurrentUser: (currentUser) =>
      dispatch({ type: "ADD_CURRENT_USER", payload: currentUser }),
  };
};

export default connect(null, mapDisPatchWithProps)(LoginPage);
