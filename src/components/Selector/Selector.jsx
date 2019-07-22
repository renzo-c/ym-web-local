import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// Helper functions
import { dbDateTimeToView } from "assets/helperFunctions/index.js";


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
  constructor(props) {
    super(props);
    this.state = {
      selection: {
        branch: "x",
        serviceShift: "x"
      },
      branches: null,
      branch: null,
      serviceShifts: null
    };
  }

  componentWillMount() {
    const { branches, serviceShifts } = this.props;
    this.setState({ branches, serviceShifts });
  }

  handleChange = event => {
    event.preventDefault();
    let selection = this.state.selection;
    selection[event.target.name] = event.target.value;
    this.setState({ selection });
    const branchId = this.state.selection.branch;
    const serviceshiftId = this.state.selection.serviceShift;
    this.props.onFilterChanged(branchId, serviceshiftId);
  };

  render() {
    const { classes } = this.props;
    const { branches, serviceShifts } = this.state;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="branch-simple">Sede</InputLabel>
          <Select
            value={this.state.selection.branch}
            onChange={this.handleChange}
            inputProps={{
              name: "branch",
              id: "branch-simple"
            }}
          >
            <MenuItem value="x">
              <em>Todas</em>
            </MenuItem>
            {branches.map((branch, index) => (
              <MenuItem key={index} value={branch.id}>
                {branch.branch}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Filtrar por Sede</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="serviceShift-simple">Horario</InputLabel>
          <Select
            value={this.state.selection.serviceShift}
            onChange={this.handleChange}
            inputProps={{
              name: "serviceShift",
              id: "serviceShift-simple"
            }}
          >
            <MenuItem value="x">
              <em>Todos</em>
            </MenuItem>
            {serviceShifts.map((serviceshift, index) => (
              <MenuItem key={index} value={serviceshift.id}>
                {dbDateTimeToView(serviceshift.begindate).dateTime}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Filtrar por Horario</FormHelperText>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSelect);
