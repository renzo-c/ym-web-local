import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormHelperText from "@material-ui/core/FormHelperText";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "auto"
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis: 400
  }
});

class InputPassword extends React.Component {
  state = {
    showPassword: false
  };

  handleChange = prop => event => {
    this.props.onChange(event);
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes, inputProps, password } = this.props;
    return (
      <div className={classes.root}>
        <FormControl className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={this.state.showPassword ? "text" : "password"}
            value={password}
            onChange={this.handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {inputProps !== undefined
            ? inputProps.errorcomments.map((err, index) => {
                return (
                  <div>
                    <FormHelperText
                      id="name-error-text"
                      style={{color:"red"}}
                      key={index}
                    >
                      {err}
                    </FormHelperText>
                  </div>
                );
              })
            : null}
        </FormControl>
      </div>
    );
  }
}

InputPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InputPassword);
