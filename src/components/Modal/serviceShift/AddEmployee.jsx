import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
// customized components
import AddRmvEmployees from "components/CustomBox/AddRmvEmployees.jsx";
//react-router
import { withRouter } from "react-router-dom";
// Helper functions
import { getEmployeeName } from "assets/helperFunctions/index.js";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class AddEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      serviceShift: this.props.serviceShift,
      employees: this.props.employees,
      employee: "",
      employeeToDelete: ""
    };
    this.handleEmployeeSelected = this.handleEmployeeSelected.bind(this);
    this.updateEmployeeInServiceShift = this.updateEmployeeInServiceShift.bind(
      this
    );
    this.handleEmployeeToDelete = this.handleEmployeeToDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.filterDisabledEmployees = this.filterDisabledEmployees.bind(this);
  }

  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  handleEmployeeSelected(e) {
    e.preventDefault();
    let employee = this.state.employees.filter(employee => {
      return employee.id === e.target.value;
    });
    employee = employee[0];
    this.setState({ employee });
  }
  handleSave(addEmployeeToServiceShift, id) {
    let employee = getEmployeeName(id, this.state.employees);
    addEmployeeToServiceShift({
      variables: { id: this.state.serviceShift.id, employeeId: id }
    }).then(() => alert(`Empleado ${employee.user} agregado`));
  }
  updateEmployeeInServiceShift(deleteEmployeeFromServiceShift, id) {
    let employee = getEmployeeName(id, this.state.employees);
    deleteEmployeeFromServiceShift({
      variables: { id: this.state.serviceShift.id, employeeId: id }
    }).then(() => alert(`Empleado ${employee.user} desvinculado`));
  }
  handleEmployeeToDelete(e) {
    e.preventDefault();
    let employeeToDelete = this.state.employees.filter(employee => {
      return employee.id === e.target.value;
    });
    employeeToDelete = employeeToDelete[0];
    this.setState({ employeeToDelete });
  }

  filterDisabledEmployees(employees, serviceShift) {
    let assignedEmployees = [];
    let allowedEmployees = [];
    serviceShift.employees.map(emp => assignedEmployees.push(emp.user));
    allowedEmployees = employees.filter(
      employee =>
        employee.active === true ||
        (employee.active === false &&
          assignedEmployees.indexOf(employee.user) !== -1)
    );
    return allowedEmployees;
  }

  render() {
    const { classes, serviceShift } = this.props;
    const filler = "lorem".repeat(8);
    return (
      <div>
        <Tooltip title="Agregar Empleado">
          <div>
            <IconButton
              aria-label="Agregar Empleado"
              onClick={() => this.handleClickOpen("classicModal")}
              disabled={!serviceShift.active}
            >
              <i className={"material-icons"}>group_add</i>
            </IconButton>
          </div>
        </Tooltip>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6} lg={4}>
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={this.state.classicModal}
                  TransitionComponent={Transition}
                  disableBackdropClick={true}
                  disableEscapeKeyDown={true}
                  keepMounted
                  onClose={() => this.handleClose("classicModal")}
                  aria-labelledby="classic-modal-slide-title"
                  aria-describedby="classic-modal-slide-description"
                >
                  <span style={{ opacity: "0" }}>{filler}</span>
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                  >
                    <IconButton
                      className={classes.modalCloseButton}
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      onClick={() => this.handleClose("classicModal")}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                    <h4 className={classes.modalTitle}>
                      Añadir empleado a horario
                    </h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <div className={classes.overflow}>
                      <AddRmvEmployees
                        employees={this.filterDisabledEmployees(
                          this.props.employees,
                          this.props.serviceShift
                        )}
                        handleSave={this.handleSave}
                        handleDelete={this.updateEmployeeInServiceShift}
                        serviceShift={this.state.serviceShift}
                      />
                    </div>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Button
                      onClick={() => this.handleClose("classicModal")}
                      color="danger"
                      simple
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withRouter(withStyles(javascriptStyles)(AddEmployee));
