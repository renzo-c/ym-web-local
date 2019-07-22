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
import CustomInput from "../../CustomInput/CustomInput.jsx";
// import FormControl from "@material-ui/core/FormControl";
// import FormHelperText from "@material-ui/core/FormHelperText";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
//Customized components
// import ActiveSelector from "../../Selector/ActiveSelector";
// GraphQL
import { Mutation } from "react-apollo";
import { NEW_EMPLOYEE } from "../../../mutations/employee.js";
import { GET_EMPLOYEES } from "../../../queries/employee";
// react-router
import { withRouter } from "react-router-dom";
// Helper functions
import { capitalize } from "assets/helperFunctions/index.js";
import { employeeValidation } from "assets/helperFunctions/validationEmployee.js";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const updateCacheAdd = (cache, { data: { addEmployee } }) => {
  const { employees } = cache.readQuery({ query: GET_EMPLOYEES });
  const index = addEmployee.id;
  employees[index] = addEmployee;
  cache.writeQuery({
    query: GET_EMPLOYEES,
    data: { employees: employees.concat([addEmployee]) }
  });
};

const newEmployee = {
  firstname: "",
  firstnameerror: "",
  lastname: "",
  lastnameerror: "",
  user: "",
  usererror: "",
  password: "",
  passworderror: "",
  dni: "",
  dnierror: "",
  phone: "",
  phoneerror: "",
  active: "",
  activeerror: ""
};

class EmployeeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      togglePassword: "password",
      employee: newEmployee
    };
    this.saveEmployee = this.saveEmployee.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.resetEmployeeForm = this.resetEmployeeForm.bind(this);
    this.handleChangeEmployee = this.handleChangeEmployee.bind(this);
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
    this.resetEmployeeForm();
  }

  togglePassword() {
    if (this.state.togglePassword === "password") {
      this.setState({ togglePassword: "text" });
    } else {
      this.setState({ togglePassword: "password" });
    }
  }

  handleChangeEmployee(event) {
    if (event) {
      const field = event.target.name;
      let value = event.target.value;
      let employee = this.state.employee;
      employee[field] = value;
      this.setState({ employee });
    }
  }

  saveEmployee(event, addEmployee, emp) {
    event.preventDefault();
    let { isError, employee } = employeeValidation(emp, this.props.employees, "add");
    this.setState({ employee });
    employee = this.state.employee;
    if (!isError) {
      addEmployee({
        variables: {
          firstname: capitalize(employee.firstname),
          lastname: capitalize(employee.lastname),
          user: employee.user,
          password: employee.password,
          dni: employee.dni,
          phone: employee.phone,
          active: true
          // active: employee.active
        }
      });
      alert(`${employee.user} ha sido agregado`);
      this.handleClose("classicModal");
      this.resetEmployeeForm();
    }
  }

  resetEmployeeForm() {
    let employee = Object.assign({}, newEmployee);
    this.setState({ employee });
  }

  componentWillMount() {
    this.resetEmployeeForm();
  }

  render() {
    const { classes } = this.props;
    const { employee } = this.state;
    return (
      <div>
        <Tooltip title="Agregar empleado">
          <IconButton
            aria-label="Agregar empleado"
            onClick={() => this.handleClickOpen("classicModal")}
          >
            <i className={"material-icons"}>add</i>
          </IconButton>
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
                    <h4 className={classes.modalTitle}>Crear Empleado</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <form>
                      <CustomInput
                        labelText="Nombre"
                        name="firstname"
                        value={employee.firstname}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeEmployee}
                        inputProps={{ errorcomment: employee.firstnameerror }}
                      />
                      <CustomInput
                        labelText="Apellido"
                        name="lastname"
                        value={employee.lastname}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeEmployee}
                        inputProps={{ errorcomment: employee.lastnameerror }}
                      />
                      <CustomInput
                        labelText="Usuario"
                        name="user"
                        value={employee.user}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeEmployee}
                        inputProps={{ errorcomment: employee.usererror }}
                      />
                      <CustomInput
                        labelText="Password"
                        name="password"
                        type={this.state.togglePassword}
                        value={employee.password}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeEmployee}
                        inputProps={{ errorcomment: employee.passworderror }}
                      />
                      <input type="checkbox" onClick={this.togglePassword} />
                      Mostrar password
                      <CustomInput
                        labelText="Teléfono"
                        name="phone"
                        value={employee.phone}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeEmployee}
                        inputProps={{ errorcomment: employee.phoneerror }}
                      />
                      <CustomInput
                        labelText="D.N.I"
                        name="dni"
                        value={employee.dni}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeEmployee}
                        inputProps={{ errorcomment: employee.dnierror }}
                      />
                      {/* <FormControl fullWidth style={{ paddingTop: "10px" }}>
                        <ActiveSelector
                          active={employee.active}
                          onChange={this.handleChangeEmployee}
                          modal="add"
                          inputProps={{ errorcomment: employee.activeerror }}
                        />
                        <FormHelperText
                          id="name-error-text"
                          style={{color:"red"}}
                        >
                          {employee.activeerror ? employee.activeerror : null}
                        </FormHelperText>
                      </FormControl> */}
                    </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Mutation mutation={NEW_EMPLOYEE} update={updateCacheAdd}>
                      {addEmployee => (
                        <div>
                          <Button
                            color="transparent"
                            simple
                            onClick={e => {
                              this.saveEmployee(e, addEmployee, employee);
                            }}
                          >
                            Guardar
                          </Button>
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

export default withRouter(withStyles(javascriptStyles)(EmployeeModal));
