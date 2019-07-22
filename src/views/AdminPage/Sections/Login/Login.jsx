import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Notification from "components/Notifications/Notifications.jsx";
// style
import loginStyle from "assets/jss/material-kit-react/views/componentsSections/loginStyle.jsx";
// queries and mutations
import { Mutation } from "react-apollo";
import { LOGIN } from "../../../../mutations/login";

import decode from "jwt-decode";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {},
      errorList: []
    };
    this.clearErrorList = this.clearErrorList.bind(this);
  }

  onSubmit = async (e, weblogin, data) => {
    const { username, password } = this.state;
    const response = await weblogin({
      variables: {
        username,
        password
      }
    });
    const { ok, token, refreshToken, errors } = response.data.weblogin;
    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      this.props.history.push("/parkeo/admin-page");
      window.location.reload();
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState({ errors: err });
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentWillMount() {
    let token = localStorage.getItem("token");
    if (token !== null) {
      token = decode(token);
      const { username } = token.user;
      if (username === "admin" || username === "superadmin") {
        window.location.reload();
        this.props.history.push("/parkeo/admin-page");
      }
    }
  }

  clearErrorList() {
    this.setState({ username: "", password: "", errors: {}, errorList: [] });
  }

  render() {
    const { classes } = this.props;
    const {
      errors: { usernameError, passwordError }
    } = this.state;
    const { errorList } = this.state;
    if (usernameError) {
      errorList[0] = usernameError;
    }
    if (passwordError) {
      errorList[0] = passwordError;
    }
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Acceso</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      error={!!usernameError}
                      labelText="User..."
                      id="username"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "username",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                      onChange={this.onChange}
                      name="username"
                    />
                    <CustomInput
                      error={!!passwordError}
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                      onChange={this.onChange}
                      name="password"
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Mutation mutation={LOGIN}>
                      {(weblogin, { data }) => (
                        <Button
                          simple
                          color="primary"
                          size="lg"
                          onClick={e => this.onSubmit(e, weblogin, data)}
                        >
                          > Iniciar Sesión
                        </Button>
                      )}
                    </Mutation>
                  </CardFooter>
                  {errorList.length !== 0 && (
                    <Notification
                      errorList={errorList}
                      clearErrorList={this.clearErrorList}
                    />
                  )}
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(loginStyle)(Login);
