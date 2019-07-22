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
// import FormControl from "@material-ui/core/FormControl";
// import FormHelperText from "@material-ui/core/FormHelperText";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
//Customized components
// import ActiveSelector from "../../Selector/ActiveSelector";
import InputPassword from "../../CustomInput/InputPassword";
// GraphQL
import { Mutation } from "react-apollo";
import { UPDATE_SUPERADMIN } from "../../../mutations/admin";
// react-router
import { withRouter } from "react-router-dom";
// Helper functions
import { adminValidation } from "assets/helperFunctions/validationAdmin.js";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const initErrors = {
  passworderror: ""
};

const initAdmin = {
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
      admin: newAdmin
    };
    this.saveAdmin = this.saveAdmin.bind(this);
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

  handleChangeAdmin(event) {
    if (event) {
      const field = "password";
      let value = event.target.value;
      let admin = this.state.admin;
      admin[field] = value;
      this.setState({ admin });
    }
  }

  saveAdmin(event, updateSuperadmin, adm) {
    event.preventDefault();
    let { isError, admin } = adminValidation(adm, this.props.admins, "add");
    this.setState({ admin });
    admin = this.state.admin;
    if (!isError) {
      updateSuperadmin({
        variables: {
          password: admin.password
        }
      });
      alert(`Contraseña de superadmin ha sido cambiada`);
      this.handleClose("classicModal");
      this.resetAdminForm();
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      alert("Sesión de administrador cerrada por cambio de contraseña");
      this.props.history.push("/parkeo/admin-page/login");
    }
  }

  resetAdminForm() {
    let admin = {password: "", passworderror: ""};
    // let admin = JSON.parse(JSON.stringify(newAdmin));
    // let admin = Object.assign({}, newAdmin);
    this.setState({ admin });
  }

  componentWillMount() {
    this.resetAdminForm();
  }

  render() {
    const { classes } = this.props;
    const { admin } = this.state;
    const filler = "lorem".repeat(8);
    return (
      <div>
        <Tooltip title="Cambiar contraseña de superadmin">
          <a
            style={{ cursor: "pointer" }}
            aria-label="Cambiar contraseña de superadmin"
            onClick={() => this.handleClickOpen("classicModal")}
          >
            <u>Cambiar contraseña</u>
          </a>
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
                    <span style={{ opacity: "0" }}>{filler}</span>
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
                      Cambiar contraseña de superadmin
                    </h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <InputPassword
                      onChange={this.handleChangeAdmin}
                      inputProps={{ errorcomments: [...admin.passworderror] }}
                      password={this.state.admin.password}
                    />
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Mutation mutation={UPDATE_SUPERADMIN}>
                      {updateSuperadmin => (
                        <div>
                          <Button
                            color="transparent"
                            simple
                            onClick={e => {
                              this.saveAdmin(e, updateSuperadmin, admin);
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
