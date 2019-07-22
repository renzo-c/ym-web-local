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
// import TextFieldDisabled from "../../CustomBox/TextFieldDisabled";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
//react-router
import { withRouter } from "react-router-dom";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class EmployeeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false
    };
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

  render() {
    const { classes } = this.props;
    const {
      firstname,
      lastname,
      user,
      phone,
      dni,
      active
    } = this.props.employee;
    return (
      <div align="left">
        <Tooltip title="Detalles">
          <IconButton
            aria-label="Detalles"
            onClick={() => this.handleClickOpen("classicModal")}
          >
            <i className={"material-icons"}>account_circle</i>
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
                    <h4 className={classes.modalTitle}>Mostrar Empleado</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <form>
                      {/* <TextFieldDisabled n={firstname}/> */}

                      <CustomInput
                        labelText="Nombre"
                        name="firstname"
                        value={firstname}
                        formControlProps={{ fullWidth: true }}
                        label="disabled"
                      />
                      <CustomInput
                        labelText="Apellido"
                        name="lastname"
                        value={lastname}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Usuario"
                        name="user"
                        value={user}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Teléfono"
                        name="phone"
                        value={phone}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="D.N.I"
                        name="dni"
                        value={dni}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Estado"
                        name="active"
                        value={active ? "Activo" : "Inactivo"}
                        formControlProps={{ fullWidth: true }}
                      />
                    </form>
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

export default withRouter(withStyles(javascriptStyles)(EmployeeModal));
