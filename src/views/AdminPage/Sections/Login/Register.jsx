import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
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
import { REGISTER } from "../../../../mutations/login";

class SectionLogin extends React.Component {
  render() {
    const { classes } = this.props;
    const { usernameError, emailError, passwordError, success } = this.props.data;
    const errorList = [];
    if (usernameError) {
      errorList.push(usernameError);
    }
    if (emailError) {
      errorList.push(emailError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Registro</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      error={!!usernameError}
                      labelText="Usuario..."
                      id="first"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                      onChange={this.props.onChange}
                      name="username"
                    />
                    <CustomInput
                      error={!!emailError}
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                      onChange={this.props.onChange}
                      name="email"
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
                      onChange={this.props.onChange}
                      name="password"
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg">
                      Iniciar Sesión
                    </Button>
                    <Mutation mutation={REGISTER}>
                      {(addRegistry, { data }) => (
                        <Button
                          simple
                          color="primary"
                          size="lg"
                          onClick={e =>
                            this.props.onSubmit(e, addRegistry, data)
                          }
                        >
                          Registrarse
                        </Button>
                      )}
                    </Mutation>
                  </CardFooter>
                  {usernameError || emailError || passwordError ? (
                    <Notification errorList={errorList}/>
                  ) : null}
                  {success ? (
                    <Notification success={success}/>
                  ) : null}
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(loginStyle)(SectionLogin);
