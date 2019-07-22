import React, { Component } from "react";
// core components
import Register from "./Register";


class Index extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      usernameError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      // success: false
    };
  }

  onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (e, addRegistry, data) => {
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: '',
      // success: false
    });
    const { username, email, password } = this.state;
    const response =  await addRegistry({
      variables: {
        username,
        email,
        password
      }
    });
    const { ok, errors } = response.data.addRegistry;
    if (ok) {
      // this.setState({ ["success"]: true});
      // this.props.history.push('/admin-page/employees');
    } else {
      const err = {};
      errors.forEach(({path, message}) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
  };

  render() {
    return (
      <div>
        <Register onChange={this.onChange} onSubmit={this.onSubmit} data={this.state}/>
      </div>
    );
  }
}

export default Index;
