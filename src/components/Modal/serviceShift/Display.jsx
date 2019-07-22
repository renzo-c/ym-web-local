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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
//react-router
import { withRouter } from "react-router-dom";
// Helper functions
import { dbDateTimeToView } from "assets/helperFunctions/index.js";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ServiceShiftModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      serviceshift: this.props.serviceshift
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

  componentWillMount() {
    const serviceshift = this.props.serviceshift;
    this.setState({serviceshift});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.serviceshift !== this.state.serviceshift) {
      this.setState({ serviceshift: nextProps.serviceshift });
    }
  }

  render() {
    const { classes } = this.props;
    let { begindate, workspan } = this.state.serviceshift;
    begindate = dbDateTimeToView(begindate).dateTime;
    workspan = dbDateTimeToView(workspan).time;
    return (
      <div>
        <div>
          <Tooltip title="Detalles">
            <IconButton
              aria-label="Detalles"
              onClick={() => this.handleClickOpen("classicModal")}
            >
              <i className={"material-icons"}>alarm</i>
            </IconButton>
          </Tooltip>
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
                    <h4 className={classes.modalTitle}>Mostrar Horario</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <form>
                      <InputLabel className={classes.label}>
                        Inicio de turno
                      </InputLabel>
                      <br />
                      <FormControl fullWidth>
                        {begindate}
                      </FormControl>
                      <br />
                      <br />
                      <InputLabel className={classes.label}>
                        Fin de turno
                      </InputLabel>
                      <br />
                      <FormControl fullWidth>
                        {workspan}
                      </FormControl>
                      <br />
                      <br />
                      <div>
                        <div>Empleado asignado</div>
                        <ul>
                          {this.state.serviceshift.employees === undefined
                            ? null
                            : this.state.serviceshift.employees.map(
                                employee => {
                                  return (
                                    <li key={employee.user}>
                                      {employee.firstname +
                                        " " +
                                        employee.lastname}
                                    </li>
                                  );
                                }
                              )}
                        </ul>
                      </div>
                      <CustomInput
                        labelText="Sede"
                        name="branch"
                        value={this.state.serviceshift.branch.branch}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Estado"
                        name="active"
                        value={
                          this.state.serviceshift.active ? "Activo" : "Inactivo"
                        }
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

export default withRouter(withStyles(javascriptStyles)(ServiceShiftModal));
