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
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
//react-router
import { withRouter } from "react-router-dom";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class BranchModal extends React.Component {
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
    const { classes, branch } = this.props;
    return (
      <div>
        <Tooltip title="Detalles">
          <IconButton
            aria-label="Detalles"
            onClick={() => this.handleClickOpen("classicModal")}
          >
            <i className={"material-icons"}>domain</i>
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
                    <h4 className={classes.modalTitle}>Mostrar Sede</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <form>
                      <CustomInput
                        labelText="Sede"
                        name="branch"
                        value={branch.branch}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Dirección"
                        name="address"
                        value={branch.address}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Latitud"
                        name="latitude"
                        value={branch.latitude}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Longitud"
                        name="longitude"
                        value={branch.longitude}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Contacto"
                        name="contact"
                        value={branch.contact}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Teléfono"
                        name="phone"
                        value={branch.phone}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Estado"
                        name="active"
                        value={branch.active ? "Activo" : "Inactivo"}
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

export default withRouter(withStyles(javascriptStyles)(BranchModal));
