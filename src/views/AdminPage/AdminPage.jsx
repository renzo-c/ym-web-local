import React, { Component } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinksParkeoAdmin from "components/Header/HeaderLinksParkeoAdmin.jsx";
import Footer from "components/Footer/Footer.jsx";
// import GridContainer from "components/Grid/GridContainer.jsx";
// import GridItem from "components/Grid/GridItem.jsx";
// import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
// import Card from "components/Card/Card.jsx";
// import CardBody from "components/Card/CardBody.jsx";
//react-router
// import { Link } from "react-router-dom";

import Employees from "views/AdminPage/Sections/Employees/Index.jsx";
import Branch from "views/AdminPage/Sections/Branches/Index.jsx";
import ServiceShifts from "views/AdminPage/Sections/ServiceShifts/Index.jsx";
import Attendance from "views/AdminPage/Sections/EmployeexServiceShifts/Index.jsx";
import Parkings from "views/AdminPage/Sections/Parkings/Index.jsx";

const dashboardRoutes = [];

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "employees"
    };
  }

  changeTab(tab) {
    this.setState({
      currentTab: tab
    });
  }

  render() {
    const { classes, ...rest } = this.props;
    // const imageClasses = classNames(classes.imgCenter);
    let pageElement;
    if (this.state.currentTab === "employees") pageElement = <Employees />;
    if (this.state.currentTab === "branches") pageElement = <Branch />;
    if (this.state.currentTab === "serviceshifts")
      pageElement = <ServiceShifts />;
    if (this.state.currentTab === "attendance") pageElement = <Attendance />;
    if (this.state.currentTab === "parkings") pageElement = <Parkings />;
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          rightLinks={
            <HeaderLinksParkeoAdmin onClick={name => this.changeTab(name)} history={this.props.history}/>
          }
          brand="Administracion Parkeo"
          fixed
          changeColorOnScroll={{
            height: 120,
            color: "white"
          }}
          {...rest}
        />
        <Parallax
          supersmall
          filter
          image={require("assets/img/profile-bg.jpg")}
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>{pageElement}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(AdminPage);
