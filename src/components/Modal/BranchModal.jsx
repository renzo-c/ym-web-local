import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "../CustomInput/CustomInput.jsx";
import Badge from "../Badge/Badge.jsx";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
// queries and mutations with react-apollo
import { Mutation } from "react-apollo";
import { NEW_BRANCH } from "../../mutations/branch";
import { GET_BRANCHES } from "../../queries/branch";
//react-router
import { withRouter } from "react-router-dom";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class BranchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      branch: this.props.branch
        ? this.props.branch
        : {
            branch: "",
            address: "",
            latitude: "",
            longitude: "",
            contact: "",
            phone: "",
            active: ""
          }
    };
    this.updateBranchState = this.updateBranchState.bind(this);
    this.saveBranch = this.saveBranch.bind(this);
    this.resetForm = this.resetForm.bind(this);
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
    this.setState({
      branch: {
        branch: "",
        address: "",
        latitude: "",
        longitude: "",
        contact: "",
        phone: "",
        active: ""
      }
    });
  }

  updateBranchState(event) {
    if (this.props.branch === undefined) {
      const field = event.target.name;
      const branch = this.state.branch;
      branch[field] = event.target.value;
      return this.setState({ branch });
    }
  }

  saveBranch(event) {
    this.handleClose("classicModal");
    this.resetForm();
    this.props.history.push("/admin-page/branches");
  }

  componentDidMount() {
    if (this.props.branch) {
      this.setState({ branch: this.props.branch });
    }
  }

  render() {
    let title = "";
    let modalLayout = "";
    let branch = "";
    if (this.props.modalType === "new") {
      title = "Nueva Sede";
      modalLayout = (
        <Button
          color="info"
          onClick={() => this.handleClickOpen("classicModal")}
        >
          + Crear
        </Button>
      );
    } else if (this.props.modalType === "display") {
      title = "Mostrar Sede";
      modalLayout = (
        <Badge color="info">
          <i className="material-icons">person</i>
        </Badge>
      );
      branch = this.props.branch;
    } else if (this.props.modalType === "edit") {
      title = "Editar Sede";
      modalLayout = (
        <Badge color="success">
          <i className="material-icons">edit</i>
        </Badge>
      );
    }

    const { classes } = this.props;
    return (
      <div>
        {modalLayout}
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
                    <h4 className={classes.modalTitle}>{title}</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <form>
                      <CustomInput
                        labelText="Sede"
                        name="branch"
                        value={
                          branch ? branch.branch : this.state.branch.branch
                        }
                        formControlProps={{ fullWidth: true }}
                        onChange={this.updateBranchState}
                      />
                      <CustomInput
                        labelText="Dirección"
                        name="address"
                        value={
                          branch ? branch.address : this.state.branch.address
                        }
                        formControlProps={{ fullWidth: true }}
                        onChange={this.updateBranchState}
                      />
                      <CustomInput
                        labelText="Latitud"
                        name="latitude"
                        value={
                          branch ? branch.latitude : this.state.branch.latitude
                        }
                        formControlProps={{ fullWidth: true }}
                        onChange={this.updateBranchState}
                      />
                      <CustomInput
                        labelText="Longitud"
                        name="longitude"
                        value={
                          branch
                            ? branch.longitude
                            : this.state.branch.longitude
                        }
                        formControlProps={{ fullWidth: true }}
                        onChange={this.updateBranchState}
                      />
                      <CustomInput
                        labelText="Contacto"
                        name="contact"
                        value={
                          branch ? branch.contact : this.state.branch.contact
                        }
                        formControlProps={{ fullWidth: true }}
                        onChange={this.updateBranchState}
                      />
                      <CustomInput
                        labelText="Teléfono"
                        name="phone"
                        value={branch ? branch.phone : this.state.branch.phone}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.updateBranchState}
                      />
                      <CustomInput
                        labelText="Estado"
                        name="active"
                        value={
                          branch ? branch.active : this.state.branch.active
                        }
                        formControlProps={{ fullWidth: true }}
                        onChange={this.updateBranchState}
                      />
                    </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Mutation
                      mutation={NEW_BRANCH}
                      update={(cache, { data: { addBranch } }) => {
                        const { branches } = cache.readQuery({
                          query: GET_BRANCHES
                        });
                        cache.writeQuery({
                          query: GET_BRANCHES,
                          data: { branches: branches.concat([addBranch]) }
                        });
                      }}
                    >
                      {addBranch => (
                        <div>
                          {!(this.props.modalType === "display") && (
                            <Button
                              color="transparent"
                              simple
                              onClick={e => {
                                e.preventDefault();
                                addBranch({
                                  variables: {
                                    branch: this.state.branch.branch,
                                    address: this.state.branch.address,
                                    latitude: this.state.branch.latitude,
                                    longitude: this.state.branch.longitude,
                                    contact: this.state.branch.contact,
                                    phone: this.state.branch.phone,
                                    active: this.state.branch.active
                                  }
                                });
                                alert(
                                  this.state.branch.branch + " have been added!"
                                );
                                this.saveBranch();
                              }}
                            >
                              Guardar
                            </Button>
                          )}
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

export default withRouter(withStyles(javascriptStyles)(BranchModal));
