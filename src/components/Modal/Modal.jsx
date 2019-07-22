import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "../CustomInput/CustomInput.jsx";
import Badge from "../Badge/Badge.jsx";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
// queries and mutations with react-apollo
import { Mutation } from "react-apollo";
import { NEW_EMPLOYEE } from "../../mutations/employee.js";
import { GET_EMPLOYEES } from "../../queries/employee";
//react-router
import { withRouter } from "react-router-dom";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      employee: this.props.employee? this.props.employee : {
        firstname: "",
        lastname: "",
        dni: "",
        user: "",
        phone: "",
        password: "",
        active: ""
      }
    };
    this.updateEmployeeState = this.updateEmployeeState.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.resetForm = this.resetForm.bind(this);
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
    this.resetForm();
  }

  resetForm() {
    this.setState({
      employee: {
        firstname: "",
        lastname: "",
        dni: "",
        user: "",
        phone: "",
        password: "",
        active: ""
      }
    });
  }

  updateEmployeeState(event) {
    if (this.props.employee === undefined) {
      const field = event.target.name;
      const employee = this.state.employee;
      employee[field] = event.target.value;
      return this.setState({ employee });
    }
  }

  saveEmployee(event) {
    this.handleClose("classicModal");
    this.resetForm();
    this.props.history.push("/admin-page/employees");
  }

  componentDidMount() {
    if (this.props.employee) {
      this.setState({ employee: this.props.employee });
    }
  }

  render() {
    let title = "";
    let modalLayout = "";
    let employee = "";
    if (this.props.modalType === "new") {
      title = "Nuevo Empleado";
      modalLayout = <Button color="info">+ Crear</Button>;
    } else if (this.props.modalType === "display") {
      title = "Mostrar Empleado";
      modalLayout = (
        <Badge color="info">
          <i className="material-icons">person</i>
        </Badge>
      );
      employee = this.props.employee;
    } else if (this.props.modalType === "edit") {
      title = "Editar Empleado";
      modalLayout = (
        <Badge color="success">
          <i className="material-icons">edit</i>
        </Badge>
      );
    }

    const { classes } = this.props;

    return (
      <div>
        <div onClick={() => this.handleClickOpen("classicModal")}>
          {modalLayout}
        </div>
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
                    <h4 className={classes.modalTitle}>{title}</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <form>
                      <CustomInput
                        labelText="Nombre"
                        name="firstname"
                        value={employee? employee.firstname : this.state.employee.firstname}
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={this.updateEmployeeState}
                      />
                      <CustomInput
                        labelText="Apellido"
                        name="lastname"
                        value={employee? employee.lastname : this.state.employee.lastname}
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={this.updateEmployeeState}
                      />
                      <CustomInput
                        labelText="Usuario"
                        name="user"
                        value={employee? employee.user : this.state.employee.user}
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={this.updateEmployeeState}
                      />
                      {!this.props.employee && (
                        <CustomInput
                          labelText="Password"
                          name="password"
                          value={employee? employee.password : this.state.employee.password}
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={this.updateEmployeeState}
                        />
                      )}
                      <CustomInput
                        labelText="Teléfono"
                        name="phone"
                        value={employee? employee.phone : this.state.employee.phone}
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={this.updateEmployeeState}
                      />
                      <CustomInput
                        labelText="D.N.I"
                        name="dni"
                        value={employee? employee.dni : this.state.employee.dni}
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={this.updateEmployeeState}
                      />
                      <CustomInput
                        labelText="Estado"
                        name="active"
                        value={employee? employee.active : this.state.employee.active}
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={this.updateEmployeeState}
                      />
                    </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Mutation
                      mutation={NEW_EMPLOYEE}
                      update={(cache, { data: { addEmployee } }) => {
                        const { employees } = cache.readQuery({
                          query: GET_EMPLOYEES
                        });
                        cache.writeQuery({
                          query: GET_EMPLOYEES,
                          data: { employees: employees.concat([addEmployee]) }
                        });
                      }}
                    >
                      {(addEmployee, { data, loading, error }) => (
                        <div>
                          {!(this.props.modalType === "display") && (
                            <Button
                              color="transparent"
                              simple
                              onClick={e => {
                                e.preventDefault();
                                addEmployee({
                                  variables: {
                                    firstname: this.state.employee.firstname,
                                    lastname: this.state.employee.lastname,
                                    user: this.state.employee.user,
                                    password: this.state.employee.password,
                                    dni: this.state.employee.dni,
                                    phone: this.state.employee.phone,
                                    active: this.state.employee.active
                                  }
                                });
                                alert(
                                  this.state.employee.firstname +
                                    " have been added!"
                                );
                                this.saveEmployee();
                              }}
                            >
                              Guardar
                            </Button>
                          )}
                        </div>
                      )}
                    </Mutation>
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

export default withRouter(withStyles(javascriptStyles)(Modal));
