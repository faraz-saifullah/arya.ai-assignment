import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/auth/Login";
import { Auth } from "aws-amplify";
import Context from "./Context";
import Navbar from "./components/navbar/Navbar";
import Register from "./components/auth/Register";
import User from "./components/user/User";
import Chart from "./components/chart/chart";

export default class App extends Component {
  constructor(props) {
    super(props);
    //Initial state of the application
    this.state = {
      user: null,
    };

    this.routerRef = React.createRef();
  }

  //When user logs in the user object of application's state is set
  login = (user) => {
    if (user) {
      this.setState({ user });
    }
  };

  //When user logs out the cart is cleared and
  //user is redirected to main landing page
  logout = (event) => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.setState({ user: null });
      this.routerRef.current.history.push("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

  //Load products fromm database on Component Mount
  //Also if any user was authenticated get his details
  //Update user and product details after finishing the async call
  async componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        if (user) this.setState({ user: user });
      })
      .catch(() => {
        this.setState({
          user: null,
        });
      });
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          login: this.login,
          logout: this.logout,
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={User} />
              <Route exact path="/chart" component={Chart} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
