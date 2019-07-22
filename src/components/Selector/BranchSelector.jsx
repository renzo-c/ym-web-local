import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class SimpleSelect extends React.Component {
  handleChange = event => {
    this.props.onChange(event);
  };

  render() {
    const { classes, branches, branchId, modal } = this.props;
    return (
      <Select
        value={branchId}
        onChange={this.handleChange}
        displayEmpty
        className={classes.selectEmpty}
      >
        {(modal === "add") && (<MenuItem value="">
          <em>Seleccione una Sede</em>
        </MenuItem>)}
        {branches.map((branch, index) => {
          return (
            <MenuItem key={index} value={branch.id}>
              {branch.branch}
            </MenuItem>
          );
        })}
      </Select>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSelect);
