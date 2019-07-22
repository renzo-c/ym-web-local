import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import AdminPageStyle from "assets/jss/material-kit-react/views/adminPage.jsx";
//GraphQL
import { Query } from "react-apollo";
import { GET_ADMINS } from "../../../../queries/admin";
//Customized components
import Table from "./EnhancedTable";
import ResetPassword from "../../../../components/Modal/admin/ResetPassword";

class IndexAdmin extends Component {
  render() {
    return (
      <div
        className="container-fluid"
        style={{ paddingBottom: "20px", color: "black" }}
      >
        <ResetPassword />
        <Query query={GET_ADMINS}>
          {({ loading, error, data }) => {
            if (loading) return "Loading";
            if (error) return `Error ${error.message}`;
            return <Table data={data.admins} history={this.props.history} />;
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(AdminPageStyle)(IndexAdmin);
