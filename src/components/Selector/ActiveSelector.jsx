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
    const { classes, active, modal} = this.props;
    return (
      <Select
        value={active}
        onChange={this.handleChange}
        displayEmpty
        className={classes.selectEmpty}
        name="active"
      >
        {(modal === "add") && (<MenuItem value="">
          <em>Seleccione un Estado</em>
        </MenuItem>)}
        <MenuItem value={true}>Activo</MenuItem>
        <MenuItem value={false}>Inactivo</MenuItem>
      </Select>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSelect);
