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
//GraphQL
import { Mutation } from "react-apollo";
import { UPDATE_ADMIN } from "../../../mutations/admin.js";
//react-router
import { withRouter } from "react-router-dom";
// Helper functions
import { adminValidation } from "assets/helperFunctions/validationAdmin.js";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const initErrors = {
  usernameerror: [],
  emailerror: [],
  passworderror: []
};

class UpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      admin: null
    };
    this.handleChangeAdmin = this.handleChangeAdmin.bind(this);
    this.saveAdmin = this.saveAdmin.bind(this);
    this.resetAdmin = this.resetAdmin.bind(this);
  }

  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
    this.resetAdmin();
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
    this.resetAdmin();
  }

  handleChangeAdmin(event) {
    const field = event.target.name;
    let value = event.target.value;
    let admin = this.state.admin;
    admin[field] = value;
    this.setState({ admin });
  }

  resetAdmin() {
    let admin = JSON.parse(JSON.stringify(this.props.admin));
    admin = { ...admin, ...initErrors };
    this.setState({
      admin
    });
  }

  saveAdmin(event, updateAdmin, adm) {
    console.log("this.state.admin", this.state.admin);
    event.preventDefault();
    let { isError, admin } = adminValidation(adm, this.props.admins, "update");
    this.setState({ admin });
    admin = this.state.admin;
    console.log("admin", admin);
    if (!isError) {
      updateAdmin({ variables: admin });
      alert(admin.username + " ha sido actualizado!");
      this.handleClose("classicModal");
    }
  }

  componentWillMount() {
    this.resetAdmin();
  }

  render() {
    const { classes } = this.props;
    const { admin } = this.state;
    return (
      <div align="left">
        <Tooltip title="Editar">
          <div>
            <IconButton
              aria-label="Editar"
              onClick={() => this.handleClickOpen("classicModal")}
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
                        labelText="Usuario"
                        name="username"
                        value={admin.username}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeAdmin}
                        inputProps={{ errorcomments: [...admin.usernameerror] }}
                      />
                      <CustomInput
                        labelText="Correo"
                        name="email"
                        value={admin.email}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeAdmin}
                        inputProps={{ errorcomments: [...admin.emailerror] }}
                      />
                      <CustomInput
                        labelText="Password"
                        name="password"
                        value={admin.password}
                        type="password"
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeAdmin}
                        inputProps={{ errorcomments: [...admin.passworderror] }}
                      />
                    </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Mutation mutation={UPDATE_ADMIN}>
                      {updateAdmin => (
                        <div>
                          <Button
                            color="transparent"
                            simple
                            onClick={e => {
                              this.saveAdmin(e, updateAdmin, admin);
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
