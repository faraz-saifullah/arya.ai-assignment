import React, { Component, Fragment } from "react";
import withContext from "../../withContext";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";
import { validateRegisterInput } from "./Validation";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmPassword: "",
      password: "",
      email: "",
      username: "",
      error: "",
    };
  }

  createCognitoUser = async (username, email, password) => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email: email,
        },
      });
    } catch (err) {
      return err;
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateRegisterInput(this.state);
    this.setState({
      error: validationError,
    });
    const { username, email, password } = this.state;
    try {
      if (!validationError) {
        this.createCognitoUser(username, email, password).then(() => {
          alert(
            "User created successfully!\nPlease check your email for confirmation link and then Log In!"
          );
        });
        this.props.history.push("/login");
      }
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }
  };

  onFormInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    return !this.props.context.user ? (
      <Fragment>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Register</h4>
          </div>
        </div>
        <br />
        <br />
        <center>
          <form onSubmit={this.handleSubmit}>
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                value={this.state.username}
                onChange={this.onFormInputChange}
                id="username"
              />
            </FormControl>
            <br />
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                value={this.state.email}
                onChange={this.onFormInputChange}
                id="email"
              />
            </FormControl>
            <br />
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                value={this.state.password}
                onChange={this.onFormInputChange}
                id="password"
                type="password"
              />
            </FormControl>
            <br />
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <Input
                value={this.state.confirmPassword}
                onChange={this.onFormInputChange}
                id="confirmPassword"
                type="password"
              />
            </FormControl>
            <br />
            {this.state.error && (
              <div className="has-text-danger">{this.state.error}</div>
            )}
            <br />
            <button type="submit" className="button is-primary is-medium">
              Register
            </button>
          </form>
        </center>
      </Fragment>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default withContext(Register);
