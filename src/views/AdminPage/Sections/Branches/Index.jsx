import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import BranchPageStyle from "assets/jss/material-kit-react/views/branchPage.jsx";
//GraphQL
import { Query } from "react-apollo";
import { GET_BRANCHES } from "../../../../queries/branch";
import { GET_SERVICESHIFTS } from "../../../../queries/serviceShift";
//Customized components
import Table from "./EnhancedTable";

class IndexBranch extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div
        className="container-fluid"
        style={{ paddingBottom: "20px", color: "black" }}
      >
        <div className={classes.flexContainerNew}>
          <h1 className={classes.text}>Sedes</h1>
        </div>

        <Query query={GET_SERVICESHIFTS}>
          {({ loading, error, data }) => {
            if (loading) return "Loading";
            if (error) return `Error ${error.message}`;
            let serviceshifts = data.serviceShifts;
            return (
              <div>
                <Query query={GET_BRANCHES}>
                  {({ loading, error, data }) => {
                    if (loading) return "Loading";
                    if (error) return `Error ${error.message}`;
                    return (
                      <Table
                        data={data.branches}
                        history={this.props.history}
                        serviceshifts={serviceshifts}
                      />
                    );
                  }}
                </Query>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(BranchPageStyle)(IndexBranch);
