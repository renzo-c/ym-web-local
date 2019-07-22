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
//GraphQL
import { Mutation } from "react-apollo";
import { UPDATE_EMPLOYEE } from "../../../mutations/employee.js";
//react-router
import { withRouter } from "react-router-dom";
// Helper functions
import { capitalize } from "assets/helperFunctions/index.js";
import { employeeValidation } from "assets/helperFunctions/validationEmployee.js";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class UpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      employee: null
    };
    this.handleChangeEmployee = this.handleChangeEmployee.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.resetEmployee = this.resetEmployee.bind(this);
  }

  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
    this.resetEmployee();
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
    this.resetEmployee();
  }

  handleChangeEmployee(event) {
    const field = event.target.name;
    let value = event.target.value;
    if (field === "active") {
      value = value === true ? true : false;
    }
    let employee = this.state.employee;
    employee[field] = value;
    this.setState({ employee });
  }

  resetEmployee() {
    let employee = Object.assign({}, this.props.employee);
    this.setState({
      employee
    });
  }

  saveEmployee(event, updateEmployee, emp) {
    event.preventDefault();
    const employees = this.props.employees;
    let { isError, employee } = employeeValidation(emp, employees, "update");
    this.setState({ employee });
    employee = this.state.employee;
    employee["firstname"] = capitalize(employee.firstname);
    employee["lastname"] = capitalize(employee.lastname);
    if (!isError) {
      updateEmployee({ variables: employee });
      alert(employee.user + " ha sido actualizado!");
      this.handleClose("classicModal");
    }
  }

  componentWillMount() {
    this.resetEmployee();
  }

  render() {
    const { classes } = this.props;
    const employee = this.state.employee;
    return (
      <div align="left">
        <Tooltip title="Editar">
          <div>
            <IconButton
              aria-label="Editar"
              onClick={() => this.handleClickOpen("classicModal")}
              disabled={!this.props.employee.active}
            >
              <i className={"material-icons"}>edit</i>
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
                      Actualización de datos
                    </h4>
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
                        disabled={true}
                        inputProps={{ errorcomment: employee.usererror }}
                      />
                      <CustomInput
                        labelText="Password"
                        name="password"
                        value={employee.password}
                        type="password"
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeEmployee}
                        inputProps={{ errorcomment: employee.passworderror }}
                      />
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
                          modal="update"
                        />
                        <FormHelperText
                          id="name-error-text"
                          style={{ color: "red" }}
                        >
                          {employee.activeerror ? employee.activeerror : null}
                        </FormHelperText>
                      </FormControl> */}
                    </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Mutation mutation={UPDATE_EMPLOYEE}>
                      {updateEmployee => (
                        <div>
                          <Button
                            color="transparent"
                            simple
                            onClick={e => {
                              this.saveEmployee(e, updateEmployee, employee);
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

export default withRouter(withStyles(javascriptStyles)(UpdateModal));
