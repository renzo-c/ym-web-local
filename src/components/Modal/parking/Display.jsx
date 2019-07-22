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
// Helper functions
import { dbDateTimeToView } from "assets/helperFunctions/index.js";


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ParkingModal extends React.Component {
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
    let begindate = this.props.parking.serviceshift.begindate;
    begindate = dbDateTimeToView(begindate).dateTime;
    let values =
      this.props.parking.values === null
        ? "Ninguna"
        : this.props.parking.values.join(", ");
    return (
      <div>
        <Tooltip title="Detalles">
          <IconButton
            aria-label="Detalles"
            onClick={() => this.handleClickOpen("classicModal")}
          >
            <i className={"material-icons"}>directions_car</i>
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
                    <h4 className={classes.modalTitle}>
                      Información de Parqueo
                    </h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <form>
                      <CustomInput
                        labelText="Horario"
                        name="serviceshift"
                        value={begindate}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Sede"
                        name="branch"
                        value={this.props.parking.serviceshift.branch.branch}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Placa"
                        name="plate"
                        value={this.props.parking.plate}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Propietario"
                        name="owner"
                        value={this.props.parking.owner}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Cosas de Valor"
                        name="values"
                        value={values}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Comentario"
                        name="comment"
                        value={this.props.parking.comment}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Daños"
                        name="damage"
                        value={this.props.parking.damage}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Señales"
                        name="signs"
                        value={this.props.parking.sign}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Token"
                        name="token"
                        value={this.props.parking.token}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Recepción"
                        name="createdAt"
                        value={dbDateTimeToView(this.props.parking.createdAt).time}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Retornado"
                        name="returned"
                        value={this.props.parking.returned ? "SI" : "NO"}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Empleado"
                        name="employee"
                        value={this.props.parking.employee.user}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Hora de Retorno"
                        name="updatedAt"
                        value={this.props.parking.updatedAt !== this.props.parking.createdAt ? dbDateTimeToView(this.props.parking.updatedAt).time : "-"}
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

export default withRouter(withStyles(javascriptStyles)(ParkingModal));
