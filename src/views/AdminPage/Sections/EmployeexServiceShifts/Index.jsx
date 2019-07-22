import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import EmployeePageStyle from "assets/jss/material-kit-react/views/employeePage.jsx";
//GraphQL
import { Query } from "react-apollo";
import { GET_EMPLOYEEXSERVICESHIFTS } from "../../../../queries/employeexserviceshifts";
import { GET_BRANCHES } from "../../../../queries/branch";
import { GET_SERVICESHIFTS } from "../../../../queries/serviceShift";
//Customized components
import Table from "./EnhancedTable";

class IndexEmployeexServiceShifts extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div
        className="container-fluid"
        style={{ paddingBottom: "20px", color: "black" }}
      >
        <div className={classes.flexContainerNew}>
          <h1 className={classes.text}>Inicio de turnos</h1>
        </div>
        <Query query={GET_BRANCHES}>
          {({ loading, error, data }) => {
            if (loading) return "Loading";
            if (error) return `Error ${error.message}`;
            let branches = data.branches;
            return (
              <div>
                <Query query={GET_SERVICESHIFTS}>
                  {({ loading, error, data }) => {
                    if (loading) return "Loading";
                    if (error) return `Error ${error.message}`;
                    let serviceShifts = data.serviceShifts;
                    return (
                      <div>
                        <Query query={GET_EMPLOYEEXSERVICESHIFTS}>
                          {({ loading, error, data }) => {
                            if (loading) return "Loading";
                            if (error) return `Error ${error.message}`;
                            return (
                              <Table
                                data={data.employeesxserviceshifts}
                                history={this.props.history}
                                branches={branches}
                                serviceShifts={serviceShifts}
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
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(EmployeePageStyle)(IndexEmployeexServiceShifts);
