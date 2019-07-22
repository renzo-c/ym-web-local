import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import decode from "jwt-decode";
import { capitalize } from "assets/helperFunctions/index.js";
import AdminModal from "../Modal/admin/AdminModal.jsx";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  superadmin: {
    height:"50px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  chip: {
    margin: theme.spacing.unit
  }
});

class Chips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleClick() {
    this.props.history.push("/parkeo/admin-page/admin");
  }
  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    alert("Sesión de administrador cerrada");
    this.props.history.push("/parkeo/admin-page/login");
  }
  componentWillMount() {
    const token = localStorage.getItem("token");
    let user = decode(token).user;
    if (token) {
      this.setState({ user });
    }
  }
  render() {
    const { classes } = this.props;
    const { username } = this.state.user;
    return username === "superadmin" ? (
      <div className={classes.superadmin}>
        <AdminModal
          username={capitalize(username)}
          handleLogout={this.handleLogout}
        />
      </div>
    ) : (
      <div className={classes.root}>
        <Chip
          label={`${capitalize(username)}`}
          onDelete={() => this.handleLogout()}
          className={classes.chip}
          icon={<i className="material-icons">account_circle</i>}
        />
      </div>
    );
  }
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Chips);
