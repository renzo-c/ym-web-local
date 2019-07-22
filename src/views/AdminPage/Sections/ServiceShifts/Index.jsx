import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import ServiceShiftPageStyle from "assets/jss/material-kit-react/views/serviceShiftPage.jsx";
//GraphQL
import { Query } from "react-apollo";
import { GET_SERVICESHIFTS } from "../../../../queries/serviceShift";
//Customized components
import Table from "./EnhancedTable";

class IndexServiceshifts extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div
        className="container-fluid"
        style={{ paddingBottom: "20px", color: "black" }}
      >
        <div className={classes.flexContainerNew}>
          <h1 className={classes.text}>Horarios</h1>
        </div>
        <Query query={GET_SERVICESHIFTS}>
          {({ loading, error, data }) => {
            if (loading) return "Loading";
            if (error) return `Error ${error.message}`;
            return (
              <Table data={data.serviceShifts} history={this.props.history} />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(ServiceShiftPageStyle)(IndexServiceshifts);
