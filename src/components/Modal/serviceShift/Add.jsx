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
import Datetime from "../../BoxForTime/NativeDateTime.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
//Customized components
import BranchSelector from "../../Selector/BranchSelector";
// import ActiveSelector from "../../Selector/ActiveSelector";
// queries and mutations with react-apollo
import { Query, Mutation } from "react-apollo";
import { GET_BRANCHES } from "../../../queries/branch";
import { NEW_SERVICESHIFT } from "../../../mutations/serviceShift";
import { GET_SERVICESHIFTS } from "../../../queries/serviceShift";
//react-router
import { withRouter } from "react-router-dom";
// Helper functions
import { serviceShiftValidation } from "assets/helperFunctions/validationServiceshift.js";


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const updateCacheNew = (cache, { data: { addServiceShift } }) => {
  let { serviceShifts } = cache.readQuery({ query: GET_SERVICESHIFTS });
  addServiceShift["employees"] = [];
  serviceShifts.push(addServiceShift);
  cache.writeQuery({
    query: GET_SERVICESHIFTS,
    data: {
      serviceShifts
    }
  });
  return null;
};

const initialState = {
  begindate: "",
  begindateerror: "",
  workspan: "",
  workspanerror: "",
  active: "",
  activeerror: "",
  branchId: "",
  branchIderror: ""
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      serviceShift: initialState
    };
    this.handleActiveState = this.handleActiveState.bind(this);
    this.handleBranchSelected = this.handleBranchSelected.bind(this);
    this.saveServiceShift = this.saveServiceShift.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleStartDateState = this.handleStartDateState.bind(this);
    this.handleWorkspanDateState = this.handleWorkspanDateState.bind(this);
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
    let serviceShift = Object.assign({}, initialState);
    this.setState({ serviceShift });
  }

  componentWillMount() {
    this.resetForm();
  }

  handleActiveState(event) {
    let serviceShift = this.state.serviceShift;
    serviceShift["active"] = event.target.value;
    this.setState({ serviceShift });
  }

  handleStartDateState(event) {
    const field = "begindate";
    const serviceShift = this.state.serviceShift;
    let date = new Date(event.target.value);
    serviceShift[field] = date;
    this.setState({ serviceShift });
  }

  handleWorkspanDateState(event) {
    const field = "workspan";
    const serviceShift = this.state.serviceShift;
    let date = new Date(event.target.value);
    serviceShift[field] = date;
    this.setState({ serviceShift });
  }

  handleBranchSelected(event) {
    const serviceShift = this.state.serviceShift;
    serviceShift["branchId"] = event.target.value;
    this.setState({ serviceShift });
  }

  saveServiceShift(event, addServiceShift, ssh) {
    event.preventDefault();
    let { isError, serviceshift } = serviceShiftValidation(ssh);
    this.setState({ serviceShift: serviceshift });
    if (!isError) {
      addServiceShift({
        variables: {
          begindate: this.state.serviceShift.begindate,
          workspan: this.state.serviceShift.workspan,
          active: this.state.serviceShift.active,
          branchId: this.state.serviceShift.branchId
        }
      });
      alert("Nuevo horario ha sido agregado");
      this.handleClose("classicModal");
      this.resetForm();
    }
  }

  render() {
    const { classes } = this.props;
    let widthTmpFix = "lorem";
    widthTmpFix = widthTmpFix.repeat(8);
    let serviceShift = this.state.serviceShift;
    let { /*active,*/ branchId } = this.state.serviceShift;
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
                    <h4 className={classes.modalTitle}>Nuevo Horario</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <span style={{ opacity: "0" }}>{widthTmpFix}</span>
                    <form>
                      <InputLabel className={classes.label}>
                        Inicio de turno (mes / día / año)
                      </InputLabel>
                      <br />
                      <FormControl fullWidth>
                        <Datetime
                          inputProps={{
                            placeholder: "Fecha y hora de inicio"
                          }}
                          value={this.state.serviceShift.begindate}
                          onChange={this.handleStartDateState}
                          renderInput={false}
                        />
                        <FormHelperText
                          id="name-error-text"
                          style={{ color: "red" }}
                        >
                          {serviceShift.begindateerror
                            ? serviceShift.begindateerror
                            : null}
                        </FormHelperText>
                      </FormControl>
                      <br />
                      <br />
                      <InputLabel className={classes.label}>
                        Fin de turno (mes / día / año)
                      </InputLabel>
                      <br />
                      <FormControl fullWidth>
                        <Datetime
                          dateFormat={true}
                          inputProps={{
                            placeholder: "Fecha y hora fin"
                          }}
                          value={this.state.serviceShift.workspan}
                          onChange={this.handleWorkspanDateState}
                        />
                        <FormHelperText
                          id="name-error-text"
                          style={{ color: "red" }}
                        >
                          {serviceShift.workspanerror
                            ? serviceShift.workspanerror
                            : null}
                        </FormHelperText>
                      </FormControl>
                      <br />
                      <br />
                      <InputLabel className={classes.label}>Sede</InputLabel>
                      <br />
                      <FormControl fullWidth>
                        <Query query={GET_BRANCHES}>
                          {({ loading, error, data }) => {
                            if (loading) return <h4>Loading...</h4>;
                            if (error) console.log("errror: ", error);
                            return (
                              <BranchSelector
                                branches={data.branches}
                                onChange={this.handleBranchSelected}
                                branchId={branchId}
                                modal="add"
                              />
                            );
                          }}
                        </Query>
                        <FormHelperText
                          id="name-error-text"
                          style={{ color: "red" }}
                        >
                          {serviceShift.branchIderror
                            ? serviceShift.branchIderror
                            : null}
                        </FormHelperText>
                      </FormControl>
                      {/* <br />
                      <br />
                      <InputLabel className={classes.label}>Estado</InputLabel>
                      <br />
                      <FormControl fullWidth>
                        <ActiveSelector
                          onChange={this.handleActiveState}
                          active={active}
                          modal="add"
                        />
                        <FormHelperText
                          id="name-error-text"
                          style={{ color: "red" }}
                        >
                          {serviceShift.activeerror
                            ? serviceShift.activeerror
                            : null}
                        </FormHelperText>
                      </FormControl> */}
                    </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Mutation
                      mutation={NEW_SERVICESHIFT}
                      update={updateCacheNew}
                    >
                      {addServiceShift => (
                        <div>
                          <Button
                            color="transparent"
                            simple
                            onClick={e => {
                              this.saveServiceShift(
                                e,
                                addServiceShift,
                                serviceShift
                              );
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

export default withRouter(withStyles(javascriptStyles)(Modal));
