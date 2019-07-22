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
import CustomInput from "../../CustomInput/CustomInput.admin.jsx";
// import FormControl from "@material-ui/core/FormControl";
// import FormHelperText from "@material-ui/core/FormHelperText";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
//Customized components
// import ActiveSelector from "../../Selector/ActiveSelector";
// GraphQL
import { Mutation } from "react-apollo";
import { NEW_ADMIN } from "../../../mutations/admin";
import { GET_ADMINS } from "../../../queries/admin";
// react-router
import { withRouter } from "react-router-dom";
// Helper functions
import { adminValidation } from "assets/helperFunctions/validationAdmin.js";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const updateCacheAdd = (cache, { data: { addAdmin } }) => {
  const { admins } = cache.readQuery({ query: GET_ADMINS });
  cache.writeQuery({
    query: GET_ADMINS,
    data: { admins: [...admins, addAdmin] }
  });
};

const initErrors = {
  usernameerror: "",
  emailerror: "",
  passworderror: ""
};

const initAdmin = {
  username: "",
  email: "",
  password: ""
};

const newAdmin = {
  ...initAdmin,
  ...initErrors
};

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      togglePassword: "password",
      admin: newAdmin
    };
    this.saveAdmin = this.saveAdmin.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.resetAdminForm = this.resetAdminForm.bind(this);
    this.handleChangeAdmin = this.handleChangeAdmin.bind(this);
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
    this.resetAdminForm();
  }

  togglePassword() {
    if (this.state.togglePassword === "password") {
      this.setState({ togglePassword: "text" });
    } else {
      this.setState({ togglePassword: "password" });
    }
  }

  handleChangeAdmin(event) {
    if (event) {
      const field = event.target.name;
      let value = event.target.value;
      let admin = this.state.admin;
      admin[field] = value;
      this.setState({ admin });
    }
  }

  saveAdmin(event, addAdmin, adm) {
    event.preventDefault();
    let { isError, admin } = adminValidation(adm, this.props.admins, "add");
    this.setState({ admin });
    admin = this.state.admin;
    if (!isError) {
      addAdmin({
        variables: {
          username: admin.username.toLowerCase(),
          email: admin.email.toLowerCase(),
          password: admin.password
        }
      });
      alert(`${admin.username} ha sido agregado`);
      this.handleClose("classicModal");
      this.resetAdminForm();
    }
  }

  resetAdminForm() {
    let admin = Object.assign({}, newAdmin);
    this.setState({ admin });
  }

  componentWillMount() {
    this.resetAdminForm();
  }

  render() {
    const { classes } = this.props;
    const { admin } = this.state;
    return (
      <div>
        <Tooltip title="Agregar administrador">
          <IconButton
            aria-label="Agregar administrador"
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
                        labelText="Administrador"
                        name="username"
                        value={admin.firstname}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeAdmin}
                        inputProps={{ errorcomments: [...admin.usernameerror] }}
                      />
                      <CustomInput
                        labelText="Correo"
                        name="email"
                        value={admin.lastname}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeAdmin}
                        inputProps={{ errorcomments: [...admin.emailerror] }}
                      />
                      <CustomInput
                        labelText="Password"
                        name="password"
                        type={this.state.togglePassword}
                        value={admin.password}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeAdmin}
                        inputProps={{ errorcomments: [...admin.passworderror] }}
                      />
                      <input type="checkbox" onClick={this.togglePassword} />
                      Mostrar password
                    </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Mutation mutation={NEW_ADMIN} update={updateCacheAdd}>
                      {addAdmin => (
                        <div>
                          <Button
                            color="transparent"
                            simple
                            onClick={e => {
                              this.saveAdmin(e, addAdmin, admin);
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

export default withRouter(withStyles(javascriptStyles)(AddModal));
